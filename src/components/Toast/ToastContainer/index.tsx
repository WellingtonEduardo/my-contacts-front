import { useCallback, useEffect, useState } from "react";
import ToastMessage from "../ToastMessage";
import { toastEventManager } from "@/utils/toast";

interface messagesProps {
  id: number,
  type: "danger" | "default" | "success",
  text: string
}



export default function ToastContainer() {

	const [messages, setMessages] = useState<messagesProps[]>([]);

	useEffect(() => {

		function handleAddToast({ type, text, duration }: {
      type: "danger" | "default" | "success",
      text: string,
      duration?: number
    }) {

			setMessages((prevState) => [
				...prevState,
				{ id: Math.random(), type, text, duration }
			]);

		}


		toastEventManager.addEvenListener("addtoast", handleAddToast);


		return () => {
			toastEventManager.removeListener("addtoast", handleAddToast);
		};

	}, []);



	const handleRemoveMessage = useCallback((id: number) => {
		setMessages((prvState) => prvState.filter(msg => msg.id !== id));
	}, []);


	return (
		<div className="fixed z-[2] bottom-12 left-1/2 -translate-x-2/4">

			{messages.map((message) => (
				<ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
			))}

		</div>
	);

}

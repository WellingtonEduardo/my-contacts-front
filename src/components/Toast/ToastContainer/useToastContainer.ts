import { useCallback, useEffect, useState } from "react";

import { toastEventManager } from "@/utils/toast";

interface messagesProps {
  id: number,
  type: "danger" | "default" | "success",
  text: string
}



export default function useToastContainer() {

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



	return {
		messages,
		handleRemoveMessage
	};

}

import { useEffect } from "react";
import ToastMessage from "../ToastMessage";
import { toastEventManager } from "@/utils/toast";
import useAnimatedList from "@/hooks/useAnimatedList";



export default function ToastContainer() {


	const {
		setItems,
		handleRemoveItem,
		renderList

	} = useAnimatedList();


	useEffect(() => {

		function handleAddToast({ type, text, duration }: {
      type: "danger" | "default" | "success",
      text: string,
      duration?: number
    }) {

			setItems((prevState) => [
				...prevState,
				{ id: Math.random(), type, text, duration }
			]);

		}

		toastEventManager.addEvenListener("addtoast", handleAddToast);

		return () => {
			toastEventManager.removeListener("addtoast", handleAddToast);
		};

	}, [setItems]);





	return (
		<div className="fixed z-[2] bottom-12 left-1/2 -translate-x-2/4">

			{renderList((message, { isLeaving, animatedRef }) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveItem}
					isLeaving={isLeaving}
					animatedRef={animatedRef}
				/>
			))}

		</div>
	);

}

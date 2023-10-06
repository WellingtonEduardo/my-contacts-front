import ToastMessage from "../ToastMessage";
import useToastContainer from "./useToastContainer";

export default function ToastContainer() {

	const { handleRemoveMessage, messages } = useToastContainer();

	return (
		<div className="fixed z-[2] bottom-12 left-1/2 -translate-x-2/4">

			{messages.map((message) => (
				<ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
			))}

		</div>
	);

}

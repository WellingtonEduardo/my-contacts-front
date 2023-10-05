
import checkCircle from "@/assets/images/icons/check-circle.svg";
import xCircle from "@/assets/images/icons/x-circle.svg";
import Image from "next/image";
import { useEffect } from "react";


const toastVariation = {
	default: "bg-primary-main",
	success: "bg-success",
	danger: "bg-danger-main"
};

interface ToastMessageProps {
  message: {
    id: number,
    text: string,
    type?: "default" | "success" | "danger",
    duration?: number
  },
  onRemoveMessage: (id: number) => void


}



export default function ToastMessage({ message, onRemoveMessage }: ToastMessageProps) {

	const type = message.type || "default";


	useEffect(() => {
		const timeoutId = setTimeout(() => {

			onRemoveMessage(message.id);

		}, message.duration || 7000);

		return () => {
			clearTimeout(timeoutId);
		};

	}, [message, onRemoveMessage]);





	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}


	return (
		<div className={`${toastVariation[type]} py-4 px-8 text-white rounded shadow-toast flex items-center justify-center mt-3 cursor-pointer`}
			onClick={handleRemoveToast}
			tabIndex={0} role="button"
		>

			{message.type === "danger" && <Image src={xCircle} alt="x" />}
			{message.type === "success" && <Image src={checkCircle} alt="check" />}

			<strong className="ml-2">
				{message.text}
			</strong>

		</div>

	);

}

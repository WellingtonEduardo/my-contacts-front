import checkCircle from "@/assets/images/icons/check-circle.svg";
import xCircle from "@/assets/images/icons/x-circle.svg";
import Image from "next/image";
import useToastMessage from "./useToastMessage";
import { MutableRefObject, memo } from "react";

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
  onRemoveMessage: (id: number) => void,
  isLeaving: boolean,
  animatedRef: MutableRefObject<HTMLDivElement | null>
}

function ToastMessage({
	message,
	onRemoveMessage,
	isLeaving,
	animatedRef

}: ToastMessageProps) {

	const type = message.type || "default";

	const {
		handleRemoveToast
	} = useToastMessage({ message, onRemoveMessage });



	return (
		<div className={`${toastVariation[type]} py-4 px-8 text-white rounded shadow-toast flex items-center justify-center mt-3 cursor-pointer ${isLeaving ? "animate-messageOut" : "animate-messageIn"}`}
			onClick={handleRemoveToast}
			tabIndex={0} role="button"
			ref={animatedRef}
		>

			{message.type === "danger" && <Image src={xCircle} alt="x" />}
			{message.type === "success" && <Image src={checkCircle} alt="check" />}

			<strong className="ml-2">
				{message.text}
			</strong>

		</div>

	);

}


export default memo(ToastMessage);


import checkCircle from "@/assets/images/icons/check-circle.svg";
import xCircle from "@/assets/images/icons/x-circle.svg";
import Image from "next/image";


const toastVariation = {
	default: "bg-primary-main",
	success: "bg-success",
	danger: "bg-danger-main"
};

export default function ToastMessage({ text, type = "default" }: { text: string, type?: "default" | "success" | "danger" }) {


	return (
		<div className={`${toastVariation[type]} py-4 px-8 text-white rounded shadow-toast flex items-center justify-center mt-3`}>

			{type === "danger" && <Image src={xCircle} alt="x" />}
			{type === "success" && <Image src={checkCircle} alt="check" />}

			<strong className="ml-2">
				{text}
			</strong>

		</div>

	);

}

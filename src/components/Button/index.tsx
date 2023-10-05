import { ReactNode } from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  children: ReactNode | string,
  typeButton: "button" | "submit",
  wFull?: boolean,
  danger?: boolean,
  disabled?: boolean,
  handleFunctions?: () => void
  isLoading?: boolean
}



export default function Button({ children, typeButton, wFull, danger, disabled,isLoading, handleFunctions}: ButtonProps) {

	return (
		<button className={`${wFull && "w-full"} ${danger ? "bg-danger-main hover:bg-danger-light active:bg-danger-dark h-[40px]" : " bg-primary-main hover:bg-primary-light active:bg-primary-dark h-[52px]"} border-none py-0 px-4 text-[16px] shadow-modal font-bold text-white rounded duration-200 ease-in  disabled:bg-disabled disabled:cursor-default flex items-center justify-center`}
			type={typeButton}
			disabled={disabled || isLoading}
			onClick={handleFunctions}
		>
			{!isLoading && children}
			{isLoading && <Spinner size={"text-[16px]"} />}

		</button>
	);
}

import { InputHTMLAttributes, } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined,
  handleChange: (value: string) => void;

}

export default function Input({ error, handleChange, ...rest }: InputProps) {

	return (
		<input className={`${error ? "text-danger-main border-danger-main focus:border-danger-main" : "border-white focus:border-primary-main"} w-full border-2 border-solid  rounded bg-white shadow-modal h-[52px] outline-none py-0 px-4 text-[16px] duration-200 ease-in appearance-none
    disabled:bg-gray-lighter disabled:border-gray-light `}
		{...rest}
		onChange={(event) => { handleChange(event.target.value); }}
		/>
	);

}

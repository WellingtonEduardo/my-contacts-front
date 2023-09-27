import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Select({ children, setChange, value, isLoading }: { children: ReactNode, setChange: Dispatch<SetStateAction<string>>, value: string, isLoading: boolean }) {
	return (
		<select  className="w-full border-2 border-solid border-white rounded bg-white shadow-modal h-[52px] outline-none py-0 px-4 text-[16px] duration-200 ease-in focus:border-primary-main appearance-none disabled:bg-gray-lighter disabled:border-gray-light disabled:opacity-100"
			value={value}
			onChange={(event) => { setChange(event.target.value); }}
			disabled={isLoading}
		>
			{children}
		</select>
	);
}

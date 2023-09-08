import { ReactNode } from "react";

export default function Select({ children }: { children: ReactNode }) {
	return (
		<select className="w-full border-2 border-solid border-white rounded bg-white shadow-modal h-[52px] outline-none py-0 px-4 text-[16px] duration-200 ease-in focus:border-primary-main">
			{children}
		</select>
	);
}

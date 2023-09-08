

export default function Button({ children, typeButton, wFull }: { children: string, typeButton: "button" | "submit", wFull?: boolean }) {

	return (
		<button className={`${wFull && "w-full"} h-[52px] border-none bg-primary-main py-0 px-4 text-[16px] shadow-modal font-bold text-white rounded duration-200 ease-in hover:bg-primary-light active:bg-primary-dark disabled:bg-disabled disabled:cursor-default`}
			type={typeButton}
		>

			{children}

		</button>
	);
}

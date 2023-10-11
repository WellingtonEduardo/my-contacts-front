import Link from "next/link";


interface HeaderProps {
  hasError: boolean,
  contactsLength: number,
  filteredContactsLength: number
}


export default function HeaderHome({ hasError, contactsLength, filteredContactsLength}: HeaderProps) {

	return (
		<div className={`flex items-center mt-8
  ${hasError ? "justify-end" : (
			contactsLength > 0
				? "justify-between"
				: "justify-center"
		)}  border-b-2 border-solid border-gray-lighter pb-4`}>

			{(!hasError && contactsLength > 0) && (
				<strong className="text-[24px]">
					{filteredContactsLength}
					{filteredContactsLength === 1 ? " contato" : " contatos"}
				</strong>
			)}

			<Link href="/new"
				className="text-primary-main border-2 border-solid border-primary-main rounded py-2 px-4 duration-200 ease-in hover:bg-primary-main hover:text-white"
			>
        Novo contato
			</Link>
		</div>

	);


}

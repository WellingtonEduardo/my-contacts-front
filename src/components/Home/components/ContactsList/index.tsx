import Image from "next/image";
import Link from "next/link";

import arrow from "@/assets/images/icons/arrow.svg";
import edit from "@/assets/images/icons/edit.svg";
import trash from "@/assets/images/icons/trash.svg";


interface ContactsProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  category: {
    id: string | undefined,
    name: string | undefined,
  }
}


interface ContactsListProps {
  filteredContacts: ContactsProps[],
  orderBy: "asc" | "desc",
  onToggleOrderBy: () => Promise<void>,
  onDeleteContact: (contact: ContactsProps) => void
}


export default function ContactsList({ filteredContacts, orderBy, onToggleOrderBy,onDeleteContact }: ContactsListProps) {
	return (<>
		{
			filteredContacts.length > 0 && (
				<header className="mt-6 mb-2">

					<button
						type="button"
						className="bg-transparent border-none flex items-center"
						onClick={onToggleOrderBy} >
						<span className="mr-2 font-bold text-primary-main">
              Nome
						</span>
						<Image className={`${orderBy === "asc" ? "rotate-180" : "rotate-0"} duration-200 ease-in`}
							src={arrow} alt="Arrow" />
					</button>

				</header>
			)
		}

		{
			filteredContacts.map(contact => (

				<div key={contact
					.id} className="bg-white shadow-modal p-4 rounded flex items-center justify-between mt-4">

					<div>

						<div className="flex items-center">
							<strong>{contact.name}</strong>
							{contact.category.name && (
								<small className="bg-primary-lighter text-primary-main font-bold uppercase p-1 rounded ml-2">
									{contact.category.name}
								</small>
							)}

						</div>

						<span className="block text-[14px] text-gray-light">
							{contact.email}
						</span>
						<span className="block text-[14px] text-gray-light">
							{contact.phone}
						</span>

					</div>

					<div className="flex items-center">

						<Link href={`/edit/${contact.id}`}>
							<Image src={edit} alt="Edit" />
						</Link>

						<button type="button" className="bg-transparent border-none ml-2"
							onClick={() => { onDeleteContact(contact); }}
						>
							<Image src={trash} alt="Delete" />
						</button>

					</div>

				</div>
			))
		}
	</>
	);
}



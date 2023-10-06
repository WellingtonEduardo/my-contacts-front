import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import arrow from "@/assets/images/icons/arrow.svg";
import edit from "@/assets/images/icons/edit.svg";
import trash from "@/assets/images/icons/trash.svg";
import emptyBox from "@/assets/images/empty-box.svg";
import magnifierQuestion from "@/assets/images/magnifier-question.svg";

import ContactsService from "@/services/ContactsService";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import useHome from "./useHome";


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

interface HomeProps {
  contactsDb: ContactsProps[],
  err: boolean
}


export default function Home({ contactsDb, err }: HomeProps) {

	const {
		isLoading,
		isLoadingDelete,
		isDeleteModalVisible,
		contactBeingDeleted,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
		hasError,
		handleChangeSearchTerm,
		filteredContacts,
		handleToggleOrderBy,
		contacts,
		searchTerm,
		orderBy,
		handleDeleteContact,

	} = useHome({ contactsDb, err });



	return (
		<div className="mt-8">

			<Loader isLoading={isLoading} />

			<Modal
				isLoading={isLoadingDelete}
				visible={isDeleteModalVisible}
				danger
				title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
				confirmLabel="Deletar"
				onCancel={handleCloseDeleteModal}
				onConfirm={handleConfirmDeleteContact}
			>
				<p>Esta ação não poderá ser desfeita! </p>

			</Modal>


			{(!hasError && contacts.length > 0) && (
				<div className="w-full">

					<input className="w-full bg-white border-none rounded-[25px] h-[50px] shadow-modal outline-0 py-0 px-4 placeholder:text-gray-light"
						type="text"
						placeholder="Pesquise pelo nome..."
						onChange={handleChangeSearchTerm}
					/>
				</div>
			)
			}

			<div className={`flex items-center mt-8
       ${hasError ? "justify-end" : (
			contacts.length > 0
				? "justify-between"
				: "justify-center"
		)}  border-b-2 border-solid border-gray-lighter pb-4`}>

				{(!hasError && contacts.length > 0) && (
					<strong className="text-[24px]">
						{filteredContacts.length}
						{filteredContacts.length === 1 ? " contato" : " contatos"}
					</strong>
				)}

				<Link href="/new"
					className="text-primary-main border-2 border-solid border-primary-main rounded py-2 px-4 duration-200 ease-in hover:bg-primary-main hover:text-white"
				>
          Novo contato
				</Link>
			</div>


			{hasError && (
				<ErrorMessage handleTryAgain={handleToggleOrderBy} />
			)}

			{!hasError && (
				<>

					{(contacts.length < 1 && !isLoading) && (
						<div className="mt-4 flex flex-col items-center">
							<Image src={emptyBox} alt="emptyBox" />
							<p className="text-gray-light text-center mt-2">
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong className="text-primary-main">”Novo contato”</strong> à cima para cadastrar o seu primeiro!
							</p>
						</div>
					)}


					{(contacts.length > 0 && filteredContacts.length < 1) && (
						<div className="mt-4 flex items-start">
							<Image src={magnifierQuestion} alt="magnifierQuestion" />
							<span className="text-gray-light ml-6 break-all">
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
							</span>
						</div>
					)}




					{filteredContacts.length > 0 && (
						<header className="mt-6 mb-2">

							<button
								type="button"
								className="bg-transparent border-none flex items-center"
								onClick={handleToggleOrderBy} >
								<span className="mr-2 font-bold text-primary-main">
                  Nome
								</span>
								<Image className={`${orderBy === "asc" ? "rotate-180" : "rotate-0"} duration-200 ease-in`}
									src={arrow} alt="Arrow" />
							</button>

						</header>
					)}

					{filteredContacts.map(contact => (

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
									onClick={() => { handleDeleteContact(contact); }}
								>
									<Image src={trash} alt="Delete" />
								</button>

							</div>

						</div>
					))
					}
				</>

			)}

		</div>
	);
}





export const getServerSideProps: GetServerSideProps = async () => {

	let contactsDb: ContactsProps[];
	let err;

	try {
		contactsDb = await ContactsService.listContacts();
		err = false;

	} catch (error) {

		contactsDb = [];
		err = true;
	}


	return {
		props: {
			contactsDb,
			err
		},
	};

};




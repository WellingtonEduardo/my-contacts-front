import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import ErrorMessage from "./components/ErrorMessage";
import useHome from "./useHome";
import InputSearch from "./components/InputSearch";
import HeaderHome from "./components/HeaderHome";
import EmptyList from "./components/EmptyList";
import SearchNotFound from "./components/SearchNotFound";
import ContactsList from "./components/ContactsList";

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

	const hasContacts = !hasError && contacts.length > 0;
	const isListEmpty = !hasError && (!isLoading && !hasContacts);
	const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1 );


	return (

		<div className="mt-8">

			<Loader isLoading={isLoading} />

			{hasContacts && (
				<InputSearch onChangeSearchTerm={handleChangeSearchTerm} />
			)}

			<HeaderHome
				hasError={hasError}
				contactsLength={contacts.length}
				filteredContactsLength={filteredContacts.length}
			/>

			{hasError && <ErrorMessage handleTryAgain={handleToggleOrderBy} />}

			{isListEmpty && <EmptyList />}

			{isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}


			{hasContacts && (
				<>
					<ContactsList
						filteredContacts={filteredContacts}
						orderBy={orderBy}
						onToggleOrderBy={handleToggleOrderBy}
						onDeleteContact={handleDeleteContact}
					/>

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

				</>)}

		</div>
	);
}





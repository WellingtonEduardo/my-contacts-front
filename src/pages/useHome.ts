import { ChangeEvent, useMemo, useState } from "react";

import toast from "@/utils/toast";
import ContactsService from "@/services/ContactsService";

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


interface UseHomeProps {
  contactsDb: ContactsProps[],
  err: boolean
}





export default function useHome({ contactsDb, err }: UseHomeProps) {

	const [contacts, setContacts] = useState<ContactsProps[]>(contactsDb);
	const [orderBy, setOrderBy] = useState("asc");
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(err);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactsProps | null>(null);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const filteredContacts = useMemo(() => contacts.filter(contact => (
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)), [searchTerm, contacts]);




	async function handleToggleOrderBy() {
		try {
			const newOrder = orderBy === "asc" ? "desc" : "asc";
			setOrderBy(newOrder);
			setIsLoading(true);

			const contactsList = await ContactsService.listContacts(newOrder);

			setHasError(false);
			setContacts(contactsList);

		} catch (error) {
			setHasError(true);

		} finally {
			setIsLoading(false);
		}

	}


	function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}


	function handleDeleteContact(contact: ContactsProps) {
		setIsDeleteModalVisible(true);
		setContactBeingDeleted(contact);
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalVisible(false);
		setContactBeingDeleted(null);
	}


	async function handleConfirmDeleteContact() {
		try {
			if (!contactBeingDeleted?.id) {
				return;
			}
			setIsLoadingDelete(true);
			await ContactsService.deleteContact(contactBeingDeleted?.id);

			setContacts((prevState) => (
				prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
			));

			handleCloseDeleteModal();


			toast({
				type: "success",
				text: "Contato deletado com sucesso!"
			});

		} catch {
			toast({
				type: "danger",
				text: "Ocorreu um erro ao deletar o contato!"
			});
		} finally {
			setIsLoadingDelete(false);
		}


	}


	return {
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

	};







}

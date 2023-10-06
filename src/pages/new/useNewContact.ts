import ContactsService from "@/services/ContactsService";

import toast from "@/utils/toast";
import { useRef } from "react";

interface ContactProps {
  name: string,
  email: string,
  phone: string,
  categoryId: string
}

interface RefProps {
  id: string,
  name: string,
  email: string,
  phone: string,
  category: {
    id: string | undefined,
    name: string | undefined,
  }
}

interface ContactFormRef {
  setFieldsValues: (contact: RefProps) => void;
  resetFields: () => void
}





export default function useNewContact() {

	const contactFormRef = useRef<ContactFormRef | null>(null);


	async function handleSubmit(contact: ContactProps) {
		try {

			await ContactsService.createContact(contact);

			toast({ type: "success", text: "Contato criado com sucesso!" });

			contactFormRef.current?.resetFields();

		} catch (error) {
			toast({ type: "danger", text: "Ocorreu um erro ao criar o contato!" });

		}

	}

	return {
		handleSubmit,
		contactFormRef
	};


}

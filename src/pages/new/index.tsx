import ContactsService from "@/services/ContactsService";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import toast from "@/utils/toast";
import { useRef } from "react";

interface FormDataProps {
  name: string,
  email: string,
  phone: string,
  categoryId: string
}

interface RefProps {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}

interface ContactFormRef {
  setFieldsValues: (contact: RefProps) => void;
  resetFields: () => void
}



export default function NewContact() {

	const contactFormRef = useRef<ContactFormRef | null>(null);



	async function handleSubmit(formData: FormDataProps) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryId
			};

			await ContactsService.createContact(contact);

			toast({ type: "success", text: "Contato criado com sucesso!" });

			contactFormRef.current?.resetFields();

		} catch (error) {
			toast({ type: "danger", text: "Ocorreu um erro ao criar o contato!" });


		}

	}


	return (
		<>
			<PageHeader
				title="Novo Contato"
			/>
			<ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar"
				ref={contactFormRef}
			/>

		</>
	);
}

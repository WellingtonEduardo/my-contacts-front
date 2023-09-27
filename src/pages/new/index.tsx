import ContactsService from "@/services/ContactsService";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

interface FormDataProps {
  name: string,
  email: string,
  phone: string,
  categoryId: string
}

export default function NewContact() {


	async function handleSubmit(formData: FormDataProps) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryId
			};

			const response = await ContactsService.createContact(contact);

			return response;


		} catch (error) {
			alert(error);
		}

	}


	return (
		<>
			<PageHeader
				title="Novo Contato"
			/>
			<ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />

		</>
	);
}

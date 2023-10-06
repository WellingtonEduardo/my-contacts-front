import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import useNewContact from "./useNewContact";



export default function NewContact() {

	const { contactFormRef, handleSubmit } = useNewContact();

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

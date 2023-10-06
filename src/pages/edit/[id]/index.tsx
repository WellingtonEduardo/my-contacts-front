import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Loader from "@/components/Loader";
import useEditContact from "./useEditContact";


export default function EditContact() {

	const {
		contactFormRef,
		contactName,
		handleSubmit,
		isLoading
	} = useEditContact();


	return (
		<>
			<Loader isLoading={isLoading} />

			<PageHeader
				title={isLoading ? "Carregando..." : `Editar ${contactName}`}
			/>
			<ContactForm buttonLabel="Salvar alterações"
				onSubmit={handleSubmit}
				ref={contactFormRef}
			/>
		</>

	);
}

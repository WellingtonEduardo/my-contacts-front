
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";


import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Loader from "@/components/Loader";

import ContactsService from "@/services/ContactsService";
import toast from "@/utils/toast";
import UseIsMounted from "@/hooks/useIsMounted";


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


export default function EditContact() {

	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState("");

	const router = useRouter();

	const contactFormRef = useRef<ContactFormRef | null>(null);

	const isMounted = UseIsMounted();





	useEffect(() => {
		const id = router.query.id;

		async function loadContact() {

			try {

				const contactData = await ContactsService.getContactById(id as string);


				if (isMounted()) {
					contactFormRef.current?.setFieldsValues(contactData);
					setIsLoading(false);
					setContactName(contactData.name);
				}

			} catch (error) {

				if (isMounted()) {
					router.push("/");
					toast({ type: "danger", text: "Contato nâo existe", duration: 3000 });
				}

			}


		}


		if (id) {
			loadContact();
		}

	}, [isMounted, router]);



	async function handleSubmit(formData: FormDataProps) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryId
			};

			const contactData = await ContactsService.updateContact(router.query.id as string, contact);

			setContactName(contactData.name);


			toast({ type: "success", text: "Contato editado com sucesso!" });

		} catch (error) {
			toast({ type: "danger", text: "Ocorreu um erro ao editar o contato!" });
		}

	}


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

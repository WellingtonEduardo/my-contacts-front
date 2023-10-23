import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import ContactsService from "@/services/ContactsService";
import toast from "@/utils/toast";
import UseIsMounted from "@/hooks/useIsMounted";


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


export default function useEditContact() {

	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState("");

	const router = useRouter();

	const contactFormRef = useRef<ContactFormRef | null>(null);

	const isMounted = UseIsMounted();


	useEffect(() => {
		const id = router.query.id;
		const controller = new AbortController();

		async function loadContact() {

			try {

				const contactData = await ContactsService.getContactById(id as string, controller.signal);


				if (isMounted()) {
					contactFormRef.current?.setFieldsValues(contactData);
					setIsLoading(false);
					setContactName(contactData.name);
				}

			} catch (error) {

				if (error instanceof DOMException && error.name === "AbortError") {
					return;
				}

				if (isMounted()) {
					router.push("/");
					toast({ type: "danger", text: "Contato nâo existe", duration: 3000 });
				}


			}
		}

		if (id) {
			loadContact();
		}

		return () => {
			controller.abort();
		};


	}, [isMounted, router]);



	async function handleSubmit(contact: ContactProps) {
		try {


			const contactData = await ContactsService.updateContact(router.query.id as string, contact);

			setContactName(contactData.name);


			toast({ type: "success", text: "Contato editado com sucesso!" });

		} catch (error) {
			toast({ type: "danger", text: "Ocorreu um erro ao editar o contato!" });
		}

	}


	return {
		isLoading,
		contactName,
		handleSubmit,
		contactFormRef,
	};

}

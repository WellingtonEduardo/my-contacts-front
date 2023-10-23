import { FormEvent, ForwardedRef, useEffect, useImperativeHandle, useState } from "react";
import useErrors from "@/hooks/useErros";
import isEmailValid from "@/utils/isEmailValid";
import formatPhone from "@/utils/formatPhone";

import CategoriesService from "@/services/CategoriesService";


interface categoriesProps {
  id: string | undefined,
  name: string | undefined
}
interface ContactFormRef {
  setFieldsValues: (contact: RefProps) => void;
  resetFields: () => void
}
interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

interface UseContactFormProps {
  ref: ForwardedRef<ContactFormRef>,
  onSubmit: (data: FormDataProps) => void;
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


export default function useContactForm({ onSubmit, ref }: UseContactFormProps) {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [categoryId, setCategoryId] = useState("");

	const [categories, setCategories] = useState<categoriesProps[]>([]);
	const [isLoadingCategories, setLoadingCategories] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { erros, setError, removeError, getErrorMessageByFieldName } = useErrors();

	const isFormValid = (name && erros.length === 0);



	useImperativeHandle(ref, () => {
		return {
			setFieldsValues: (contact: RefProps) => {
				setName(contact.name ?? "");
				setEmail(contact.email ?? "");
				setPhone(formatPhone(contact.phone ?? ""));
				setCategoryId(contact.category.id ?? "");
			},
			resetFields: () => {
				setName("");
				setEmail("");
				setPhone(formatPhone(""));
				setCategoryId("");
			}
		};
	}, []);






	useEffect(() => {

		const controller = new AbortController();

		async function loadCategories() {

			try {
				const categoriesList = await CategoriesService.listCategories(controller.signal);
				setCategories(categoriesList);
			} catch(error) {
				if (error instanceof DOMException && error.name === "AbortError") {
					return;
				}

			}
			finally {
				setLoadingCategories(false);
			}

		}

		loadCategories();

		return ()=>{
			controller.abort();
		};

	}, []);



	function handleNameChange(nameContact: string) {
		setName(nameContact);

		if (!nameContact) {

			setError({ field: "name", message: "Nome é obrigatório." });

		} else {
			removeError("name");
		}

	}


	function handleEmailChange(emailContact: string) {
		setEmail(emailContact);

		if (emailContact && !isEmailValid(emailContact)) {

			setError({ field: "email", message: "E-mail inválido." });

		} else {
			removeError("email");
		}

	}


	function handlePhoneChange(phoneContact: string) {
		setPhone(formatPhone(phoneContact));
	}



	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setIsSubmitting(true);

		await onSubmit({ name, email, phone, categoryId });

		setIsSubmitting(false);

	}


	return {
		name,
		email,
		handleSubmit,
		getErrorMessageByFieldName,
		handleNameChange,
		isSubmitting,
		handleEmailChange,
		phone,
		handlePhoneChange,
		isLoadingCategories,
		categoryId,
		setCategoryId,
		categories,
		isFormValid,
	};





}


import React, { FormEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useErrors from "@/hooks/useErros";
import isEmailValid from "@/utils/isEmailValid";
import formatPhone from "@/utils/formatPhone";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import CategoriesService from "@/services/CategoriesService";


interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (data: FormDataProps) => void;
}

interface categoriesProps {
  id: string;
  name: string;
}

interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}


interface ContactFormRef {
  setFieldsValues: (contact: RefProps) => void;
  resetFields: () => void
}
interface RefProps {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}



const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
	({ buttonLabel, onSubmit }, ref) => {

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
					setCategoryId(contact.category_id ?? "");
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

			async function loadCategories() {
				try {
					const categoriesList = await CategoriesService.listCategories();
					setCategories(categoriesList);
				} catch { }
				finally {
					setLoadingCategories(false);
				}

			}

			loadCategories();

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


		return (
			<form onSubmit={handleSubmit} noValidate>
				<FormGroup error={getErrorMessageByFieldName("name")}>

					<Input type="text" placeholder="Nome *" value={name}
						error={getErrorMessageByFieldName("name")}
						handleChange={handleNameChange}
						disabled={isSubmitting}
					/>

				</FormGroup>

				<FormGroup error={getErrorMessageByFieldName("email")}>

					<Input type="email" placeholder="E-mail" value={email}
						error={getErrorMessageByFieldName("email")}
						handleChange={handleEmailChange}
						disabled={isSubmitting}

					/>

				</FormGroup>

				<FormGroup>
					<Input type="text" placeholder="Telefone" value={phone}
						maxLength={15}
						handleChange={handlePhoneChange}
						disabled={isSubmitting}
					/>
				</FormGroup>

				<FormGroup isLoading={isLoadingCategories}>
					<Select value={categoryId} setChange={setCategoryId} isLoading={isLoadingCategories || isSubmitting} >

						<option value="">sem categoria</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}

					</Select>
				</FormGroup>

				<div className="mt-6">

					<Button typeButton="submit"
						wFull={true} danger={false}
						disabled={!isFormValid}
						isLoading={isSubmitting}
					>
						{buttonLabel}
					</Button>

				</div>

			</form>
		);
	}

);

ContactForm.displayName = "ContactForm";

export default ContactForm;








import { forwardRef } from "react";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import useContactForm from "./useContactForm";

interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (data: FormDataProps) => void;
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
  id: string,
  name: string,
  email: string,
  phone: string,
  category: {
    id: string | undefined,
    name: string | undefined,
  }
}


const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
	({ buttonLabel, onSubmit }, ref) => {

		const {
			name,
			email,
			categories,
			categoryId,
			getErrorMessageByFieldName,
			handleEmailChange,
			handleNameChange,
			handlePhoneChange,
			handleSubmit,
			isFormValid,
			isLoadingCategories,
			isSubmitting,
			phone,
			setCategoryId
		} = useContactForm({ onSubmit, ref });


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








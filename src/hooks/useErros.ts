import { useState } from "react";

interface ErrosProps {
  field: string,
  message: string
}


export default function useErrors() {
	const [erros, setErros] = useState<ErrosProps[]>([]);


	function setError({ field, message }: { field: string, message: string }) {
		const errorAlreadyExists = erros.find((error) => error.field === "email");

		if (errorAlreadyExists) {
			return;
		}

		setErros((prevState) => [
			...prevState,
			{ field, message }
		]);

	}

	function removeError(fieldName: string) {

		setErros((prevState) => prevState.filter(
			(error) => error.field !== fieldName));

	}

	function getErrorMessageByFieldName(fieldName: string) {
		return erros.find((error) => error.field === fieldName)?.message;
	}


	return { erros, setError, removeError, getErrorMessageByFieldName };

}

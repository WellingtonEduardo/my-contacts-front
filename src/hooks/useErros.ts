import { useCallback, useState } from "react";

interface ErrosProps {
  field: string,
  message: string
}


export default function useErrors() {
	const [erros, setErros] = useState<ErrosProps[]>([]);


	const setError = useCallback(({ field, message }: { field: string, message: string }) => {
		const errorAlreadyExists = erros.find((error) => error.field === "email");

		if (errorAlreadyExists) {
			return;
		}

		setErros((prevState) => [
			...prevState,
			{ field, message }
		]);

	}, [erros]);


	const removeError = useCallback((fieldName: string) => {
		setErros((prevState) => prevState.filter(
			(error) => error.field !== fieldName));
	}, []);



	const getErrorMessageByFieldName = useCallback((fieldName: string) => {
		return erros.find((error) => error.field === fieldName)?.message;
	}, [erros]);


	return { erros, setError, removeError, getErrorMessageByFieldName };

}

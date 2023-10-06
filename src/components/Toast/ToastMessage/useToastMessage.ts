import { useEffect } from "react";

interface ToastMessageProps {
  message: {
    id: number,
    text: string,
    type?: "default" | "success" | "danger",
    duration?: number
  },
  onRemoveMessage: (id: number) => void

}

export default function useToastMessage({ message, onRemoveMessage }: ToastMessageProps) {

	useEffect(() => {
		const timeoutId = setTimeout(() => {

			onRemoveMessage(message.id);

		}, message.duration || 7000);

		return () => {
			clearTimeout(timeoutId);
		};

	}, [message, onRemoveMessage]);


	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}


	return {
		handleRemoveToast
	};

}

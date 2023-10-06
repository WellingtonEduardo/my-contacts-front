import Button from "../Button";
import { ReactNode, useEffect, useState } from "react";
import ReactPortal from "../ReactPortal";


interface ModalProps {
  danger?: boolean,
  title: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onCancel: () => void,
  onConfirm: () => void,
  visible: boolean,
  isLoading?: boolean,
  children: ReactNode
}



export default function Modal({
	danger = false,
	title,
	cancelLabel = "Cancelar",
	confirmLabel = "Confirmar",
	onCancel,
	onConfirm,
	visible,
	isLoading = true,
	children
}: ModalProps) {

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	if (!visible) {
		return null;
	}


	return (
		<ReactPortal containerId="modal-root">
			<div className="bg-backgroundModal  backdrop-blur-[5px] fixed w-full h-full left-0 top-0 flex items-center justify-center">

				<div className="w-full max-w-[450px] bg-white rounded p-6 shadow-modal">
					<h1 className={danger ? "text-danger-main" : "text-gray-dark"}>
						{title}
					</h1>

					<div className="mt-8">
						{children}
					</div>


					<footer className="mt-8 flex items-center justify-end">

						<button type="button" className="bg-transparent border-none text-[16px] mr-6 text-gray-light"
							onClick={onCancel}
							disabled={isLoading}
						>
							{cancelLabel}
						</button>

						<Button typeButton="button" danger={danger} handleFunctions={onConfirm}
							isLoading={isLoading}
						>
							{confirmLabel}
						</Button>

					</footer>

				</div>
			</div>
		</ReactPortal>
	);





}


import ReactDOM from "react-dom";
import Button from "../Button";
import { useEffect, useState } from "react";

export default function Modal({ danger }: { danger: boolean }) {

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <></>;
	}



	return ReactDOM.createPortal(

		<div className="bg-backgroundModal  backdrop-blur-[5px] absolute w-full h-full left-0 top-0 flex items-center justify-center">

			<div className="w-full max-w-[450px] bg-white rounded p-6 shadow-modal">
				<h1 className={danger ? "text-danger-main" : "text-gray-dark"}>
          Titulo do modal
				</h1>

				<p>
          corpo do modal
				</p>

				<footer className="mt-8 flex items-center justify-end">

					<button type="button" className="bg-transparent border-none text-[16px] mr-2 text-gray-light">
            Cancelar
					</button>

					<Button typeButton="button" danger={danger}>
            Deletar
					</Button>

				</footer>

			</div>
		</div>,
    document.getElementById("modal-root") as Element | DocumentFragment



	);

}

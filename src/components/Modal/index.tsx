
import Button from "../Button";

export default function Modal() {
	return (
		<div className="bg-transparent  backdrop-blur-[5px] absolute w-full h-full left-0 top-0 flex items-center justify-center">

			<div className="w-full max-w-[450px] bg-white rounded p-6 shadow-modal">
				<h1>Titulo do modal</h1>

				<p>
          corpo do modal
				</p>

				<footer className="mt-8 flex items-center justify-end">

					<button type="button" className="bg-transparent border-none text-[16px] mr-2 text-gray-light">
            Cancelar
					</button>

					<Button typeButton="button">
            Deletar
					</Button>

				</footer>

			</div>

		</div>
	);
}

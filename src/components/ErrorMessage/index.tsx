import Image from "next/image";
import Button from "../Button";

import sad from "@/assets/images/sad.svg";

interface ErrorMessage {
  handleTryAgain: () => void;
}


export default function ErrorMessage({ handleTryAgain }: ErrorMessage) {

	return (
		<div className="mt-4 flex items-center">

			<Image src={sad} alt="sad" />

			<div className="ml-6">

				<strong className="text-[22px] text-danger-main block mb-2">
          Ocorreu um erro ao obter os seus contatos!
				</strong>
				<Button typeButton="button" handleTryAgain={handleTryAgain} >
          Tentar Novamente
				</Button>

			</div>

		</div>
	);
}

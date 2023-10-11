import Image from "next/image";

import emptyBox from "@/assets/images/empty-box.svg";

export default function EmptyList() {

	return (
		<div className="mt-4 flex flex-col items-center">
			<Image src={emptyBox} alt="emptyBox" />
			<p className="text-gray-light text-center mt-2">
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong className="text-primary-main">”Novo contato”</strong> à cima para cadastrar o seu primeiro!
			</p>
		</div>
	);
}

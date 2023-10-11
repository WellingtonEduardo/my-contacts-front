import Image from "next/image";

import magnifierQuestion from "@/assets/images/magnifier-question.svg";

export default function SearchNotFound({ searchTerm }: { searchTerm: string }) {

	return (
		<div className="mt-4 flex items-start">
			<Image src={magnifierQuestion} alt="magnifierQuestion" />
			<span className="text-gray-light ml-6 break-all">
        Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
			</span>
		</div>
	);

}

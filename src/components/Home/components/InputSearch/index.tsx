import { ChangeEvent } from "react";

interface InputSearchProps {
  onChangeSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void
}



export default function InputSearch({onChangeSearchTerm}: InputSearchProps) {

	return(
		<div className="w-full">

			<input className="w-full bg-white border-none rounded-[25px] h-[50px] shadow-modal outline-0 py-0 px-4 placeholder:text-gray-light"
				type="text"
				placeholder="Pesquise pelo nome..."
				onChange={onChangeSearchTerm}
			/>
		</div>
	);


}

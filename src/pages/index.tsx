import Link from "next/link";
import arrow from "@/assets/images/icons/arrow.svg";
import edit from "@/assets/images/icons/edit.svg";
import trash from "@/assets/images/icons/trash.svg";
import Modal from "@/components/Modal";
import Image from "next/image";

export default function Home() {
	return (
		<div className="mt-8">


			<Modal />

			<div className="w-full">
				<input className="w-full bg-white border-none rounded-[25px] h-[50px] shadow-modal outline-0 py-0 px-4 placeholder:text-gray-light"
					type="text"
					placeholder="Pesquise pelo nome..." />
			</div>

			<div className="flex items-center justify-between mt-8">
				<strong className="text-[24px]">3 contatos</strong>
				<Link href="/new"
					className="text-primary-main border-2 border-solid border-primary-main rounded py-2 px-4 duration-200 ease-in hover:bg-primary-main hover:text-white"
				>
          Novo contato
				</Link>
			</div>

			<div className="mt-6">
				<header className="mb-2">

					<button type="button"
						className="bg-transparent border-none flex items-center">
						<span className="mr-2 font-bold text-primary-main">
              Nome
						</span>
						<Image src={arrow} alt="Arrow" />
					</button>

				</header>
			</div>


			<div className="bg-white shadow-modal p-4 rounded flex items-center justify-between mt-4">

				<div>

					<div className="flex items-center">
						<strong>Mateus Silva</strong>
						<small className="bg-primary-lighter text-primary-main font-bold uppercase p-1 rounded ml-2">
              Instagram
						</small>
					</div>

					<span className="block text-[14px] text-gray-light">
            wellington@outlook.com
					</span>
					<span className="block text-[14px] text-gray-light">
            (41) 99999-9999
					</span>

				</div>

				<div className="flex items-center">

					<Link href="/edit/123">
						<Image src={edit} alt="Edit" />
					</Link>

					<button type="button" className="bg-transparent border-none ml-2">
						<Image src={trash} alt="Delete" />
					</button>

				</div>

			</div>
		</div>
	);
}

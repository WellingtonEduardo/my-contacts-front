
import arrow from "../../assets/images/icons/arrow.svg";
import Link from "next/link";
import Image from "next/image";

export default function PageHeader({ title }: { title: string }) {
	return (

		<header className="mb-6">

			<Link href="/" className="flex items-center">
				<Image src={arrow} alt="Back" className="mr-2 rotate-[270deg]" />

				<span className="text-primary-main font-bold">
          Voltar
				</span>
			</Link>

			<h1 className="text-[24px]">{title}</h1>

		</header>

	);
}


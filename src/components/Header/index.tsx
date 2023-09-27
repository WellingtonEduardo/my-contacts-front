
import Image from "next/image";
import logo from "../../assets/images/logo.svg";

export default function Header() {
	return (
		<header className="mb-12 mt-[74px] flex flex-col items-center">
			<Image src={logo} priority alt="MyContacts" width="201" />
		</header>
	);
}

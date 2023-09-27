import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../Spinner";

export default function Loader({ isLoader }: { isLoader: boolean }) {

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <></>;
	}


	if (!isLoader) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className=" w-full h-full fixed top-0 left-0 bg-backgroundLoader flex items-center justify-center">

			<Spinner size={"text-[90px]"}/>

		</div>,

    document.getElementById("loader-root") as Element | DocumentFragment
	);






}

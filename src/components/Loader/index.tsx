import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

export default function Loader({ isLoading }: { isLoading: boolean }) {

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <></>;
	}


	if (!isLoading) {
		return null;
	}

	return (
		<ReactPortal containerId="loader-root">

			<div className=" w-full h-full fixed top-0 left-0 bg-backgroundLoader flex items-center justify-center">

				<Spinner size={"text-[90px]"} />

			</div>

		</ReactPortal>

	);






}

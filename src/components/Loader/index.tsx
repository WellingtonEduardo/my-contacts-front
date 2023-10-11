import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";
import useAnimatedUnmount from "@/hooks/useAnimatedUnmount";

export default function Loader({ isLoading }: { isLoading: boolean }) {

	const [isMounted, setIsMounted] = useState(false);

	const { animatedElementRef, shouldRender } = useAnimatedUnmount(isLoading);


	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <></>;
	}


	if (!shouldRender) {
		return null;
	}

	return (
		<ReactPortal containerId="loader-root">

			<div className={`w-full h-full fixed top-0 left-0 bg-backgroundLoader flex items-center justify-center ${isLoading ? "animate-fadeIn" : "animate-fadeOut"}`}
				ref={animatedElementRef}
			>

				<Spinner size={"text-[90px]"} />

			</div>

		</ReactPortal>

	);






}

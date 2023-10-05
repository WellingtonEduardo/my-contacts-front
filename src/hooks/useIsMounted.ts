import { useCallback, useEffect, useRef } from "react";



export default function UseIsMounted() {

	const isMounted = useRef(false);


	useEffect(() => {

		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};

	}, []);


	const getIsMounted = useCallback(() => {
		return isMounted.current;
	}, []);



	return getIsMounted;

}

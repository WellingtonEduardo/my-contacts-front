import { MutableRefObject, createRef, useCallback, useEffect, useRef, useState } from "react";


interface ItemsProps {
  id: number,
  type: "danger" | "default" | "success",
  text: string
}


export default function useAnimatedList(initialValue: ItemsProps[] = []) {

	const [items, setItems] = useState<ItemsProps[]>(initialValue);
	const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

	const animatedElementRefs = useRef(new Map());
	const animationEndListeners = useRef(new Map());



	const handleAnimationEnd = useCallback((id: number) => {
		const removeListener = animationEndListeners.current.get(id);
		removeListener();

		animatedElementRefs.current.delete(id);
		animationEndListeners.current.delete(id);

		setItems(
			(prevState) => prevState.filter((item) => item.id !== id)
		);
		setPendingRemovalItemsIds(
			(prevState) => prevState.filter((itemId) => itemId !== id)
		);

	}, []);


	useEffect(() => {

		pendingRemovalItemsIds.forEach((itemId) => {

			const animatedRef = animatedElementRefs.current.get(itemId);
			const animatedElement = animatedRef?.current;
			const alreadyHasListener = animationEndListeners.current.has(itemId);

			if (animatedElement && !alreadyHasListener) {

				const onAnimationEnd = () => handleAnimationEnd(itemId);
				const removeListener = () => {
					animatedElement.removeEventListener("animationend", onAnimationEnd);
				};

				animatedElement.addEventListener("animationend", onAnimationEnd);
				animationEndListeners.current.set(itemId, removeListener);

			}

		});

	}, [handleAnimationEnd, pendingRemovalItemsIds]);

	useEffect(() => {

		const removeListeners = animationEndListeners.current;

		return () => {
			removeListeners.forEach((removeListener) => removeListener);
		};

	}, []);




	const handleRemoveItem = useCallback((id: number) => {
		setPendingRemovalItemsIds(
			(prevState) => [...prevState, id]
		);
	}, []);



	const getAnimatedRef = useCallback((itemId: number) => {

		let animatedRef = animatedElementRefs.current.get(itemId);

		if (!animatedRef) {
			animatedRef = createRef();
			animatedElementRefs.current.set(itemId, animatedRef);
		}
		return animatedRef;

	}, []);


	const renderList = useCallback((renderItem: (
    message: ItemsProps, { isLeaving }: { isLeaving: boolean, animatedRef: MutableRefObject<HTMLDivElement | null> }) => JSX.Element) => {

		return items.map((item) => {

			const isLeaving = pendingRemovalItemsIds.includes(item.id);

			const animatedRef = getAnimatedRef(item.id);

			return renderItem(item, { isLeaving, animatedRef });

		});

	}, [getAnimatedRef, items, pendingRemovalItemsIds]);




	return {
		items,
		setItems,
		handleRemoveItem,
		renderList
	};

}

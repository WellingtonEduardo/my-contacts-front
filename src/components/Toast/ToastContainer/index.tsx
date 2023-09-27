import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
	return (
		<div className="fixed z-[2] bottom-12 left-1/2 -translate-x-2/4">

			<ToastMessage text="Default toast"/>
			<ToastMessage type="danger" text="Error toast"/>
			<ToastMessage type="success" text="Success toast"/>

		</div>
	);

}


export default function Spinner({ size }: { size: string }) {


	return (
		<div className={`text-primary-main w-[1em] h-[1em] rounded-[50%] animate-spin-load ${size}`}>

		</div>
	);

}

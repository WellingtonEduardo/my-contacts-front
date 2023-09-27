
import { ReactNode } from "react";
import Spinner from "../Spinner";


export default function FormGroup({ children, error, isLoading }: {
  children: ReactNode, error?: string, isLoading?: boolean
}) {
	return (
		<div className="mt-4">

			<div className="relative">
				{children}

				{isLoading && (
					<div className="absolute right-4 top-[18px]">
						<Spinner size={"text-[16px]"}/>
					</div>
				)}
			</div>

			{error && (
				<small className="text-danger-main text-xs mt-2 block">
					{error}
				</small>
			)}

		</div>
	);
}


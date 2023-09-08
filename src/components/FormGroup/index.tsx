
import { ReactNode } from "react";


export default function FormGroup({ children }: { children: ReactNode }) {
	return (
		<div className="mt-4">
			{children}
		</div>
	);
}


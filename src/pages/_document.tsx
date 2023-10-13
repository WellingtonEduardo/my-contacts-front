import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head />


			<body className="bg-background text-[16px] text-gray-dark ">

				<Header />

				<Main />
				<NextScript />

			</body>

		</Html>
	);
}

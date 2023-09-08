import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Sora } from "next/font/google";

const sora = Sora({
	weight: ["200", "300", "400", "500", "700", "800"],
	subsets: ["latin"]
});



export default function App({ Component, pageProps }: AppProps) {

	return (
		<div className={`${sora.className} w-full max-w-[500px] my-0 mx-auto `}>
			<Header />
			<Component {...pageProps} />
		</div>
	);
}

import ToastContainer from "@/components/Toast/ToastContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Sora } from "next/font/google";
import Head from "next/head";


const sora = Sora({
	weight: ["200", "300", "400", "500", "700", "800"],
	subsets: ["latin"]
});



export default function App({ Component, pageProps }: AppProps) {

	return (
		<div className={`${sora.className} w-full max-w-[500px] mx-auto pb-10`}>

			<Head>
				<title>My contacts</title>
			</Head>

			<ToastContainer />

			<div className="px-3">
				<Component {...pageProps} />
			</div>

			<div id="modal-root"></div>
			<div id="loader-root"></div>

		</div>
	);
}

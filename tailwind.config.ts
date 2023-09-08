import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#F6F5FC",
				primary: {
					lighter: "#E0E3FF",
					light: "#6674F4",
					main: "#5061FC",
					dark: "#3346F0",
				},
				gray: {
					light: "#BCBCBC",
					dark: "#222222",
				},
				disabled: "#ccc"
			},
			boxShadow: {
				modal: "0px 4px 10px rgba(0, 0, 0, 0.04)",
			}
		},
	},
	plugins: [],
};
export default config;

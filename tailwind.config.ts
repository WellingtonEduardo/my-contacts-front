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
				backgroundLoader: "rgba(246,245,252,0.7)",
				backgroundModal: "rgba(0,0,0,0.6)",
				primary: {
					lighter: "#E0E3FF",
					light: "#6674F4",
					main: "#5061FC",
					dark: "#3346F0",
				},
				gray: {
					lighter: "#E5E5E5",
					light: "#BCBCBC",
					dark: "#222222",
				},
				danger: {
					light: "#F97171",
					main: "#FC5050",
					dark: "#F63131",
				},
				success: "#51CA73",

				disabled: "#ccc"
			},
			boxShadow: {
				modal: "0px 4px 10px rgba(0, 0, 0, 0.04)",
				toast: "0px 20px 20px -16px rgba(0, 0, 0, 0.25)",
			},
			animation: {
				"spin-load": "round 1.7s infinite ease ,load 1.7s infinite ease",
			},


		},
		keyframes: {
			load: {
				"0%": {
					boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
				},

				"5%, 95%": {
					boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
				},

				"10%, 59%": {
					boxShadow: "0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em"
				},

				"20%": {
					boxShadow: "0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em"
				},

				"38%": {
					boxShadow: "0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em"
				},

				"100%": {
					boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
				}
			},
			round: {
				"0%": {
					webkitTransform: "rotate(0deg)",
					transform: "rotate(0deg)"
				},
				"100%": {
					webkitTransform: "rotate(360deg)",
					transform: "rotate(360deg)"
				}
			}
		}

	},
	plugins: [],
};
export default config;

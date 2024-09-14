/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
			},
			keyframes: {
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};

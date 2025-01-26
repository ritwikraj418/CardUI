module.exports = {
	style: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
			"postcss-loader": {
				sourceMap: false,
			},
		},
	},
	webpack: {
		alias: {},
		configure: {
			module: {
				rules: [
					{
						type: "javascript/auto",
						test: /\.mjs$/,
						use: [],
					},
				],
			},

		},
	},
};

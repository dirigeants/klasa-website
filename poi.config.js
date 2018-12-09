module.exports = {
	entry: './src/main.js',
	output: {
		fileNames: {
			js: 'js/[name].js',
			css: 'css/[name].css'
		},
		html: { template: './index.html' }
	},
	plugins: [
		{ resolve: '@poi/plugin-eslint' }
	]
};

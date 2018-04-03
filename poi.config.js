module.exports = {
	filename: {
		js: 'static/js/[name].js',
		chunk: 'static/js/chunk/[id].chunk.js',
    	css: 'static/css/[name].css'
	},
	copy: { from: 'assets', to: 'static' },
	html: {
		template: "./index.html"
	},
	presets: [
		require('poi-preset-eslint')({ mode: '*' })
	]
};

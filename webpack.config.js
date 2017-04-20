module.exports = {
	entry: "./app/main.js",

	module: {
		loaders: [
			// javascriptj
			{
				test: /\.js/,
				exclude: /node_modules|server/,
			    loader: 'babel-loader'		
			}			
		],
	},

	output: {
		filename: "public/javascript/bundle.js"
	}
};

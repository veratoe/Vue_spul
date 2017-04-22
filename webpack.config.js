module.exports = {
    entry: "./app/app.js",

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules|server/,
			    loader: 'babel-loader'		
			},
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }            
		],
	},

	output: {
		filename: "public/javascript/bundle.js"
	}
};

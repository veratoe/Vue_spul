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
				exclude: /node_modules|server/,
                loader: 'vue-loader'
            },            
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
                    
		],
	},

	output: {
		filename: "public/javascript/bundle.js"
	}
};

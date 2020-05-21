module.exports = {
    entry: './src/index.js',
    module: {
	rules: [
	    {
		test: /\.(js)$/,
		exclude: /node_modules/,
		use: ['babel-loader']
	    },
	    {
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		],
	    },
	    {
		test: /\.(png|svg|jpg|gif)$/,
		use: [ 'file-loader' ],
	    },
	]
    },
    resolve: {
	extensions: ['*', '.js']
    },
    
    output: {
	path: __dirname + '/dist',
	publicPath: '/',
	filename: 'bundle.js'
    },
    devServer: {
	contentBase: './dist'
    }
};

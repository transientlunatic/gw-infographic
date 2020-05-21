var globalizePlugin = require( "globalize-webpack-plugin" );
var production = process.env.NODE_ENV === "production";


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
    plugins: [
	new globalizePlugin({
	    production: production,
	    developmentLocale: "en",
	    supportedLocales: ["en"],
	    messages: "messages/[locale].json",
	    output: "i18n/[locale].[chunkhash].js"})
    ],
    output: {
	path: __dirname + '/dist',
	publicPath: '/',
	filename: 'bundle.js'
    },
    devServer: {
	contentBase: './dist'
    }
};

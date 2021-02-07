const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {

	// mode: 'development',
	mode: 'production',
	devtool: 'source-map',

	entry: './src/index.ts',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		environment: {
			arrowFunction: false,
			const: false
		},
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										"chrome": '88'
									},
									"corejs": "3",
									"useBuiltIns": "usage"
								}
							]
						]
					}
				},
					'ts-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											browsers: 'last 2 versions'
										}
									]
								]
							}
						}
					},
					'less-loader'
				]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebPackPlugin({
			// title: 'This is a custom title'
			template: './src/index.html'
		})
	],

	resolve: {
		extensions: ['.ts', '.js']
	}
};

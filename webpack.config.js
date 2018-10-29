const path = require('path');
const merge = require('webpack-merge');

let commonConfig = {
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			// include: [path.resolve(__dirname, 'src')],
			use: 'babel-loader'
		}]
	},
	mode: 'production'
};
let jsFiles = [
	{
		dir: 'assets/js',
		name: 'common',
		library: 'YX',
		libraryTarget: 'umd'
	},
];
let fileConfigs = jsFiles.map((file) => {
	let filePath = './' + file.dir + '/';
	return {
		entry: filePath + file.name + '.js',
		output: {
			path: path.resolve(__dirname, filePath),
			filename: file.name + '.min.js',
			library: file.library,
			libraryTarget: file.libraryTarget
		}
	}
});

module.exports = fileConfigs.map(info => merge(commonConfig, info));
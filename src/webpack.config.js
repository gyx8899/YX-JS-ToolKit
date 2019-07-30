const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const srcDirectory = fs.realpathSync(process.cwd());
const resolveDirectory = relativePath => path.resolve(srcDirectory, relativePath);

const modules = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		}
	]
};
const commonConfig = {
	devtool: "source-map",
	mode: "production"
};
const getCopyPlugins = (fileName, from = '.', to = '.') => {
	let fileNames = [`${fileName}.min.js`, `${fileName}.min.js.map`],
			copyConfigs = fileNames.map((_fileName) => {
				return {
					from: `${from}/${_fileName}`,
					to: `${to}/${_fileName}`,
					force: true,
					cache: true,
					toType: 'file'
				}
			});
	return [
		new CopyWebpackPlugin(copyConfigs),
	];
};
const getDefaultFileInfo = (fileName, entry, path = resolveDirectory('../dist/assets/js')) => {
	return {
		entry: entry || `./app/components/${fileName}.js`,
		output: {
			path: path,
			library: fileName,
			filename: `${fileName}.min.js`,
		},
		module: modules,
	};
};

// src/js/
const srcJSOutput = {
	output: {
		path: path.resolve(__dirname, 'assets/js')
	}
};
const srcJSFileInfo = [
	{
		entry: `./app/YX.js`,
		output: {
			path: resolveDirectory('../dist/assets/js'),
			library: 'YX',
			filename: `common.min.js`,
		},
		module: modules,
	},
	{
		entry: `./app/components/PopupDismiss.js`,
		output: {
			path: resolveDirectory('../dist/assets/js'),
			library: 'PopupDismiss',
			filename: `popupDismiss.min.js`,
		},
		module: modules,
	},
	getDefaultFileInfo('ObserverObject'),
	// merge(getDefaultFileInfo('PopupDismiss'), {
	// 	plugins: getCopyPlugins('PopupDismiss', '../test/assets/js', resolveDirectory('../popupDismiss/jsPlugin'))
	// })
];
const srcJSConfig = merge(commonConfig, srcJSOutput);
const srcJSExports = srcJSFileInfo.map(fileInfo => merge(srcJSConfig, fileInfo));

module.exports = [...srcJSExports];
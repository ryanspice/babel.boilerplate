
/*
	Webpack 4 + Babel 6 + FlowType
		by ryanspice-finnie
*/

require("babel-register");

const webpack = require('webpack');
const path = require('path');
const env = process.argv.indexOf('--env') === -1 ? false : true;

let entry = "main.js";
let vendor = "vendor.js";

const HtmlWebpackPlugin = require('html-webpack-plugin');

//TODO remove this and useu webpack
const plugins = 	[

		//new webpack.NamedModulesPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
		//new webpack.optimize.OccurrenceOrderPlugin(true),

		//new webpack.LoaderOptionsPlugin({
		//	minimize: true,
		//	debug: false
		//})
		//,
		//new HtmlWebpackPlugin()
	];

/*
	If ENV prod is true
		add to plugins
*/

if (env===true) {

	//create minified JS instead of regular
    entry = "app.min.js";

    plugins.push(new webpack.optimize.UglifyJsPlugin({
	      compress: {
            warnings: true,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
	      },
	      output: {
	        comments: false
	      },
	      sourceMap: true
	    })
	);

	/*
	unused html later implement
	html:'./src/index.html',
	path:'./src/',
	*/
    //webpackPlugins.push(new webpackHtmlPlugin({ filename: source.output.html404, template:'./src/404.html' }));

}

module.exports = {
	mode:'development',
	context: '',
	entry: {
		js:[
			'babel-polyfill',
			'./src/index.js'
			]
	},
  output: {
    path: path.resolve(__dirname,"bld"),
    filename: entry,
	publicPath:"/bld/",
	library:"test-0",
	libraryTarget: "umd"
  },
  /*
  optimization:{

	  splitChunks:true
  },
  */
  optimization:{
	  runtimeChunk: false,
	  splitChunks: {
		chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
	  }
},
	module:{
		rules: [
	      {
	        test: /\.js$/,
	        exclude: /(node_modules|bower_components)/,
	        use: {
	          loader: 'babel-loader',
	          options: {
	            presets: ['env']
	          }
	        }
	      }
	    ]
},
resolve: {
	extensions: [
		'.js'
	],
	plugins: [

	],
	modules: [
		'./src',
		'node_modules'
	]
},
plugins:plugins,
devServer: {
    contentBase: './bld',
    hot: true,
    inline: true,
    compress: true,
    stats: {
	        assets: true,
	        children: false,
	        chunks: false,
	        hash: false,
	        modules: false,
	        publicPath: false,
	        timings: true,
	        version: false,
	        warnings: true,
	        colors: {
	            green: '\u001b[32m',
	        }
    	}
	}
}

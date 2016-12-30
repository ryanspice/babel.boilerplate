
require("babel-core/register");

const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.argv.indexOf('--env') === -1 ? false : true;

const _DEFAULT_OUTPUT_JS_ = "main.js";

const _DEFAULT_OUTPUT_VENDORJS_ = "vendor.js";

var _OUTPUT_JS_ = _DEFAULT_OUTPUT_JS_;

const _PLUGINS_ = 	[

		new webpack.NamedModulesPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: _DEFAULT_OUTPUT_VENDORJS_
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
		//,
		//new HtmlWebpackPlugin()
	];



if (env===true)
{

    _OUTPUT_JS_ = "app.min.js";

    _PLUGINS_.push(new webpack.optimize.UglifyJsPlugin({
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
  context: '',
  entry: {
	js:['babel-polyfill', './src/index.js']
  },
  output: {

    path: path.resolve(__dirname,"bld"),
    filename: _OUTPUT_JS_,
	publicPath:"/bld/",
	library:"test-0",
	libraryTarget: "umd"
  },
  module: {
      rules:[
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'file-loader',
                query: {
                  name: '[name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                  'babel-loader'
                ]
            },

      ]
  },
  resolve: {
    extensions: ['.js'],
	  plugins: [],
	  modules: [
	     './src',
	     'node_modules'
     ]
  },
  plugins:_PLUGINS_,
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

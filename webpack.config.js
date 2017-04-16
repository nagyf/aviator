var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var plugins = [
    new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: true
    })
];

if (process.env.NODE_ENV === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
        }
    }));
}

module.exports = {
    entry: './src/index.js',
    devtool: "cheap-eval-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /.less/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
};
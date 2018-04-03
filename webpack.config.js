var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, '');

module.exports = [{
    name: "generator",
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
},
{
    name: "plugin",
    entry: APP_DIR + '/plugin.js',
    output: {
        path: BUILD_DIR,
        filename: 'silainteractiview.js'
    }
}
];

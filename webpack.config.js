require('webpack');
require("@babel/polyfill");
let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


// Устанавливаем дополнительные пути статики
// =========================================
const nodePath            = path.join('node_modules/');
const customNodePathBuild = path.join('/build/');

const sourceMaps = (process.env.MODE === 'development') ? 'cheap-eval-source-map' : false;

module.paths.unshift(customNodePathBuild);


// Стартовый конфиг
// ===============
let config = {
    entry:  {
        // пример entry - меняем их на свои.
        'animation-app': ['@babel/polyfill', __dirname + '/src/index.js'],
    },
    output: {
        path:       path.resolve(__dirname, 'bundle'),
        filename:   '[name].js',
        publicPath: '/bundle/'
    },
    module: {
        rules: [
            // JSX
            // ===
            {
                test:    /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader:  'babel-loader',
                options: {
                    "presets": [
                        "@babel/preset-react",
                        "@babel/preset-env"
                    ],
                    "plugins": [
                        [
                            "@babel/plugin-proposal-class-properties",
                            {
                                "loose": true
                            }
                        ],
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }
            },

        ]
    },

    // игнорируем папку с модулями для скорости. Можно раскомментировать.
    watchOptions: {ignored: /node_modules/},

    // метод сборки source-map. Sourcemaps включаются только в режиме development.
    devtool: sourceMaps,

    resolve:       {
        modules:    [nodePath, customNodePathBuild],
        extensions: ['.js', '.json', '.jsx']
    },

    resolveLoader: {
        modules: [nodePath]
    },

    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },

    externals: {
        jquery: 'jQuery',
        // paper: 'paper'
    }
};

module.exports = config;

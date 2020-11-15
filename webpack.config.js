const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    entry: { main: './src/index.js'},
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                loader: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    // добавьте объект options
                    options: { importLoaders: 1 }
                },
                 'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2)$/,
                
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
};


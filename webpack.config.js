const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts', // Точка входа для вашего приложения
    output: {
        filename: 'bundle.js', // Имя итогового файла
        path: path.resolve(__dirname, 'dist'), // Папка для сохранения итогового файла
    },
    resolve: {
        extensions: ['.ts', '.js'], // Расширения файлов, которые будут обрабатываться
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Обработка файлов с расширением .ts
                use: 'ts-loader', // Используем ts-loader для преобразования его в JS
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Очистка папки dist перед каждой сборкой
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон HTML, на основе которого будет создан итоговый файл
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Директория, откуда будут подаваться статические файлы
        },
        compress: true, // Включение сжатия
        port: 8080, // Порт для сервера разработки
        open: true, // Автоматическое открытие браузера
    },
    mode: 'development', // Режим сборки: development или production
};

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        // подключите autoprefixer
        autoprefixer,
        // cssnano при подключении нужно передать объект опций
        // { preset: default } говорит о том, что нужно использовать
        // стандартные настройки минификации
        cssnano({ preset: 'default' })
    ]
}
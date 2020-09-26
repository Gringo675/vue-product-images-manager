// подключаем общий файл стилей
// похоже, подключается заново к каждому компоненту => подходит только для миксинов и т.п.
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "@/scss/main.scss";'
            }
        }
    }
};
var path = require('path');

// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

module.exports = {
    APP_PORT: 8889
    , DB_HOST: 'localhost'
    , DB_PORT: '27017'
    , DB_NAME: 'blog'
    , DB_USER: ''
    , DB_PASS: ''
    , EXPIRES: 1000 * 60 * 60 * 24 * 30 // 30 days
    , SESSION_PORT: 6379
    , SESSION_SECRET: 'blogbyXq'
    , COOKIE_KEY: 'Xqblog'
    , COOKIE_SECRET: 'blogbyXq'
    
    , UPLOAD_DIR: path.resolve(__dirname, '/uploadFiles')

    , DEFAULT_USER_PASS: '123123'
    , ADMIN: {
        EMAIL: '857609086@qq.com'
        , PASS: 'xiao201408'
        , NAMES: 'wteamXq'
        , SITE: ''
    }
    , DEFAULT_AVATAR: '/style/images/avatar.png'

    // social oauth is close now
    // , SOCIAL_AUTH_INFO: {
    //     APPID: [APPID]
    //     , API_KEY: [API_KEY]
    //     , SCRIPT_KEY: [SCRIPT_KEY]
    // }

    // pager limit
    , ITEM_PER_PAGE: 20

    // ajax return code
    , RCODES: {
        SUCCESS: 0
    }
}

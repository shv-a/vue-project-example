const env = {
    'production': 'https://api.domain.com/v1',
    'development': 'http://api.dev.domain.com/v1'
};

const apiUrls = {
    user: {
        LOGIN: '/login',
        REGISTER: '/register',
        LIST: '/user/list'
    },
    statistics: {
        LIST: '/statistics/list'
    }
};

const keys = {

};

const misc = {
    emailRegex: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneRegex: /^\d+$/
};

export {env, apiUrls, misc}
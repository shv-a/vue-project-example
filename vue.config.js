const webpack = require('webpack');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '1351'
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }
            })
        ]
    }
};
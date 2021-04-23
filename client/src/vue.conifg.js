const path = require('path');

module.export = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer : {
        proxy:{
            '/api': {
                target: 'http://localhost:9001'
            }
        }
    }
}
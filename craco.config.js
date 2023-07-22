const path = require('path');

function resolveSrc(relativePath) {
    return path.resolve(__dirname, 'src/' + relativePath);
}

module.exports = {
    webpack: {
        alias: {
            actions: resolveSrc('actions'),
            components: resolveSrc('components'),
            reducers: resolveSrc('reducers'),
            routes: resolveSrc('routes'),
            utils: resolveSrc('utils'),
            pages: resolveSrc('pages'),
            layout: resolveSrc('layout'),
            hoc: resolveSrc('hoc'),
        }
    }
}

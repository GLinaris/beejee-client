const _config = {
    url: {
        rest: window.location.protocol + '//' + window.location.hostname
    },
    port: {
        rest: '9000',
    },
};

const config = Object.freeze({
    ..._config,
    addr: {
        rest: `${_config.url.rest}:${_config.port.rest}`,
    },
});

export const REST_API_URL = config.addr.rest;
export default config;

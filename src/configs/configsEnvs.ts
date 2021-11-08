import isEmpty from 'lodash/isEmpty';

interface IENVS {
    REACT_APP_MODE: string;
    REACT_APP_IS_DEV: boolean;
    REACT_APP_DOMAIN_URL: string;
    REACT_APP_TOGGLE_REDUX_LOGGER: string;
}

const defaultEnvs = {
    REACT_APP_MODE: 'development',
    REACT_APP_IS_DEV: 'true',
    REACT_APP_DOMAIN_URL: 'http://localhost:3002',
    REACT_APP_TOGGLE_REDUX_LOGGER: 'false',
};

export const getEnvs = () => {
    let envs: any = {};
    try {
        const PROCCESS_ENV = process.env;
        if (!isEmpty(PROCCESS_ENV)) {
            Object.keys(PROCCESS_ENV).map((key: string) => {
                envs[key] = PROCCESS_ENV[key];
                return key;
            });
        }
    } catch (error) {
        console.debug(error);
    } finally {
        envs = isEmpty(envs) ? defaultEnvs : envs;
    }
    return { ...envs, REACT_APP_DOMAIN_URL: window.location.origin };
};

export const ENVS: IENVS = getEnvs();
console.log('ENVS', ENVS);

export const isDev: boolean = ENVS.REACT_APP_MODE === 'development';

export const isToggleReduxLogger = ENVS.REACT_APP_TOGGLE_REDUX_LOGGER === 'true';

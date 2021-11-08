import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { IServer, MAINNET_SERVER } from 'src/services';
import { DEFAULT_THEME, ITheme, lightTheme, darkTheme } from 'src/styles';
import {
    ACTION_TOGGLE_DEV_MODE,
    ACTION_TOGGLE_DARK_MODE,
    ACTION_CHANGE_LANGUAGE,
    ACTION_SET_SERVER,
} from './Setting.constant';

export interface ISettingReducer {
    dev: {
        stagingHomeConfigs: boolean;
        toggleSaveBurnTx: boolean;
        toggleSaveRawBurnTx: boolean;
    };
    isDev: boolean;
    decimalDigits: boolean;
    darkMode: boolean;
    theme: ITheme;
    language: string;
    server: IServer;
}

const initialState: ISettingReducer = {
    dev: {
        stagingHomeConfigs: false,
        toggleSaveBurnTx: false,
        toggleSaveRawBurnTx: false,
    },
    decimalDigits: true,
    isDev: false,
    darkMode: false,
    theme: DEFAULT_THEME,
    language: 'en',
    server: MAINNET_SERVER,
};

const settingReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_TOGGLE_DEV_MODE: {
            return {
                ...state,
                isDev: !state.isDev,
            };
        }
        case ACTION_TOGGLE_DARK_MODE: {
            const darkModeStatus = action.payload;
            return {
                ...state,
                darkMode: darkModeStatus,
                theme: darkModeStatus ? darkTheme : lightTheme,
            };
        }
        case ACTION_CHANGE_LANGUAGE: {
            return {
                ...state,
                language: action.payload,
            };
        }
        case ACTION_SET_SERVER: {
            return {
                ...state,
                server: action.payload,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'setting',
    storage,
    whitelist: ['dev', 'decimalDigits', 'darkMode', 'theme'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, settingReducer);

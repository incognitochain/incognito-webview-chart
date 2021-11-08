import { IAction } from 'src/redux/interface';
import { ACTION_CHANGE_TAB } from './Tabs.constant';
import { ITabsReducer } from './Tabs.interface';

const initialState: ITabsReducer = {
    active: '',
};

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ACTION_CHANGE_TAB: {
            return {
                ...state,
                active: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;

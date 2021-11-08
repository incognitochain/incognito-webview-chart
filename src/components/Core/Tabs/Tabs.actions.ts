import { ACTION_CHANGE_TAB } from './Tabs.constant';

export const actionChangeTab = (payload: number | string) => ({
    type: ACTION_CHANGE_TAB,
    payload,
});

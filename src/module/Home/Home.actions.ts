import { ACTION_FETCHED } from './Home.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

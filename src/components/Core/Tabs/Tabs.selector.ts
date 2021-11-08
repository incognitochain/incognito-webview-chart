import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';

export const tabsSelector = createSelector(
    (state: IRootState) => state.tabs,
    (tabs) => tabs,
);

export const activeTabSelector = createSelector(tabsSelector, (tabs) => tabs.active);

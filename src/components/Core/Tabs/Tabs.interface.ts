import { HTMLAttributes } from 'react';

export interface IPropsTabs extends HTMLAttributes<HTMLElement> {
    children: any[];
}

export interface IPropsTab {
    activeTab: string | number;
    label: string;
    onClickTab?: (tabID: number | string) => any;
    tabID: number | string;
}

export interface ITabsReducer {
    active: number | string;
}

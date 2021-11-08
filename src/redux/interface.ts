import { ITabsReducer } from 'src/components/Core/Tabs';
import { ISettingReducer } from 'src/module/Setting';
import { ITooltipReducer } from 'src/module/Tooltip';

export interface IAction {
    type: string;
    payload: any;
}

export interface IRootState {
    setting: ISettingReducer;
    tooltip: ITooltipReducer;
    tabs: ITabsReducer;
}

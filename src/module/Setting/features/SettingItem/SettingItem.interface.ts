export interface ISettingChildItem {
    desc?: string;
    toggle?: boolean;
    onClick?: () => void;
    link?: string;
    toggleValue?: boolean;
}

export interface ISettingItem {
    title: string;
    child?: ISettingChildItem[];
    button?: boolean;
    onClick?: () => void;
}

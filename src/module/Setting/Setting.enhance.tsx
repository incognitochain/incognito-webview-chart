import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Setting';
import Header from 'src/components/Header';
import { ISettingLanguage } from './Setting.interface';
import { actionToggleDarkMode } from './Setting.actions';
import { ISettingItem } from './features/SettingItem';
import { serverSelector, settingSelector } from './Setting.selector';
import { route as networkRoute } from './features/Network/Network.route';

interface IProps {}
interface TInner {
    settingFactories: any[];
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const translate: ISettingLanguage = useSelector(translateByFieldSelector)('setting');
    const dispatch = useDispatch();
    const { darkMode } = useSelector(settingSelector);
    const server = useSelector(serverSelector);
    let settingFactories: ISettingItem[] = [
        {
            title: translate.network.title,
            child: [{ desc: server.chainURL, link: networkRoute }],
        },
        {
            title: translate.darkMode.title,
            child: [
                {
                    desc: translate.darkMode.desc,
                    toggle: true,
                    onClick: () => dispatch(actionToggleDarkMode(!darkMode)),
                    toggleValue: darkMode,
                },
            ],
        },
    ];
    return (
        <ErrorBoundary>
            <Header />
            <WrappedComponent {...{ ...props, settingFactories }} />
        </ErrorBoundary>
    );
};

export default enhance;

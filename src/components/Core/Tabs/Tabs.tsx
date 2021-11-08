import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import styled from 'styled-components';
import { actionChangeTab } from './Tabs.actions';
import { IPropsTabs } from './Tabs.interface';
import { activeTabSelector } from './Tabs.selector';
import Tab from './Tabs.tab';

const Styled = styled.div`
    &.tabs {
        .tab-list {
            border-radius: 20px;
            padding: 2px;
        }
        .tab-list .tab {
            margin-top: unset;
            flex: 1 0 auto;
            max-width: 48%;
        }
    }
`;

const Tabs = (props: IPropsTabs) => {
    const { children } = props;
    const theme = useSelector(themeSelector);
    const activeTab = useSelector(activeTabSelector);
    const dispatch = useDispatch();
    const onClickTabItem = (tab: number | string) => dispatch(actionChangeTab(tab));
    React.useEffect(() => {
        if (children) {
            dispatch(actionChangeTab(children[0].props.tabID));
        }
    }, []);
    return (
        <Styled className="tabs" theme={theme}>
            <ol className="tab-list flex-jcb">
                {children.map((child) => {
                    const { label, tabID } = child.props;
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClickTab={onClickTabItem}
                            tabID={tabID}
                        />
                    );
                })}
            </ol>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.tabID !== activeTab) return null;
                    return child.props.children;
                })}
            </div>
        </Styled>
    );
};

export default React.memo(Tabs);

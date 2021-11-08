import React, { HTMLAttributes } from 'react';
import { Button } from 'src/components/Core';
import { IPropsTab } from './Tabs.interface';

const Tab = (props: IPropsTab & HTMLAttributes<HTMLDivElement>) => {
    const { activeTab, label, onClickTab, tabID } = props;
    const onClick = () => typeof onClickTab === 'function' && onClickTab(tabID);
    return <Button title={label} onClick={onClick} className="tab" disabled={tabID !== activeTab} />;
};

export default React.memo(Tab);

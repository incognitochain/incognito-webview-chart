import React from 'react';
import styled from 'styled-components';
import { AppIcon, SettingIcon } from 'src/components/Icons';

interface IProps {
    customLeftHeader?: any;
}

const Styled = styled.div`
    &.header {
        margin-bottom: 30px;
    }
`;

const Header = (props: IProps & any) => {
    const { customLeftHeader } = props;
    return (
        <Styled className="header flex-jcb">
            <div className="header-left flex">
                <SettingIcon />
                {customLeftHeader && customLeftHeader}
            </div>
            <div className="header-right">
                <AppIcon />
            </div>
        </Styled>
    );
};

export default Header;

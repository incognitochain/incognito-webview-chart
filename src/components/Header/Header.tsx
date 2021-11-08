import React from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon } from 'src/components/Icons';
import { useHistory } from 'react-router-dom';

const Styled = styled.div`
    &.header {
        margin-bottom: 30px;
    }
`;

const Header = () => {
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    };
    return (
        <Styled className="header">
            <ArrowLeftIcon onClick={handleClick} />
        </Styled>
    );
};

export default React.memo(Header);

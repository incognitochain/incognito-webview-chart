import React, { HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actionRemoveTooltip, actionShowTooltip } from './Tooltip.actions';

const Styled = styled.div``;

const TooltipWrapper = (props: { text: string; id: string } & HTMLAttributes<HTMLDivElement>) => {
    const { id, text, children } = props;
    const ref: any = React.useRef();
    const dispatch = useDispatch();
    const handleHover = () => {
        dispatch(
            actionShowTooltip({
                id,
                text,
                ref: ref ? ref.current : null,
                timeout: 0,
            }),
        );
    };
    const handleHoverOut = () => {
        dispatch(actionRemoveTooltip(id));
    };
    return (
        <Styled ref={ref} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
            {children}
        </Styled>
    );
};

export default TooltipWrapper;

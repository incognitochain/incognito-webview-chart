import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'src/components/Header';
import { actionSetServer, serverSelector } from 'src/module/Setting';
import { IServer, MAINNET_SERVER, TESTNET_SERVER } from 'src/services';
import styled from 'styled-components';

interface INetworkItem {
    title: string;
    desc: string;
    onChangeNetwork?: () => void;
    serverID: string;
}

const Styled = styled.div`
    cursor: pointer;
    .network-item {
        margin-bottom: 30px;
    }
    .network-item .title {
        margin-bottom: 15px;
    }
    .network-item .desc {
    }
`;

const NetworkItem = React.memo((props: INetworkItem) => {
    const { title, desc, onChangeNetwork, serverID } = props;
    const handleClick = () => typeof onChangeNetwork === 'function' && onChangeNetwork();
    const server = useSelector(serverSelector);
    const actived = server.id === serverID;
    return (
        <div className={`network-item ${actived ? 'main-text' : 'sub-text'}`} onClick={handleClick}>
            <p className="title fs-medium">{title}</p>
            <p className="desc fs-regular">{desc}</p>
        </div>
    );
});

const Network = React.memo(() => {
    const defaultServer = useSelector(serverSelector);
    const dispatch = useDispatch();
    const handleChangeNetwork = async (server: IServer) => {
        if (defaultServer.id !== server.id && server.id !== 'local') {
            await dispatch(actionSetServer(server));
        }
    };
    return (
        <Styled>
            <Header />
            {[MAINNET_SERVER, TESTNET_SERVER].map((server) => (
                <NetworkItem
                    key={server.id}
                    serverID={server.id}
                    title={server.name}
                    desc={server.address}
                    onChangeNetwork={() => handleChangeNetwork(server)}
                />
            ))}
        </Styled>
    );
});

export default Network;

import React from 'react';
import styled from 'styled-components';
import * as LightweightCharts from 'lightweight-charts';
import { isJSONString } from 'src/utils';
import copy from 'copy-to-clipboard';

declare global {
    interface Window {
        ReactNativeWebView: any;
    }
}

const Styled = styled.div``;

const Home = () => {
    const ref: any = React.useRef({});
    const [chart, setChart] = React.useState<any>(null);
    const [json, setJSON] = React.useState<any>({ candles: [], chartConfigs: {} });
    const handleConfigsChart = (configs?: any) => {
        try {
            const { lwChartConfigs, lwChartOptions, candlesStickConfigs, candlesStickOptions } = configs;
            const lwChart = LightweightCharts.createChart(ref?.current, lwChartConfigs);
            lwChart.applyOptions(lwChartOptions);
            const candlestickSeries = lwChart.addCandlestickSeries(candlesStickConfigs);
            candlestickSeries.applyOptions(candlesStickOptions);
            setChart(candlestickSeries);
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleMessage = async (message: any) => {
        if (message?.data) {
            let msgData = message.data;
            let [command, data] = msgData?.split('|');
            if (isJSONString(data)) {
                data = JSON.parse(data);
            }
            switch (command) {
                case 'candles': {
                    if (chart) {
                        setJSON({ ...json, candles: msgData });
                        chart.setData(data);
                    }
                    break;
                }
                case 'chartConfigs': {
                    setJSON({ ...json, chartConfigs: msgData });
                    handleConfigsChart(data);
                    if (window?.ReactNativeWebView) {
                        window.ReactNativeWebView.postMessage(
                            JSON.stringify({
                                initted: true,
                            }),
                        );
                    }
                    break;
                }
                default:
                    break;
            }
        }
    };
    React.useEffect(() => {
        if (window?.ReactNativeWebView) {
            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        }
    }, [chart]);
    return (
        <Styled>
            <div ref={ref} id="chart" />
            {/* <button
                onClick={(e) => {
                    e.preventDefault();
                    copy(JSON.stringify(json));
                }}
                type="button"
            >
                Copy data
            </button> */}
        </Styled>
    );
};

export default React.memo(Home);

import React from 'react';
import styled from 'styled-components';
import * as LightweightCharts from 'lightweight-charts';
import { isJSONString } from 'src/utils';

declare global {
    interface Window {
        ReactNativeWebView: any;
    }
    interface Document {
        ReactNativeWebView: any;
    }
}

const Styled = styled.div``;

const delay = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const Home = () => {
    let ref: any = React.useRef({});
    const [msg, setMsg] = React.useState('');
    const [chartConfigs, setChartConfigs] = React.useState<any>(null);
    const [candles, setCandles] = React.useState<any[]>([]);
    const [visible, setVisible] = React.useState(false);
    const handleConfigsChart = async (configs?: any, candles?: any[]) => {
        try {
            const {
                lwChartConfigs,
                lwChartOptions,
                candlesStickConfigs,
                candlesStickOptions,
                type,
                areaStickConfigs,
                areaStickOptions,
            } = configs;
            let lwChart = LightweightCharts.createChart(ref?.current, lwChartConfigs);
            lwChart.applyOptions(lwChartOptions);
            switch (type) {
                case 'candles': {
                    const candlestickSeries = lwChart.addCandlestickSeries(candlesStickConfigs);
                    candlestickSeries.applyOptions(candlesStickOptions);
                    if (candles) {
                        candlestickSeries.setData(candles);
                    }
                    break;
                }
                case 'area': {
                    const areaStick = lwChart.addAreaSeries(areaStickConfigs);
                    areaStick.applyOptions(areaStickOptions);
                    if (candles) {
                        areaStick.setData(candles);
                    }
                    break;
                }
                default:
                    break;
            }
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
                case 'configsChart': {
                    const { chartConfigs, candles } = data;
                    await setVisible(false);
                    await delay(0);
                    await setVisible(true);
                    setChartConfigs(chartConfigs);
                    setCandles(candles);
                    handleConfigsChart(chartConfigs, candles);
                    break;
                }
                default:
                    break;
            }
        }
    };
    React.useEffect(() => {
        if (window?.ReactNativeWebView || document.ReactNativeWebView) {
            window.addEventListener('message', handleMessage);
            document.addEventListener('message', handleMessage);
            return () => {
                document.addEventListener('message', handleMessage);
                window.removeEventListener('message', handleMessage);
            };
        }
    }, []);
    React.useEffect(() => {
        if (window?.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    initted: true,
                }),
            );
        }
        if (document?.ReactNativeWebView) {
            document.ReactNativeWebView.postMessage(
                JSON.stringify({
                    initted: true,
                }),
            );
        }
    }, []);
    return <Styled>{visible && <div ref={ref} id="chart" />}</Styled>;
};

export default React.memo(Home);

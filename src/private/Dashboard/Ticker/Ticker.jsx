import { useState } from "react";
import useWebSocket from "react-use-websocket";
import TickerRow from "./TickerRow";

function Ticker(){

    const TOP_COINS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "PEPEUSDT", "DOGEUSDT", "BNBUSDT", "ADAUSDT", "TRXUSDT", "SUIUSDT"];
    const streams = TOP_COINS.map(coin => coin.toLowerCase() + "@ticker").join("/");

    const [ticker, setTicker] = useState({});

    useWebSocket(process.env.REACT_APP_BWS_URL + "/stream", {
        onOpen: () => console.log("Connected to Binance WS"),
        onMessage: (message) => {
            if(!message) return;
            const jsonObj = JSON.parse(message.data);
            setTicker(prevState => ({
                ...prevState,
                [jsonObj.data.s]: jsonObj.data
            }))
        },
        queryParams: { streams },
        onError: (error) => console.error(error),
        shouldReconnect: (error) => true,
        reconnectInterval: 60000
    });

    return (
        <div className="col-12">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">Price Now</th>
                                <th className="border-bottom col-2" scope="col">Yesterday</th>
                                <th className="border-bottom col-2" scope="col">High</th>
                                <th className="border-bottom col-2" scope="col">Low</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                    TOP_COINS.map(item => (
                                    <TickerRow key={item} symbol={item} data={ticker[item]} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="m-4 mt-3">Data summary from last 24h to now.</div>
            </div>
        </div>
    )
}

export default Ticker;
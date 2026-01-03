
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import TickerRow from "./TickerRow";


function Ticker() {
    const TOP_COINS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT', 'SOLUSDT', 'DOGEUSDT', 'MATICUSDT', 'DOTUSDT', 'LTCUSDT'];
    const [ticker, setTicker] = useState({});

    const stringStream = TOP_COINS.map(coin => coin.toLowerCase() + '@ticker').join('/');

    const {lastJSONMessage} = useWebSocket(process.env.REACT_APP_BWS_URL + '/stream', {
        onOpen: () => console.log('WebSocket connection opened.'),
       
        onMessage: (event) => {
                const message = JSON.parse(event.data);
                setTicker(prev => ({
                    ...prev,
                    [message.data.s]: message.data
                }));
        },
        queryParams: {
            streams: stringStream
        },
        onError: (error) => console.error('WebSocket error:', error),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 60000,
    });

    return (
        <div className="card border=1">
            <div className="card-header shadow">
                <div className="row">
                    <div className="col">
                      <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-Light">
                            <tr>
                                <th className="border-bottom" scope="col">Symbol</th>
                                <th className="border-bottom col-2" scope="col">Now</th>
                                <th className="border-bottom col-2" scope="col">Yesterday</th>
                                <th className="border-bottom col-2" scope="col">High</th>                                
                                <th className="border-bottom col-2" scope="col">Low</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                TOP_COINS.map((item) => (
                                    <TickerRow key={item} Symbol={item} data={ticker[item]} />  
                                ))
                            }                                
                        </tbody>
                    </table>


                </div>
                <div className="card-footer  text-end text-muted fw-light small">
                    Updated every 10 seconds
                </div>
            </div>
        </div>
    )
}

export default Ticker;
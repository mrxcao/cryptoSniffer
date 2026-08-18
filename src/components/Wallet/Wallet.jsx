import { useEffect, useState } from "react";
import { getBalance } from "../../services/ExchangeService";
import WalletRow from "./WalletRow";

function Wallet() {

    const [fiat, setFiat] = useState("");
    const [balances, setBalances] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getBalance()
            .then(info => {
                const balances = Object.entries(info)
                    .map(item => {
                        return {
                            symbol: item[0],
                            available: item[1].available,
                            onOrder: item[1].onOrder
                        }
                    })
                    .sort((a,b) => {
                        if(a.symbol > b.symbol) return 1;
                        if(a.symbol < b.symbol) return -1;
                        return 0;
                    })

                setBalances(balances);
                setFiat(info.fiatEstimate);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err);
                setFiat(err.response ? err.response.data : err.message);
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="col-12">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Wallet</h2>
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">COIN</th>
                                <th className="border-bottom col-3" scope="col">Free</th>
                                <th className="border-bottom col-3" scope="col">Locked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isLoading && balances && balances.length
                                    ? balances.map(item => (
                                        <WalletRow key={item.symbol} symbol={item.symbol} available={item.available} onOrder={item.onOrder} />))
                                    : <tr className="mb-3"><td colSpan={3}>Loading...</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 mb-3 ms-4"><b>Estimate:</b> {fiat}</div>
            </div>
        </div>
    )
}

export default Wallet;
/**
 * props:
 * - symbol
 * - available
 * - onOrder
 */
function WalletRow(props) {

    if (!parseFloat(props.available) && !parseFloat(props.onOrder)) return <></>;

    return (
        <tr>
            <td className="text-gray-900">
                <img className="me-2" width="16" src={`/img/icons/${props.symbol.toLowerCase()}.svg`} />
                {props.symbol}
            </td>
            <td className="text-gray-900">
                {props.available.substring(0, 10)}
            </td>
            <td className="text-gray-900">
                {props.onOrder.substring(0, 10)}
            </td>
        </tr>
    );
}

export default WalletRow;
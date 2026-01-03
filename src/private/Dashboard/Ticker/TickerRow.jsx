import React from "react";

const TickerRow = React.memo(function TickerRow({ Symbol, data }) {
    if (!data) return null;

    function getClass(){
        return parseFloat(data.c) >= parseFloat(data.o) ? 'text-success' : 'text-danger';
    }

    return (
        <tr>
            <td className="text-gray-900 fw-bold">{Symbol}</td>
            <td className={getClass()}> {Number(data.c).toFixed(3)}</td>
            <td>{Number(data.o).toFixed(3)}</td>
            <td>{Number(data.h).toFixed(3)}</td>
            <td>{Number(data.l).toFixed(3)}</td>
        </tr>
    );
});

export default TickerRow;
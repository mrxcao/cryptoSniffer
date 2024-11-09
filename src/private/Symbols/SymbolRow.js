import React from 'react';
/*
Porps
    symbol
    basePrecision
    quotePrecision
    minNotional
    minLotSize
    isFavorite
*/
function SymbolRow(props){
    return (
     <tr>
        <td className="text-gray-900 "> 
            {props.data.symbol}
            
            {            
            props.data.isFavorite ? <svg className="icon icon-xs" fill="yellow" stroke="yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5"  >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                : <React-Fragment></React-Fragment>
            }
        </td>
        <td className="text-gray-900 "> 
            {props.data.basePrecision}
        </td>
        <td className="text-gray-900 "> 
            {props.data.quotePrecision} 
        </td>
        <td className="text-gray-900 "> 
            {props.data.minNotional}
        </td>
        <td className="text-gray-900 "> 
            {props.data.minLotSize}
        </td>
        <td className="text-gray-900 "> 
            <button  key={props.data.id} id={props.data.id} className="btn btn-secondary animate-up-2" wisth={32}>
                <svg  id={props.data.id}  className="icon icon-xs" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
        </td>
    </tr>  
    )
}

export default SymbolRow
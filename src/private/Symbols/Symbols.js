import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { getSymbols, syncSymbols } from '../../services/symbolsService';
import SymbolRow from './SymbolRow';

function symbols() {

    const [symbols, setSymbols] = useState([])
    const [filterText, setFilterText] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'asc' });    
    const history = useHistory();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);


    useEffect(()=>{
        const token = localStorage.getItem('token');        
        getSymbols(token)
          .then(symbols=> {
            setSymbols(symbols)
            
          })
          .catch(err=> {
            if (err.response && err.response.status === 401) return history.push('/')
            console.error(err.message);
            setError(err.response ? err.response.data : err.message);
            setSuccess('')
          })
    }, [])
    function onFormSubmit(event) {
        event.preventDefault();
        /*
        if ((inputNewPassword.current.value || inputConfirmPassword.current.value)
            && inputNewPassword.current.value !== inputConfirmPassword.current.value)
            return setError(`The fields New Password and Confirm Password must be equal.`);
*/

        const token = localStorage.getItem("token");        
        updateSettings({
            login: inputLogin.current.value,
            email: inputEmail.current.value,
            // password: inputNewPassword.current.value ? inputNewPassword.current.value : null,
            apiUrl: inputApiUrl.current.value,
            streamUrl: inputStreamUrl.current.value,
            accessKey: inputAccessKey.current.value,
            secretKey: inputSecretKey.current.value ? inputSecretKey.current.value : null
        }, token)
        .then(result => {
                if (result) {
                    setError('');
                    inputSecretKey.current.value = '';
                    // inputNewPassword.current.value = '';
                    // inputConfirmPassword.current.value = '';
                    return setSuccess(`Settings saved successfully!`);
                }
                else {
                    setSuccess('');
                    return setError(`Can't update the settings.`);
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                return setError(`Can't update the settings.`);
            })
            
    }

    function onClickSync(event) {
        setIsSyncing(true);
        const token = localStorage.getItem('token');
        setSymbols([])
        syncSymbols(token)
          .then(symbols=> {
            // setSymbols(symbols)
            getSymbols(token)
                .then(symbols=> {
                    setSymbols(symbols)
                })
            
            setIsSyncing(false);
          })
          .catch(err=> {
            if (err.response && err.response.status === 401) return history.push('/')
            console.error(err.message);
            setError(err.response ? err.response.data : err.message);
            setSuccess('')
          })
    }

    function handleSort(key) {
    setSortConfig((prev) => {
        if (prev.key === key) {
        // troca asc <-> desc
        return {
            key,
            direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
        }
        // primeira vez que clica nessa coluna
        return { key, direction: 'asc' };
    });
    }

    function getSortIndicator(key) {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }

    // Filtra e ordena os symbols antes de renderizar
    const filteredAndSortedSymbols = [...symbols]
    // FILTRO
    .filter((item) =>
        filterText
        ? item.symbol.toLowerCase().includes(filterText.toLowerCase())
        : true
    )
    // ORDENAÇÃO
    .sort((a, b) => {
        if (!sortConfig?.key) return 0;

        const { key, direction } = sortConfig;
        const dir = direction === 'asc' ? 1 : -1;

        const valA = a[key];
        const valB = b[key];

        // trata número vs string
        if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
        }

        return String(valA).localeCompare(String(valB)) * dir;
    });

    return (
        <React.Fragment>      
        <Menu />
            
            <main className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">         

                            <div className="card-header">
                                <div className="row align-item-center ">
                                    <div className="col">
                                        <h2 className="fs-5 fw-bold mb-0">Symbols</h2>                
                                    </div>
                                </div>
                            </div>                            



                            <div className="row align-item-left ">


                                <div className="col text-end">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Filtrar por symbol..."
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                    />
                                </div>

                                <div className="col">                            
                                    <button
                                    className="btn btn-primary animate-up-2"
                                    type="button"
                                    onClick={onClickSync}
                                    disabled={isSyncing}
                                    >
                                    {isSyncing ? 'Syncing...' : 'Sync'} 
                                    </button>    
                                    <span className="text-muted">
                                    {' '}
                                    {symbols.length > 0 ? symbols.length + ' symbols' : '...'}
                                    </span>
                                </div>                                
                            </div>

                            <div className="table-responsive">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light" >
                                        <tr>
                                            <th className="border-bottom" scope="col" 
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleSort('symbol')}> Symbol</th>
                                            <th className="border-bottom" scope="col" 
                                                style={{ cursor: 'pointer' }} onClick={() => handleSort('basePrecision')}> BAse Prec</th>
                                            <th className="border-bottom" scope="col"
                                                style={{ cursor: 'pointer' }} onClick={() => handleSort('quotePrecision')}> Quote Prec</th>
                                            <th className="border-bottom" scope="col"                                                
                                                style={{ cursor: 'pointer' }} onClick={() => handleSort('minNotional')}> Min Notional</th>
                                            <th className="border-bottom" scope="col" 
                                                style={{ cursor: 'pointer' }} onClick={() => handleSort('minLotSize')} > Min Lot Size</th>
                                            <th > - </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAndSortedSymbols.map((item) => (
                                            <SymbolRow key={item.id || item.symbol} data={item} />
                                        ))}
                                    </tbody>                                      
                                    <tfoot>

                                    </tfoot>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                        { error
                                ? <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        {
                            success
                                ? <div className="alert alert-success mt-2 col-9 py-2">{success}</div>
                                : <React.Fragment></React.Fragment>
                        }
                    </div>
                </div>

            </main>
        </React.Fragment>
    );
}

export default symbols;
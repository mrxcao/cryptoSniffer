import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { getSymbols } from '../../services/symbolsService';
import SymbolRow from './SymbolRow';
import { ERR_TX_INVALID_PROPERTIES_FOR_TYPE } from 'web3';

function symbols() {

    const [symbols, setSymbols] = useState([])
    const history = useHistory();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

                            <div className="table-responsive">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light" >
                                        <tr>
                                            <th className="border-bottom" scope="col"> Symbol</th>
                                            <th className="border-bottom" scope="col"> BAse Prec</th>
                                            <th className="border-bottom" scope="col"> Quote Prec</th>
                                            <th className="border-bottom" scope="col"> Min Notional</th>
                                            <th className="border-bottom" scope="col"> Min Lot Size</th>
                                            <th > - </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { symbols.map(item => <SymbolRow key={item.id} data={item} /> )}
                                    </tbody>                                      
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2">
                                                <button className="btn btn-primary animate-up-2" type="button">
                                                    Sync
                                                </button>
                                            </td>
                                            
                                        </tr>
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
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { getSettings, updateSettings } from '../../services/SettingsService';
// import Symbols from '../Settings/Symbols';
import Menu from '../../components/Menu/Menu';
import { getSettings, updateSettings } from '../../services/SettingsService';

function Settings() {

    const inputLogin = useRef('');
    const inputEmail = useRef('');
//    const inputNewPassword = useRef('');
//    const inputConfirmPassword = useRef('');
    const inputApiUrl = useRef('');
    const inputStreamUrl = useRef('');
    const inputAccessKey = useRef('');
    const inputSecretKey = useRef('');

    const history = useHistory();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(()=>{
        const token = localStorage.getItem('token');        
        getSettings(token)
          .then(settings=> {
            inputLogin.current.value = settings.login;
            inputEmail.current.value = settings.email;            
            inputApiUrl.current.value = settings.apiUrl;            
            inputStreamUrl.current.value = settings.streamUrl;
            inputAccessKey.current.value = settings.accessKey;
            // inputSecretKey.current.value = settings.secretKey;            
          })
          .catch(err=> {
            if (err.response && err.response.status === 401)
                    return history.push('/')
            setError(err.response ? err.response.data : err.message);
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
                            <h2 className="h5 mb-4">Symbols</h2>                
                            
                        </div>
                    </div>
                </div>
                {/* <Symbols /> */}
            </main>
        </React.Fragment>
    );
}

export default Settings;
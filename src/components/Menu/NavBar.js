import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { doLogout } from '../../services/AuthService';

function NavBar() {
  const history = useHistory();

  function onLogoutClick(event) {
    doLogout()
    localStorage.removeItem('token')
    history.push('/login')
  //  alert(event)
  }

  return (
    <React.Fragment>   
      <header>
      <nav >      
        <Link className="navbar-brand me-lg-5" to="/dashboard">
          <img className="navbar-brand-light" src="img/favicon/favicon.png" alt="CryptoDog" />
           <spam className="appTitle">CryptoSniffer</spam>
        </Link>
        <Link className="navbar-brand me-lg-5" to="/login">
          Logar
        </Link>        
        

        {localStorage.getItem("token") && 
          <button onClick={onLogoutClick}>logout</button>}
        {localStorage.getItem("token") == null&& 
        <Link to="/login">        
          <button className="login-button">Login</button>        
        </Link>     }
                
        <div className="d-flex align-items-center">
          <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div> 

      </nav>  
      </header>         
    </React.Fragment>
  );
}

export default NavBar;
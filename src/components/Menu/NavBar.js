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
           <span className="appTitle">CryptoSniffer</span>
        </Link>
        {
          /*
        <Link className="navbar-brand me-lg-5" to="/login">
          Logar
        </Link>        
        */
} 


        <span className="navbar-right">
          <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" 
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </span>
          </button>       

          {localStorage.getItem("token") && 
            <button onClick={onLogoutClick}>logout</button>}
          {localStorage.getItem("token") == null&& 
          <Link to="/login">        
            <button className="login-button">Login</button>        
          </Link>     }
        </span>
     
        
        
      </nav>  
      </header>         
    </React.Fragment>
  );
}

export default NavBar;
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { doLogout } from '../../services/AuthService';
import useTheme from '../../hooks/useTheme';

function NavBar() {
  const history = useHistory();
  const [theme, toggleTheme] = useTheme();

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

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {theme === 'dark' ? (
              <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            ) : (
              <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zM2 9a1 1 0 100 2h1a1 1 0 100-2H2zm2.343-6.243a1 1 0 010 1.414l-.707.707A1 1 0 112.222 3.464l.707-.707a1 1 0 011.414 0zm-.707 12.02a1 1 0 111.414 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"></path>
              </svg>
            )}
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
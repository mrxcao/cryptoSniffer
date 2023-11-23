import React from 'react';
import { Link } from 'react-router-dom';
function Hello() {
  return (

    <header className="App-header">
      <h1>Hello!</h1>

      <p>
        {' '}

        {' '}
      </p>
      <p>
        Edit ||
        {' '}
        <code>src/App.js</code>
        {' '}
        and save to reload.

        
        <div className="alert"><Link to="/login" className="small text-right">LOGIN</Link></div>
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

export default Hello;

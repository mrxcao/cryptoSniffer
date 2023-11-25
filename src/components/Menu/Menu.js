import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

const mostrarComponente = false

function Menu() {
    return (
    <React.Fragment>        
        <NavBar />
        {mostrarComponente && <SideBar />}
        
        
    </React.Fragment>)
}

export default Menu;
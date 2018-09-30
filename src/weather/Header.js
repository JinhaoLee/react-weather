import React from 'react';
import logo from '../images/logo.png';

console.log(logo);
export default function Header(props) {
    return (
        <header>
            <img className="header__logo" src={logo} alt='logo_icon'/>
            <h1 className="header__title">Weather Channel</h1>
        </header>
    )
}
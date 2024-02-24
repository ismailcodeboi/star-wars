import React from 'react';
import logoUrl from '../../assets/star-wars-header.jpg'
import './Header.css';

function Header() {
    return (
        <header className="header">
            <img src={logoUrl} alt="Star Wars"/>
        </header>
    );
}

export default Header;
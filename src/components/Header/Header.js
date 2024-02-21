import React from 'react';
import logoUrl from '../../assets/star-wars-header.webp'
import './Header.css';

function Header(props) {
    return (
        <header className="header">
            <img src={logoUrl} alt="Star Wars"/>
        </header>
    );
}

export default Header;
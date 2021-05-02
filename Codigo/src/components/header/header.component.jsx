import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (<header>
    <h1>AdaptaMaterialEscolar</h1>
    <ul className='links-container'>
        <Link to="/">Inicio</Link>
        <Link to="/help">Ayuda</Link>
        <Link to="/contact">Contacto</Link>
    </ul>
</header>);

export default Header;
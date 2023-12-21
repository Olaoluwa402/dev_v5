import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from './NavItems/NavItems';
import styles from './Navigation.module.css';

// navigation composition
const Navigation = () => {
    return (
        <div className={styles.container}>
            {/* logo component */}
            <NavLink to="/">Expenrazo</NavLink>
            {/* navlink component */}
            <NavItems />
        </div>
    );
};

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItems.module.css';

const NavItems = () => {
    const items = [
        {
            id: 1,
            name: 'Home',
            link: '/'
        },

        {
            id: 2,
            name: 'Expenses',
            link: '/expenses'
        }
    ];
    return (
        <ul className={styles.navItems}>
            {items.map((item) => (
                <li key={item.id}>
                    <NavLink to={item.link}>{item.name}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default NavItems;

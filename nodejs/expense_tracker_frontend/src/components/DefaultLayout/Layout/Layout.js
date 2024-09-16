import React from 'react';
import styles from './Layout.module.css';
import Navigation from '../Navigation/Navigation';
import SideBar from '../SiderBar/SideBar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            {/* Navigation */}
            <Navigation />
            {/* siderbar */}
            {/* <SideBar /> */}
            {/* main - pages*/}
            <div className={styles.main}>{children}</div>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default Layout;

import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Cookies from 'universal-cookie';
import styles from './Header.module.css';

import MenuItem from './components/MenuItem/MenuItem.js';
import Profile from './components/Profile/Profile.js';

const cookies = new Cookies();

const Header = ({ changeScreen, currScreen, handleLogout }) => {

    const [open, setOpen] = useState(true);
    const student = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));

    const logout = () => {
        cookies.remove('jwt');
        sessionStorage.removeItem('APC_sessionClass');
        sessionStorage.removeItem('APC_sessionNews');
        sessionStorage.removeItem('APC_sessionStudent');
        sessionStorage.removeItem('APC_sessionProgress');
        handleLogout();
    }

    const changeMenu = () => {
        setOpen(!open);
    }

    const imgSize = open ? 48 : 32
    const headerClass = [styles.Header];
    if(open) headerClass.push(styles.headerOpen);
    else    headerClass.push(styles.headerClosed);

    return (
    <nav className={headerClass.join(' ')} id="header-bar">
        <div className={styles.headerTopDiv}>
            <div className={styles.headerBranding}>
                <a className="" href="/index.html" className={styles.logo}>
                    <img src="/assets/images/UnB-logo.png" alt="UnB" height={imgSize} width={imgSize} />
                </a>
                <div className={styles.iconBtnPos} >
                <IconButton onClick={() => changeMenu()}>
                    {
                        open ?
                        <Icon className={styles.Icon} fontSize="large">keyboard_arrow_left</Icon> :
                        <Icon className={styles.Icon} fontSize="large">keyboard_arrow_right</Icon>
                    }
                </IconButton>
                </div>
            </div>
            <Profile
                firstName={student.firstname}
                lastName={student.lastname}
                matricula={student.matricula}
                open={open}
            />
        </div>
        <div className={[styles.headerBottomDiv, styles.menuItemContainer].join(' ')}>
            <div className={styles.menuBtnSeparator}>
                <MenuItem
                    icon="home"
                    text="Home"
                    action={() => changeScreen(0)}
                    selected={currScreen === 0}
                    open={open}
                />
                <MenuItem
                    icon="account_circle"
                    text="Perfil"
                    action={() => changeScreen(1)}
                    selected={currScreen === 1}
                    open={open}
                />
            </div>
            <div className={styles.menuBtnSeparator}>
                <MenuItem
                    icon="assessment"
                    text="Provas"
                    action={() => changeScreen(2)}
                    selected={currScreen === 2}
                    open={open}
                />
                <MenuItem
                    icon="assignment"
                    text="Trabalho"
                    action={() => changeScreen(3)}
                    selected={currScreen === 3}
                    open={open}
                />
            </div>

            <MenuItem
                icon="logout"
                text="Sair"
                action={() => logout()}
                selected={false}
                open={open}
            />
        </div>
    </nav>
    );
}

export default Header;
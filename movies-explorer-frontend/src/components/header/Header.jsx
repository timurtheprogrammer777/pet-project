import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../images/logo.svg';
import accountLogoPath from '../../images/account-logo.svg';

function Header({isLoggedIn, isHeaderMain}) {

    const [navigationActive, setNavigationActive] = useState(false);
    const [burgerActive, setBurgerActive] = useState(false);
    const [headerListActive, setHeaderListActive] = useState(false);
    const [headerMainLink, setHeaderMainLink] = useState(false);
    const [isOverlayActive, setIsOverlayActive] = useState(false);

    function handleBurgerClick() {
        setNavigationActive(!navigationActive);
        setBurgerActive(!burgerActive);
        setHeaderListActive(!headerListActive);
        setHeaderMainLink(!headerMainLink);
        setIsOverlayActive(!isOverlayActive);
    }

    return(
        <>
        {isLoggedIn ? (
        <header className={isHeaderMain ? "header" : 'header_authorized'}>
            <div className="header__content">
                <Link className='logo-link' to='/'><img className="logo header__logo" src={logoPath} alt="Лого сайта" /></Link>
                <button className={burgerActive ? 'burger-menu burger-menu_active' : 'burger-menu' } onClick={handleBurgerClick}></button>
                <nav className={navigationActive ? 'header__navigation header__navigation_active' : 'header__navigation'}>
                    <ul className={headerListActive ? 'header__list header__list_active' : 'header__list'}>
                        <li className={headerMainLink  ? 'header__list-item header__list-item-main-link_active' : 'header__list-item header__list-item-main-link' }><Link className='header__list-item-link' to='/'>Главная</Link></li>
                        <li className='header__list-item'><Link className='header__list-item-link' to='/movies'>Фильмы</Link></li>
                        <li className='header__list-item'><Link className='header__list-item-link' to='/saved-movies'>Сохранённые фильмы</Link></li>
                        <div className='header__list-container'>
                            <li className='header__list-container-item'><Link className='header__list-container-link' to='/profile'>Аккаунт</Link></li>
                            <li className='header__list-container-item'><Link className='header__list-logo-link' to='/profile'><img className='header__account-logo' src={accountLogoPath} alt="лого аккаунта"/></Link></li>
                        </div>
                        
                    </ul>
                    <div className={isOverlayActive ? 'overlay overlay_active' : 'overlay'}></div>
                </nav>
            </div>
        </header>
            ) : ( 
        <header className="header">
            <div className="header__content">
                <Link className='logo-link' to='/'><img className="logo header__logo" src={logoPath} alt="Лого сайта" /></Link>
                <Link className="header__link" to="/sign-up">Регистрация</Link>
                <Link className="header__link-btn" to="/sign-in">Войти</Link>
            </div>   
        </header>
        )}
    </>
    );
}

export default Header;

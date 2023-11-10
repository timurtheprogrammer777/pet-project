import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {

    return(
        <footer className="footer">
            <p className="footer__inscription">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content">  
                <p className="footer__copyright">&copy; 2020</p>
                <div className="footer__links">
                    <Link className="footer__link" to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
                    <Link className="footer__link" to="https://github.com/timurtheprogrammer777" target="_blank">Github</Link>
                </div>
            </div> 
        </footer>
    );
}

export default Footer;

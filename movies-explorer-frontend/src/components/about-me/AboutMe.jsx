import React from 'react';
import { Link } from 'react-router-dom';
import profileImagePath from '../../images/profile-pic.svg';

function AboutMe() {

    return(
        <section className="about-me">
            <h2 className="section-title">Студент</h2>
            <div className="about-me__content">
                <img className="about-me__image" src={profileImagePath} alt="фото профиля" />
                <div className="about-me__info">
                    <h3 className="about-me__title">Виталий</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                    С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <Link className="about-me__link" to="https://github.com/timurtheprogrammer777" target="_blank">Github</Link>
                </div>
            </div>
            <div className="about-me__portfolio">
                <h3 className="about-me__portfolio-title">Портфолио</h3>
                <ul className="about-me__list">
                    <li className="about-me__list-item"><Link className="about-me__list-item-link" to="https://github.com/timurtheprogrammer777/how-to-learn" target="_blank">Статичный сайт</Link></li>
                    <li className="about-me__list-item"><Link className="about-me__list-item-link" to="https://github.com/timurtheprogrammer777/russian-travel" target="_blank">Адаптивный сайт</Link></li>
                    <li className="about-me__list-item"><Link className="about-me__list-item-link" to="https://github.com/timurtheprogrammer777/react-mesto-api-full-gha" target="_blank">Одностраничное приложение</Link></li>
                </ul>
            </div>
        </section>
    );
}

export default AboutMe;

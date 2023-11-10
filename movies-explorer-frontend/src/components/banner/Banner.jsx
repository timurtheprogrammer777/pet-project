import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import bannerImgPath from '../../images/web-planet.svg';


function Banner() {

    return(
        <section className="banner">
            <div className="banner__content">
                <img className="banner__image" src={bannerImgPath} alt="фото баннера" />
                <div className="banner__info">
                    <h1 className="banner__title">Учебный проект студента факультета  Веб&#8209;разработки.</h1>
                    <p className="banner__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <Link className="banner__btn" to="about-me" smooth={true}>Узнать больше</Link>
                </div>
            </div>
        </section>
    );
}

export default Banner;

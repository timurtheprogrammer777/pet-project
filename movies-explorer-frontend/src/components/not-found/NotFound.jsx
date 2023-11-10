import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <section className='not-found'>
            <h2 className='not-found__title'>404</h2>
            <h3 className='not-found__subtitle'>Страница не найдена</h3>
            <Link className='not-found__link' to="#" onClick={() => window.history.back()}>Назад</Link>
        </section>
    );
}

export default NotFound;

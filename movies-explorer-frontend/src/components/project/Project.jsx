import React from 'react';

function Project() {

    return(
        <section className="project">
            <h2 className="section-title">О проекте</h2>
            <div className="project__info-text">
                <div className="project__info-text-col-1">
                    <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
                    <p className="project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__info-text-col-2">
                    <h3 className="project__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__line">
                <p className="project__line-text">1 неделя</p>
                <p className="project__line-text">4 недели</p>
            </div>
            <div className="project__underline">
                <p className="project__underline-text">Back-end</p>
                <p className="project__underline-text">Front-end</p>
            </div>
        </section>
    );
}

export default Project;

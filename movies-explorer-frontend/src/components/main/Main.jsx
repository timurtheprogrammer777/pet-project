import React from 'react';
import Banner from '../banner/Banner';
import Project from '../project/Project';
import Technologies from '../technologies/Technologies';
import AboutMe from '../about-me/AboutMe';

function Main() {

    return(
        <main className="main">
            <Banner />
            <Project />
            <Technologies />
            <AboutMe />
        </main>
    );
}

export default Main;

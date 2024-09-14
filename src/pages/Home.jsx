import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import Achievements from '../components/Achievements';
import BusinessFocus from '../components/BusinessFocus';

function Home() {
    return (
        <div>
            <Hero />
            <LatestCollection />
            <BusinessFocus />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
            <Achievements />
        </div>
    );
}

export default Home;
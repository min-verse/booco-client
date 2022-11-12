import React, { useState } from 'react';
import SignupModal from '../users/signup/SignupModal';
import { Hero, Button } from 'react-daisyui';
import Typewriter from 'typewriter-effect';
import LandingHero from './LandingHero';
import LandingFeaturesFirst from './LandingFeaturesFirst';
import LandingFeaturesSecond from './LandingFeaturesSecond';
import LandingFeaturesThird from './LandingFeaturesThird';

function LandingContent() {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible)
    };

    return (
        <>
        {/* <a id="features-scroll" href="#features">go to features</a> */}
            <LandingHero
                visible={visible}
                toggleVisible={toggleVisible}
            />
            <LandingFeaturesFirst />
            <LandingFeaturesSecond />
            <LandingFeaturesThird />
        </>
    )
}

export default LandingContent;
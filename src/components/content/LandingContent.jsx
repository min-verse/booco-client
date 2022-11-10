import React, { useState } from 'react';
import SignupModal from '../SignupModal';
import { Hero, Button, Toast } from 'react-daisyui';
import Typewriter from 'typewriter-effect';

function LandingContent() {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible)
    };

    return (
        <Hero>
            <Hero.Overlay className="bg-opacity-60 px-32 py-72" style={{ backgroundImage: "url(https://i.insider.com/627bc4fd8f41d500187ac408?width=700)", backgroundPosition: 'center', opacity: 0.18 }} />
            <Hero.Content className="text-center py-56">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">BOOCO Shelves</h1>
                    <h2 className="py-6 text-xl">
                        Welcome to BOOCO!
                    </h2>
                    <p className="py-6">
                        BOOCO is here to make sure the books keep coming and the pages keep turning. Join today to keep track of your books and explore all that the literary world has to offer!
                    </p>
                    <p className="py-6">
                        Maybe you're in the mood for...
                    </p>
                    <div style={{ height: 75 }}>
                        <h1 className="text-xl">
                            <Typewriter
                                options={{
                                    strings: [
                                        'a harrowing adventure in the desert for lost treasure',
                                        'an outer space journey to the ends of the universe',
                                        'an undersea escapade where a lost civilization is rediscovered',
                                        'two siblings finding each other again in the big city',
                                        'a boy\'s quest to become the king of the pirates',
                                        'a fairy tale in medeival times where there are no knights',
                                        'a haunting tale of a cursed VHS and three unfortunate teens',
                                        'an autobiography of a deeply influential figure',
                                        'rediscovering what it means to learn more about yourself'
                                    ],
                                    autoStart: true,
                                    deleteSpeed: 10,
                                    delay: 0.1,
                                    pauseFor: 3000,
                                    loop: true,
                                }}
                            />
                        </h1>
                    </div>
                    <Button onClick={toggleVisible} color="info" className="hover:bg-[#075985] mt-4" style={{ color: 'white' }}>Let's Read Together <span style={{ paddingLeft: 5 }}> &#128218;</span></Button>
                    <SignupModal open={visible} toggle={toggleVisible} />
                </div>
            </Hero.Content>
        </Hero>
    )
}

export default LandingContent;
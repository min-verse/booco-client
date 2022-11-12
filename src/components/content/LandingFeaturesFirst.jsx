import React from 'react';

function LandingFeaturesFirst() {

    return (
        <div id="features" className="landing-features-1">
            <div className="landing-features-interior-1">

                <h1 className="landing-features-title">An Extensive Book Libary</h1>
                <p className="landing-features-text">
                    <span style={{ fontWeight: 'bolder' }}>BOOCO</span> has an extensive library for you to peruse. Search through our titles and add them to your tracked books.
                    <br />
                    <br />
                    You can even customize the status of each book in your tracking as "reading", "to-read", or "completed". That way, you'll never lose sight of your reading goals.
                    <br />
                    <br />
                    Set the amount pages you've read in your "reading" books and keep on setting literary goals for yourself!
                </p>
            </div>
            <div className="landing-features-interior-2">
                <img src="https://i.imgur.com/1H6JXfP.png" className="landing-features-images" />
            </div>
        </div>
    )
}

export default LandingFeaturesFirst;
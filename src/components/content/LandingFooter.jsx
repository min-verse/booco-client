import React from 'react';
import { Footer } from 'react-daisyui';

function LandingFooter() {

    return (
        <Footer className="p-10 bg-neutral text-neutral-content" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div>
                <Footer.Title><img src="https://i.imgur.com/OZfArxc.png" 
                style={{
                    width:100,
                    height:100
                }}
                /></Footer.Title>
                <div>BOOCO {new Date().getFullYear()} &#169;&#65039;</div>
            </div>
        </Footer>

    );
}

export default LandingFooter;
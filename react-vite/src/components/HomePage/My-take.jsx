import React, { CSSProperties } from "react";
import './HomePage.css';

const Mytake = ({ items }) => {
    /*
    css box-sizing: border-box is actually fire
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)
    this gives it cool effect at ends
    white-space? kinda interesting
    will white-space: nowrap fix my weird home page issue?
    animation: scroll var(--time) linear infinite; goes hard too
    to use var give html el style='--time'

    what are @keyframes ?
    @keyframes scroll {
    0%(
      transform: translateX(100%)
    )
    100%(
      transform: translateX(-100%)
    )
    }

    what if we just have something hidden and then change its position without changing the postition of other items
    to look infinite
    */
    const email = (e) => {
        e.preventDefault
        window.location = 'mailto:gerardobonillajr.dev@gmail.com';
    }

    return (
        <div className='scroll' >
            <div>
                <img src='./flashcards.png' className='hp-card-imgs' />
                <img src='./tests.png' className='hp-card-imgs' />
                <img src='./signup.png' className='hp-card-imgs' />
                <img src='./lalocard2.png' onClick={email} className='hp-card-imgs' />
            </div>
            <div>
                <img src='./flashcards.png' className='hp-card-imgs' />
                <img src='./tests.png' className='hp-card-imgs' />
                <img src='./signup.png' className='hp-card-imgs' />
                <img src='./lalocard2.png' onClick={email} className='hp-card-imgs' />
            </div>
        </div>
    )
};

export default Mytake;

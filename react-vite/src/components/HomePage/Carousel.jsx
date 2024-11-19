import React, {useEffect, useState} from "react";
import "./HomePage.css";
import '/flashcards.png';
import '/tests.png';
import '/signup.png';
import '/lalocard2.png';

const Carousel = () => {
    const data = ["1", "2", "3","4"];
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselInfiniteScroll = () => {
        if (currentIndex === data.length - 1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }
    useEffect(() => {
        const interval = setInterval(() => { carouselInfiniteScroll() }, 4000)
        //clean up function
        return () => clearInterval(interval)
    })

    const email = (e) => {
        e.preventDefault
        window.location='mailto:gerardobonillajr.dev@gmail.com';
    }

    return (
        <div className='carousel-container'>
            {/* {data.map((item, index) => {
                return <h1 className='carousel-item'
                    style={{ transform: `translate(-${currentIndex * 100}%)` }}
                    key={index}>{item}</h1>
            })} */}
            <img src='./flashcards.png' className="carousel-images carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }}/>
            <img src='./tests.png' className="carousel-images carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }}/>
            <img src='./signup.png' className="carousel-images carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }}/>
            <img src='./lalocard2.png' onClick={email} className="carousel-images carousel-item individual-image-lalo" style={{ transform: `translate(-${currentIndex * 100}%)` }}/>
        </div>
    )
}
export default Carousel;

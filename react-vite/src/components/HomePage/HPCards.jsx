import "./HomePage.css";
import '/flashcards.png';
import '/tests.png';
import '/signup.png';
import '/lalocard2.png';
import { useState, useEffect, useRef } from 'react';

const HPCards = ({ items }) => {
    // Clone first and last items for infinite scrolling
    const extendedItems = [items[items.length - 1], ...items, items[0]];
    const [currentIndex, setCurrentIndex] = useState(1);
    const carouselRef = useRef(null);


    const handleTransitionEnd = () => {
        const carousel = carouselRef.current;

        if (currentIndex === 0) {
            carousel.style.transition = "none";
            setCurrentIndex(items.length);
            carousel.style.transform = `translateX(-${items.length * 100}%)`;
            // carousel.style.transform = `translateX(0rem)`;
        } else if (currentIndex === extendedItems.length - 1) {
            carousel.style.transition = "none";
            setCurrentIndex(1);
            carousel.style.transform = `translateX(-100%)`;
            // carousel.style.transform = `translateX(0rem)`;
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        carousel.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        const transitionEndHandler = () => handleTransitionEnd();
        carousel.addEventListener("transitionend", transitionEndHandler);

        // Cleanup event listener
        return () => carousel.removeEventListener("transitionend", transitionEndHandler);
    }, [currentIndex]);

    const updateCarousel = (direction) => {
        if (direction === "left") {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else if (direction === "right") {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="hp-cards-container">
            <button
                className="carousel-arrow left-arrow"
                onClick={() => updateCarousel("left")}
            >
                ❮
            </button>

            <div
                className="hp-cards-carousel"
                ref={carouselRef}
            >
                {extendedItems.map((item, index) => (
                    <div className="hp-card" key={index}>
                        {item}
                    </div>
                ))}
            </div>

            <button
                className="carousel-arrow right-arrow"
                onClick={() => updateCarousel("right")}
            >
                ❯
            </button>
        </div>
    );
};

export default HPCards;

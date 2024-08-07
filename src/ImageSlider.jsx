import PropTypes from 'prop-types'
import { useState, useRef, useEffect, useCallback } from 'react';
import './ImageSlider.css'

// Prop type validation
ImageSlider.propTypes = {
    slides: PropTypes.object,
    parentWidth: PropTypes.number,
}

function ImageSlider({ slides, parentWidth }) {
    // Timer Ref for the timeout
    const timerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`,
        marginBottom: "20px",
    };

    const slidesContainerStyles = {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
    };

    // Return to the previous image
    const goToPrev = () => {
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    // Move to the next image (callback due to being a dependency for useEffect)
    const goToNext = useCallback(() => {
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    // Go to a specific slide from clicking dot
    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    const getSlideStylesWithBackground = (slideIndex) => ({
        ...slideStyles,
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`,
    });

    const getSlidesContainerStylesWithWidth = () => ({
        ...slidesContainerStyles,
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`
    })

    // To make the slides switch on their own after 3 seconds
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            goToNext();
        }, 3000);

        return () => clearTimeout(timerRef.current);
    }, [goToNext]);

    return (
        <div className='slider'>
            <div className='arrow left-arrow' onClick={goToPrev}><i className="fa-solid fa-chevron-left"></i></div>
            <div className='arrow right-arrow' onClick={goToNext}><i className="fa-solid fa-chevron-right"></i></div>
            <div className='slides-container-overflow'>
                <div style={getSlidesContainerStylesWithWidth()}>
                    {slides.map((_, slideIndex) => (
                        <div key={slideIndex} style={getSlideStylesWithBackground(slideIndex)}></div>
                    ))}
                </div>
            </div>
            <div className='dot-container'>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className='dot' onClick={() => goToSlide(slideIndex)}><i className="fa-solid fa-circle"></i></div>
                ))}
            </div>
        </div>
    );
}

export default ImageSlider
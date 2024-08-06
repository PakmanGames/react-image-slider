import PropTypes from 'prop-types'
import { useState } from 'react';

ImageSlider.propTypes = {
    slides: PropTypes.object,
}

function ImageSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "100%",
        position: "relative",
    }

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`,
    }

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }

    const goToPrev = () => {
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrev}><i className="fa-solid fa-chevron-left"></i></div>
            <div style={rightArrowStyles} onClick={goToNext}><i className="fa-solid fa-chevron-right"></i></div>
            <div style={slideStyles}></div>
        </div>
    );
}

export default ImageSlider
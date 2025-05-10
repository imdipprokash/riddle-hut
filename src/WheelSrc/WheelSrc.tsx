import React, { useState } from 'react';
import './WheelSrc.css'; // Add styles for the wheel

const WheelSrc: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSpin = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            setTimeout(() => {
                setIsSpinning(false);
            }, 3000); // Spin duration
        }
    };

    return (
        <div className="wheel-container" onClick={handleSpin}>
            <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
                <div className="segment">1</div>
                <div className="segment">2</div>
                <div className="segment">3</div>
                <div className="segment">4</div>
                <div className="segment">5</div>
                <div className="segment">6</div>
            </div>
            <p>Tap to Spin</p>
        </div>
    );
};

export default WheelSrc;
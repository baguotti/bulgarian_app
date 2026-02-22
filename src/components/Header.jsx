import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import sealBook from '../assets/seal-book.json';
import sealPencil from '../assets/seal-pencil.json';

const Header = ({ currentTab }) => {
    const lottieRef = useRef(null);
    const isAnimating = useRef(false);
    const prevAnimRef = useRef(null);
    const timerRef = useRef(null);

    // Choose animation based on tab
    const animationData = currentTab === 'practice' ? sealPencil : sealBook;

    // Handle animation triggers with slight debounce to prevent rapid-fire
    useEffect(() => {
        if (!lottieRef.current) return;

        const isCostumeChange = prevAnimRef.current !== animationData;

        // Clear existing timer
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            // Rules:
            // 1. If costume changed (e.g. Book -> Pencil), ALWAYS play.
            // 2. If same costume, only play if not already animating (no-jerk rule).
            if (isCostumeChange || !isAnimating.current) {
                lottieRef.current.goToAndPlay(0);
                isAnimating.current = true;
            }
            prevAnimRef.current = animationData;
        }, 100);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentTab, animationData]);

    const handleSealClick = () => {
        if (lottieRef.current) {
            lottieRef.current.goToAndPlay(0);
            isAnimating.current = true;
        }
    };

    return (
        <header>
            <div className="header-content">
                <div className="header-text">
                    <div className="app-title">Learning<br />Bulgarian</div>
                </div>
                <div className="header-img-container" onClick={handleSealClick} style={{ cursor: 'pointer' }}>
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop={false}
                        autoplay={false}
                        className="header-seal"
                        style={{ height: '100px', width: 'auto' }}
                        onComplete={() => {
                            isAnimating.current = false;
                        }}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { vocabulary } from '../../data/vocabulary';
import {
    Shuffle, Folder, ChevronDown, Hash, Palette,
    Users, UtensilsCrossed, Package, Heart,
    Zap, Clock, MapPin, Star, Volume2
} from 'lucide-react';
import { containerVariants, itemVariants } from '../../data/animations';
import { triggerHaptic } from '../../utils/haptics';

const FlashcardGame = () => {
    const [activeDeck, setActiveDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [category, setCategory] = useState("Numbers");
    const [isRandom, setIsRandom] = useState(true);

    // Categories and their icons
    const categoryIcons = {
        "Numbers": Hash,
        "Colors": Palette,
        "Family": Users,
        "Food": UtensilsCrossed,
        "Objects": Package,
        "Body": Heart,
        "Verbs": Zap,
        "Time": Clock,
        "Places": MapPin,
        "Adjectives": Star
    };

    // Initial Load
    useEffect(() => {
        if (vocabulary && vocabulary.length > 0) {
            updateDeck(isRandom ? "All" : category, isRandom);
        } else {
            console.error("Vocabulary data is missing or empty!");
        }
    }, []);

    const updateDeck = (cat, random) => {
        let deck = [...vocabulary];
        if (cat !== "All") {
            deck = deck.filter(c => c.cat === cat);
        }

        if (random) {
            // Shuffle
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }

        setActiveDeck(deck);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleCategoryChange = (newCat) => {
        setIsRandom(false);
        setCategory(newCat);
        updateDeck(newCat, false);
    };

    const toggleRandom = () => {
        setIsRandom(true);
        updateDeck("All", true);
    };

    const nextCard = () => {
        triggerHaptic('medium');
        setIsFlipped(false);
        if (isRandom) {
            setCurrentIndex(Math.floor(Math.random() * activeDeck.length));
        } else {
            setCurrentIndex(prev => (prev + 1) % activeDeck.length);
        }
    };

    const speak = (text) => {
        triggerHaptic('light');
        if (!window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bg-BG';

        // Find a Bulgarian voice if possible
        const voices = window.speechSynthesis.getVoices();
        const bgVoice = voices.find(v => v.lang.startsWith('bg'));

        if (!bgVoice) {
            // Check again in case voices were loaded asynchronously
            const retryVoices = window.speechSynthesis.getVoices();
            const retryBgVoice = retryVoices.find(v => v.lang.startsWith('bg'));

            if (retryBgVoice) {
                utterance.voice = retryBgVoice;
            } else {
                // If still no voice, we just don't play anything (silently fail as requested)
                return;
            }
        } else {
            utterance.voice = bgVoice;
        }

        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
    };

    if (activeDeck.length === 0) return (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Loading flashcards...
        </div>
    );

    const card = activeDeck[currentIndex];
    const categories = Object.keys(categoryIcons);
    const SelectedIcon = isRandom ? Folder : (categoryIcons[category] || Folder);

    return (
        <motion.section
            className="section active"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* Integrated Mode/Category Toggle */}
            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}
                variants={itemVariants}
            >
                {/* Random Button */}
                <button
                    className={`nav-tab ${isRandom ? 'active' : ''}`}
                    style={{
                        padding: '0.6rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        height: '42px'
                    }}
                    onClick={toggleRandom}
                >
                    <Shuffle size={16} />
                    Random
                </button>

                {/* Integrated Category Dropdown */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={isRandom ? "" : category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className={`nav-tab ${!isRandom ? 'active' : ''}`}
                        style={{
                            padding: '0.6rem 2.2rem 0.6rem 2.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            appearance: 'none',
                            cursor: 'pointer',
                            height: '42px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: !isRandom ? 'var(--accent-bg)' : 'transparent',
                            color: !isRandom ? 'var(--accent-color)' : 'var(--text-secondary)',
                            zIndex: 2,
                            position: 'relative',
                            minWidth: '165px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isRandom && <option value="" disabled>By Category</option>}
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown
                        size={14}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: !isRandom ? 'var(--accent-color)' : 'var(--text-secondary)',
                            zIndex: 3
                        }}
                    />
                    <SelectedIcon
                        size={14}
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 3,
                            pointerEvents: 'none',
                            color: !isRandom ? 'var(--accent-color)' : 'var(--text-secondary)',
                            opacity: !isRandom ? 0.9 : 0.6
                        }}
                    />
                </div>
            </motion.div>

            {/* Card Counter */}
            <motion.div style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                opacity: 0.7
            }} variants={itemVariants}>
                {isRandom ? 'Random Deck' : category} • <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{currentIndex + 1}</span> / {activeDeck.length}
            </motion.div>

            {/* The Flashcard */}
            <motion.div className="flashcard" onClick={() => {
                triggerHaptic('light');
                setIsFlipped(!isFlipped);
            }} variants={itemVariants}>
                <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flashcard-front">
                        {/* Speaker Toggle */}
                        <button
                            onClick={(e) => { e.stopPropagation(); speak(card.bg); }}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'rgba(99, 133, 139, 0.15)',
                                border: '1px solid var(--accent-color)',
                                borderRadius: '8px',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent-color)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            className="speaker-btn"
                        >
                            <Volume2 size={20} />
                        </button>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{card.bg}</div>
                        <div style={{ color: 'var(--accent-color)', marginTop: '1rem' }}>Tap to flip</div>
                    </div>
                    <div className="flashcard-back">
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 500, textAlign: 'center', color: '#FFFFFF' }} dangerouslySetInnerHTML={{ __html: card.lat }} />
                            <div style={{ color: 'var(--accent-color)', marginTop: '1rem', textAlign: 'center', fontWeight: 600 }}>{card.en}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div variants={itemVariants} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button className="action-btn" onClick={(e) => { e.stopPropagation(); nextCard(); }}>
                    Next Word →
                </button>
            </motion.div>
        </motion.section>
    );
};

export default FlashcardGame;

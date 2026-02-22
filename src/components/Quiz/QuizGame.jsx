import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizToBe, quizNationalities, quizProfessions, quizUnit2Grammar } from '../../data/quizzes';
import { Trophy, Star, ThumbsUp, Dumbbell, ArrowLeft } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

// Helper for shuffling
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Sleek Progress Bar - Thinner and more subtle
const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;
    return (
        <div style={{
            width: '33%', // One third of the length
            height: '8px', // Thicker
            background: 'var(--border-color)',
            borderRadius: '4px',
            overflow: 'hidden',
        }}>
            <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'var(--accent-color)', // Solid color for a cleaner look
                borderRadius: '2px',
                transition: 'width 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
            }} />
        </div>
    );
};

// Premium Minimalist Header
const QuizHeader = ({ onBack, current, total }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2.5rem',
        width: '100%'
    }}>
        <button
            onClick={onBack}
            style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                transition: 'color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-color)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
            <ArrowLeft size={20} />
        </button>

        <ProgressBar current={current} total={total} />

        <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            opacity: 0.8,
            fontWeight: 500,
            minWidth: '40px'
        }}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{current}</span> / {total}
        </div>
    </div>
);

const QuizGame = ({ topicId, onBack }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Initialize Quiz
    useEffect(() => {
        let data = [];
        if (topicId === 'tobe') data = quizToBe;
        else if (topicId === 'nationalities') data = quizNationalities;
        else if (topicId === 'professions') data = quizProfessions;
        else if (topicId === 'unit2grammar') data = quizUnit2Grammar;

        const processedQuestions = shuffleArray(data).map(question => {
            const optionsObjs = question.o.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === question.c
            }));
            const shuffledOptionsObjs = shuffleArray(optionsObjs);
            return {
                ...question,
                o: shuffledOptionsObjs.map(opt => opt.text),
                c: shuffledOptionsObjs.findIndex(opt => opt.isCorrect)
            };
        });

        setQuestions(processedQuestions);
        setCurrentIdx(0);
        setScore(0);
        setFinished(false);
        setAnswered(false);
        setSelectedOption(null);
    }, [topicId]);

    const handleAnswer = (index) => {
        if (answered || finished) return;

        setAnswered(true);
        setSelectedOption(index);

        const isCorrect = index === questions[currentIdx].c;
        triggerHaptic(isCorrect ? 'success' : 'error');
        if (isCorrect) setScore(s => s + 1);

        // Auto move next
        setTimeout(() => {
            if (currentIdx + 1 >= questions.length) {
                setFinished(true);
            } else {
                setCurrentIdx(prev => prev + 1);
                setAnswered(false);
                setSelectedOption(null);
            }
        }, isCorrect ? 600 : 2000);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (finished) {
        let message = "Good job!";
        let Icon = ThumbsUp;
        if (score === questions.length) {
            message = "Perfect Score!";
            Icon = Trophy;
        } else if (score > questions.length * 0.8) {
            message = "Excellent work!";
            Icon = Star;
        } else if (score < questions.length * 0.5) {
            message = "Keep practicing!";
            Icon = Dumbbell;
        }

        return (
            <section className="section active">
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <Icon size={48} color="var(--accent-color)" />
                    </div>
                    <h2 style={{ margin: 0, fontWeight: 800 }}>Quiz Completed!</h2>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0', color: 'var(--accent-color)' }}>
                        {score} / {questions.length}
                    </div>
                    <p style={{ margin: '1rem 0', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{message}</p>

                    <button
                        className="action-btn"
                        onClick={onBack}
                        style={{ marginTop: '1.5rem', width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}
                    >
                        Finish Quiz
                    </button>
                </div>
            </section>
        );
    }

    const currentQ = questions[currentIdx];

    return (
        <section className="section active">
            <QuizHeader
                onBack={onBack}
                current={currentIdx + 1}
                total={questions.length}
            />

            <h3 className="quiz-question" style={{
                textAlign: 'center',
                margin: '1rem 0 2.5rem',
                fontSize: '1.6rem',
                fontWeight: 700,
                lineHeight: 1.3
            }}>
                {currentQ.q}
            </h3>

            <div className="options-grid" key={currentIdx}>
                {currentQ.o.map((option, idx) => {
                    const isCorrect = idx === currentQ.c;
                    const isSelected = idx === selectedOption;
                    let className = "option-btn";

                    if (answered) {
                        if (isCorrect) className += " correct";
                        if (isSelected && !isCorrect) className += " incorrect";
                    }

                    return (
                        <motion.button
                            key={idx}
                            className={className}
                            onClick={() => handleAnswer(idx)}
                            disabled={answered}
                            whileHover={!answered ? { scale: 1.02, backgroundColor: '#2A3038' } : {}}
                            whileTap={!answered ? { scale: 0.98 } : {}}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: (answered && isCorrect && isSelected) ? [0, -8, 4, 0] : 0,
                                x: (answered && isSelected && !isCorrect) ? [0, -4, 4, -4, 4, 0] : 0,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.3,
                                delay: idx * 0.05,
                                y: {
                                    duration: 0.4,
                                    ease: "easeOut",
                                    times: [0, 0.4, 0.7, 1]
                                },
                                x: {
                                    duration: 0.4,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
};

export default QuizGame;

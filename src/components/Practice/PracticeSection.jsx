import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizGame from '../Quiz/QuizGame';
import { FileText, Globe, Briefcase, HelpCircle, ChevronLeft } from 'lucide-react';
import { containerVariants, itemVariants } from '../../data/animations';
import practiceBg from '../../assets/practice-bg-v3.webp';

// Premium Back Button Component
const BackButton = ({ onClick, label }) => (
    <button
        onClick={onClick}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            background: 'var(--card-bg)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-color)';
            e.currentTarget.style.color = 'var(--accent-color)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-secondary)';
        }}
    >
        <ChevronLeft size={16} />
        <span>{label}</span>
    </button>
);

const PracticeSection = ({ resetCounter }) => {
    const [activeQuiz, setActiveQuiz] = useState(null);

    React.useEffect(() => {
        setActiveQuiz(null);
    }, [resetCounter]);

    return (
        <AnimatePresence mode="wait">
            {activeQuiz ? (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <QuizGame topicId={activeQuiz} onBack={() => setActiveQuiz(null)} />
                </motion.div>
            ) : (
                <motion.section
                    key="list"
                    className="section active"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, x: -20 }}
                >
                    <motion.div
                        className="card hero-card"
                        variants={itemVariants}
                        style={{
                            backgroundImage: `linear-gradient(rgba(18, 22, 28, 0.7), rgba(18, 22, 28, 0.7)), url(${practiceBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '1px solid var(--border-color)',
                            minHeight: '140px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 800 }}>Practice</h2>
                            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Test your knowledge with quizzes</div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1rem', textAlign: 'center' }} variants={itemVariants}>Unit 1 Topics</motion.h3>

                    <motion.div className="card" onClick={() => setActiveQuiz('tobe')} style={{ cursor: 'pointer' }} variants={itemVariants}>
                        <div className="unit-row">
                            <div className="unit-icon">
                                <FileText size={20} />
                            </div>
                            <div className="unit-info">
                                <div className="unit-title">Verb "To Be" (Съм)</div>
                                <div className="unit-meta">I am, You are, He is...</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="card" onClick={() => setActiveQuiz('nationalities')} style={{ cursor: 'pointer' }} variants={itemVariants}>
                        <div className="unit-row">
                            <div className="unit-icon">
                                <Globe size={20} />
                            </div>
                            <div className="unit-info">
                                <div className="unit-title">Nationalities</div>
                                <div className="unit-meta">Bulgarian, English, Italian...</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', textAlign: 'center' }} variants={itemVariants}>Unit 2 Topics</motion.h3>

                    <motion.div className="card" onClick={() => setActiveQuiz('professions')} style={{ cursor: 'pointer' }} variants={itemVariants}>
                        <div className="unit-row">
                            <div className="unit-icon">
                                <Briefcase size={20} />
                            </div>
                            <div className="unit-info">
                                <div className="unit-title">Professions</div>
                                <div className="unit-meta">Teacher, Doctor, Engineer...</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="card" variants={itemVariants} style={{ cursor: 'default' }}>
                        <div className="unit-row">
                            <div className="unit-icon">
                                <HelpCircle size={20} />
                            </div>
                            <div className="unit-info">
                                <div className="unit-title">Grammar: Negation & Questions</div>
                                <div className="unit-meta" style={{ marginBottom: '0.75rem' }}>Не съм, Ли?, Кой?, Къде?</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {[
                                        { id: 'unit2beginner', label: 'Beginner', meta: 'Negation — не съм, не си, не е...', color: '#22C55E', n: 17 },
                                        { id: 'unit2intermediate', label: 'Intermediate', meta: 'Ли questions + question words', color: '#F59E0B', n: 23 },
                                        { id: 'unit2advanced', label: 'Advanced', meta: 'Dialogues, ли placement & errors', color: '#EF4444', n: 15 },
                                    ].map(({ id, label, meta, color, n }) => (
                                        <div key={id} onClick={() => setActiveQuiz(id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.75rem', borderRadius: '10px', border: `1px solid ${color}44`, background: `${color}11`, cursor: 'pointer', transition: 'background 0.2s' }}
                                            onMouseOver={e => e.currentTarget.style.background = `${color}22`}
                                            onMouseOut={e => e.currentTarget.style.background = `${color}11`}>
                                            <div>
                                                <span style={{ fontWeight: 700, color, fontSize: '0.88rem' }}>{label}</span>
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginLeft: '8px' }}>{meta}</span>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{n} Qs</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default PracticeSection;

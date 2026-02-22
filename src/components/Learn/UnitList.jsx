import React from 'react';
import { motion } from 'framer-motion';
import { Hand, Briefcase, Calendar } from 'lucide-react';
import { containerVariants, itemVariants } from '../../data/animations';
import learningBg from '../../assets/learning-bg-v3.webp';

const UnitList = ({ onSelectUnit }) => {
    return (
        <motion.section
            className="section active"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div
                className="card hero-card"
                variants={itemVariants}
                style={{
                    backgroundImage: `linear-gradient(rgba(18, 22, 28, 0.7), rgba(18, 22, 28, 0.7)), url(${learningBg})`,
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
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 800 }}>Units</h2>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Choose a unit to study</div>
                </div>
            </motion.div>

            {/* Unit 1 */}
            <motion.div className="card" onClick={() => onSelectUnit(1)} variants={itemVariants}>
                <div className="unit-row">
                    <div className="unit-icon">
                        <Hand size={20} />
                    </div>
                    <div className="unit-info">
                        <div className="unit-title">Unit 1: Приятно ми е!</div>
                        <div className="unit-meta">Alphabet, Greetings & Basics</div>
                    </div>
                </div>
                <button className="action-btn">Open Unit 1</button>
            </motion.div>

            {/* Unit 2 */}
            <motion.div className="card" onClick={() => onSelectUnit(2)} variants={itemVariants}>
                <div className="unit-row">
                    <div className="unit-icon">
                        <Briefcase size={20} />
                    </div>
                    <div className="unit-info">
                        <div className="unit-title">Unit 2: Кой е това?</div>
                        <div className="unit-meta">Professions, Identity & Questions</div>
                    </div>
                </div>
                <button className="action-btn">Open Unit 2</button>
            </motion.div>

            {/* Unit 3 */}
            <motion.div className="card" style={{ opacity: 0.7, cursor: 'default' }} variants={itemVariants}>
                <div className="unit-row">
                    <div className="unit-icon">
                        <Calendar size={20} />
                    </div>
                    <div className="unit-info">
                        <div className="unit-title">Unit 3: Coming Soon</div>
                        <div className="unit-meta">Days, Numbers & Time</div>
                    </div>
                </div>
                <button className="action-btn" style={{ backgroundColor: '#313740', color: '#6B7280', cursor: 'not-allowed' }}>
                    Locked
                </button>
            </motion.div>
        </motion.section>
    );
};

export default UnitList;

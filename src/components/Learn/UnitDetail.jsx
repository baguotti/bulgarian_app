import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Coffee, Sun, Moon, MessageSquare, Handshake,
    User, ThumbsUp, Smile, HelpCircle, MapPin,
    Compass, Stethoscope, GraduationCap, HardHat, Car, Briefcase, Search, ChevronLeft,
    CheckCircle2, XCircle, Target, BookOpen, Layers
} from 'lucide-react';
import { containerVariants, itemVariants } from '../../data/animations';

// Full Alphabet Data
const alphabet = [
    { upper: 'А', lower: 'а', sound: 'a' },
    { upper: 'Е', lower: 'е', sound: 'e' },
    { upper: 'И', lower: 'и', sound: 'i' },
    { upper: 'О', lower: 'о', sound: 'o' },
    { upper: 'У', lower: 'у', sound: 'u' },
    { upper: 'Ъ', lower: 'ъ', sound: 'a (ago)' },
    { upper: 'Б', lower: 'б', sound: 'b' },
    { upper: 'В', lower: 'в', sound: 'v' },
    { upper: 'Г', lower: 'г', sound: 'g' },
    { upper: 'Д', lower: 'д', sound: 'd' },
    { upper: 'Ж', lower: 'ж', sound: 'zh' },
    { upper: 'З', lower: 'з', sound: 'z' },
    { upper: 'К', lower: 'к', sound: 'k' },
    { upper: 'Л', lower: 'л', sound: 'l' },
    { upper: 'М', lower: 'м', sound: 'm' },
    { upper: 'Н', lower: 'н', sound: 'n' },
    { upper: 'П', lower: 'п', sound: 'p' },
    { upper: 'Р', lower: 'р', sound: 'r' },
    { upper: 'С', lower: 'с', sound: 's (sun)' },
    { upper: 'Т', lower: 'т', sound: 't (top)' },
    { upper: 'У', lower: 'у', sound: 'oo (boot)' },
    { upper: 'Ф', lower: 'ф', sound: 'f (fish)' },
    { upper: 'Х', lower: 'х', sound: 'h (hot)' },
    { upper: 'Ц', lower: 'ц', sound: 'ts (cats)' },
    { upper: 'Ч', lower: 'ч', sound: 'ch (chat)' },
    { upper: 'Ш', lower: 'ш', sound: 'sh (shop)' },
    { upper: 'Щ', lower: 'щ', sound: 'sht (fresh tea)' },
    { upper: 'Ь', lower: 'ь', sound: 'soft sign' },
    { upper: 'Ю', lower: 'ю', sound: 'yu (you)' },
    { upper: 'Я', lower: 'я', sound: 'ya (yard)' },
];

// Verb "To Be" conjugation
const verbToBe = [
    { pronoun: 'Аз (I)', verb: 'съм', translation: 'I am' },
    { pronoun: 'Ти (You)', verb: 'си', translation: 'You are' },
    { pronoun: 'Той (He)', verb: 'е', translation: 'He is' },
    { pronoun: 'Тя (She)', verb: 'е', translation: 'She is' },
    { pronoun: 'То (It)', verb: 'е', translation: 'It is' },
    { pronoun: 'Ние (We)', verb: 'сме', translation: 'We are' },
    { pronoun: 'Вие (You pl.)', verb: 'сте', translation: 'You are' },
    { pronoun: 'Те (They)', verb: 'са', translation: 'They are' },
];

// Nationalities
const nationalities = [
    { flag: '🇧🇬', country: 'България', man: 'Българин', woman: 'Българка' },
    { flag: '🇬🇧', country: 'Англия', man: 'Англичанин', woman: 'Англичанка' },
    { flag: '🇮🇹', country: 'Италия', man: 'Италианец', woman: 'Италианка' },
    { flag: '🇪🇸', country: 'Испания', man: 'Испанец', woman: 'Испанка' },
    { flag: '🇫🇷', country: 'Франция', man: 'Французин', woman: 'Французойка' },
    { flag: '🇩🇪', country: 'Германия', man: 'Германец', woman: 'Германка' },
];

// Back Button Component (Premium Style)
const BackButton = ({ onClick, label }) => (
    <button
        onClick={onClick}
        className="back-btn"
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

const UnitDetail = ({ unitId, onBack }) => {
    const iconStyle = { verticalAlign: 'middle', marginRight: '8px', opacity: 0.8 };

    // Interactive Check State (Unit 2)
    const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });

    const handleCheck = (q, isCorrect) => {
        if (answers[q] !== null) return; // Prevent changing answer
        setAnswers(prev => ({ ...prev, [q]: isCorrect }));
    };

    const QButton = ({ qId, label, isCorrect }) => {
        const status = answers[qId];
        const isSelected = status !== null;
        let btnStyle = {
            flex: 1,
            padding: '0.75rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            cursor: isSelected ? 'default' : 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s',
            opacity: isSelected && !isCorrect && status === isCorrect ? 0.5 : 1
        };

        if (isSelected) {
            if (isCorrect) {
                btnStyle.background = 'rgba(34, 197, 94, 0.1)';
                btnStyle.borderColor = '#22C55E';
                btnStyle.color = '#166534';
            } else if (status === isCorrect) { // This was the wrong answer picked
                btnStyle.background = 'rgba(239, 68, 68, 0.1)';
                btnStyle.borderColor = '#EF4444';
                btnStyle.color = '#991B1B';
            }
        }

        return (
            <button
                style={btnStyle}
                onClick={() => handleCheck(qId, isCorrect)}
                disabled={isSelected}
            >
                {label}
            </button>
        );
    };

    return (
        <motion.section
            className="section active"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div variants={itemVariants}>
                <BackButton onClick={onBack} label="Back to Units" />
            </motion.div>

            <motion.div className="card" style={{ textAlign: 'center' }} variants={itemVariants}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {unitId === 1 && 'Unit 1: Приятно ми е!'}
                    {unitId === 2 && <><Target size={28} color="var(--accent-color)" /> Module: The 'Li' Spotlight & Plurals</>}
                </h2>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {unitId === 1 ? 'Nice to meet you!' : 'Zero fluff. Pure mechanics.'}
                </div>
            </motion.div>

            {unitId === 1 && (
                <>
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>The Alphabet (Азбука)</motion.h3>
                    <motion.div className="alphabet-grid" variants={itemVariants}>
                        {alphabet.map((letter, i) => (
                            <div className="letter-card" key={i}>
                                <div className="letter-main">{letter.upper} {letter.lower}</div>
                                <div className="letter-sub">{letter.sound}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>2. Greetings (Поздрави)</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Formal</div>
                                <div style={{ marginBottom: '4px' }}><Coffee size={14} style={iconStyle} /> Добро утро!</div>
                                <div style={{ marginBottom: '4px' }}><Sun size={14} style={iconStyle} /> Добър ден!</div>
                                <div style={{ marginBottom: '4px' }}><Moon size={14} style={iconStyle} /> Добър вечер!</div>
                                <div style={{ marginBottom: '4px' }}><MessageSquare size={14} style={iconStyle} /> Здравейте!</div>
                                <div style={{ marginBottom: '4px' }}><Handshake size={14} style={iconStyle} /> Приятно ми е!</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Informal</div>
                                <div style={{ marginBottom: '4px' }}><Smile size={14} style={iconStyle} /> Здравей / Здрасти!</div>
                                <div style={{ marginBottom: '4px' }}><User size={14} style={iconStyle} /> Как си?</div>
                                <div style={{ marginBottom: '4px' }}><ThumbsUp size={14} style={iconStyle} /> Добре!</div>
                                <div style={{ marginBottom: '4px' }}><Smile size={14} style={iconStyle} /> Чао!</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>3. Grammar: Verb "To Be" (Съм)</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <table className="grammar-table">
                            <thead>
                                <tr>
                                    <th>Pronoun</th>
                                    <th>Verb "to be"</th>
                                    <th>Translation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verbToBe.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.pronoun}</td>
                                        <td style={{ fontWeight: 700 }}>{row.verb}</td>
                                        <td>{row.translation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>4. Nationalities</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <table className="grammar-table">
                            <thead>
                                <tr>
                                    <th style={{ color: 'var(--accent-color)' }}>Country</th>
                                    <th style={{ color: 'var(--accent-color)' }}>Man</th>
                                    <th style={{ color: 'var(--accent-color)' }}>Woman</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nationalities.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.flag} {row.country}</td>
                                        <td>{row.man}</td>
                                        <td>{row.woman}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>5. Dialogue</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ lineHeight: 1.8 }}>
                            <div>— <strong>Здравейте, аз съм Елена.</strong> (Hello, I am Elena.)</div>
                            <div>— <strong>Здравейте, аз съм Мартина.</strong> (Hello, I am Martina.)</div>
                            <div>— <strong>Аз съм от България. А Вие?</strong> (I am from Bulgaria. And you?)</div>
                            <div>— <strong>Аз съм от Италия.</strong> (I am from Italy.)</div>
                            <div>— <strong>Приятно ми е!</strong> (Nice to meet you!)</div>
                        </div>
                    </motion.div>
                </>
            )}

            {unitId === 2 && (
                <>
                    {/* SECTION 1: Grammer Rules */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <BookOpen size={20} color="var(--accent-color)" /> Grammar: The 'Li' Formula
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #22C55E' }}>
                                <div style={{ fontWeight: 800, color: '#166534', marginBottom: '4px' }}>[+] Positive</div>
                                <div style={{ fontSize: '1.1rem' }}>Аз <strong>съм</strong> лекар. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(I am a doctor)</span></div>
                            </div>

                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #EF4444' }}>
                                <div style={{ fontWeight: 800, color: '#991B1B', marginBottom: '4px' }}>[-] Negative</div>
                                <div style={{ fontSize: '1.1rem' }}>Аз <strong>не съм</strong> лекар. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(I am not a doctor)</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>* Put "не" right before "съм".</div>
                            </div>

                            <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                                <div style={{ fontWeight: 800, color: 'var(--primary-color)', marginBottom: '4px' }}>[?] Question</div>
                                <div style={{ fontSize: '1.1rem' }}>Ти лекар <strong>ли си</strong>? <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(Are you a doctor?)</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>* "ли" spotlights the word before it. Spotlight "doctor".</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 2: Cheat Sheet */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <Layers size={20} color="var(--accent-color)" /> Cheat Sheet: Plural Rules
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ padding: '0', overflow: 'hidden' }}>
                        <table className="grammar-table" style={{ margin: 0 }}>
                            <thead>
                                <tr style={{ background: '#12151A' }}>
                                    <th style={{ padding: '1rem' }}>Gender</th>
                                    <th>Ends in...</th>
                                    <th>Plural</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.95rem' }}>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#60A5FA' }}>M</td>
                                    <td>Consonant</td>
                                    <td><strong>-и</strong></td>
                                    <td>студент → студент<strong>и</strong></td>
                                </tr>
                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#F472B6' }}>F</td>
                                    <td>-а / -я</td>
                                    <td><strong>-и</strong></td>
                                    <td>жена → жен<strong>и</strong></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#A78BFA' }}>N</td>
                                    <td>-о / -е</td>
                                    <td><strong>-а / -я</strong></td>
                                    <td>село → сел<strong>а</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>

                    {/* SECTION 3: Gamified Check */}
                    <motion.h3 className="section-title" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        🏆 Interactive Check
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Q1 */}
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>1. How do you ask: "Are you an engineer?"</div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                <QButton qId="q1" label="Ти ли си инженер?" isCorrect={false} />
                                <QButton qId="q1" label="Ти инженер ли си?" isCorrect={true} />
                            </div>
                            {answers.q1 !== null && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: answers.q1 ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {answers.q1 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                    {answers.q1 ? "Correct! 'ли' follows the focus word (engineer)." : "Incorrect. 'ли' should follow 'engineer' to spotlight it."}
                                </div>
                            )}
                        </div>

                        {/* Q2 */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>2. "I am not from England."</div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                <QButton qId="q2" label="Аз не съм от Англия." isCorrect={true} />
                                <QButton qId="q2" label="Аз съм не от Англия." isCorrect={false} />
                            </div>
                            {answers.q2 !== null && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: answers.q2 ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {answers.q2 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                    {answers.q2 ? "Correct! 'не' goes right before 'съм'." : "Incorrect. 'не' must immediately precede the verb 'съм'."}
                                </div>
                            )}
                        </div>

                        {/* Q3 */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>3. Plural of "ресторант" (restaurant - masculine):</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <QButton qId="q3" label="ресторанта" isCorrect={false} />
                                <QButton qId="q3" label="ресторанти" isCorrect={true} />
                            </div>
                            {answers.q3 !== null && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: answers.q3 ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {answers.q3 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                    {answers.q3 ? "Correct! Masculine nouns ending in a consonant take '-и'." : "Incorrect. Ends in a consonant, so it takes '-и'."}
                                </div>
                            )}
                        </div>

                    </motion.div>
                </>
            )}
        </motion.section>
    );
};

export default UnitDetail;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Coffee, Sun, Moon, MessageSquare, Handshake,
    User, ThumbsUp, Smile, HelpCircle, MapPin,
    Compass, Stethoscope, GraduationCap, HardHat, Car, Briefcase, Search, ChevronLeft,
    CheckCircle2, XCircle, Target, BookOpen, Layers, MapPinOff
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
                    {/* SECTION 1: Grammar Rules */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <BookOpen size={20} color="var(--accent-color)" /> 1. Grammar: Positive, Negative & Questions
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #22C55E' }}>
                                <div style={{ fontWeight: 800, color: '#22C55E', marginBottom: '6px' }}>[+] Positive — Subject + съм + Noun</div>
                                <div>Аз <strong>съм</strong> лекар. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— I am a doctor.</span></div>
                                <div>Тя <strong>е</strong> учителка. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— She is a teacher.</span></div>
                                <div>Те <strong>са</strong> студенти. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— They are students.</span></div>
                            </div>
                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #EF4444' }}>
                                <div style={{ fontWeight: 800, color: '#EF4444', marginBottom: '6px' }}>[-] Negative — Subject + не съм + Noun</div>
                                <div>Аз <strong>не съм</strong> лекар. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— I am not a doctor.</span></div>
                                <div>Той <strong>не е</strong> инженер. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— He is not an engineer.</span></div>
                                <div>Ние <strong>не сме</strong> от България. <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— We are not from Bulgaria.</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>💡 Place <strong>не</strong> directly before the verb form. Never separate them.</div>
                            </div>
                            <div style={{ background: 'rgba(79, 70, 229, 0.08)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                                <div style={{ fontWeight: 800, color: 'var(--primary-color)', marginBottom: '6px' }}>[?] Question — Noun + ли + verb (word order stays the same!)</div>
                                <div>Ти лекар <strong>ли</strong> си? <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— Are you a doctor?</span></div>
                                <div>Той студент <strong>ли</strong> е? <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— Is he a student?</span></div>
                                <div>Вие от Италия <strong>ли</strong> сте? <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— Are you from Italy?</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>💡 Bulgarian never inverts word order for yes/no questions. <strong>Ли</strong> does the job instead.</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 2: Negation with all pronouns */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <XCircle size={20} color="var(--accent-color)" /> 2. Negation Table: "Не съм" (I am not)
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ padding: '0', overflow: 'hidden' }}>
                        <table className="grammar-table" style={{ margin: 0 }}>
                            <thead>
                                <tr style={{ background: '#12151A' }}>
                                    <th style={{ padding: '1rem' }}>Pronoun</th>
                                    <th>Negative Form</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.92rem' }}>
                                {[
                                    ['Аз (I)', 'не съм', 'Аз не съм лекар.'],
                                    ['Ти (You)', 'не си', 'Ти не си учител.'],
                                    ['Той/Тя/То (He/She/It)', 'не е', 'Той не е студент.'],
                                    ['Ние (We)', 'не сме', 'Ние не сме от София.'],
                                    ['Вие (You pl.)', 'не сте', 'Вие не сте инженери.'],
                                    ['Те (They)', 'не са', 'Те не са тук.'],
                                ].map(([pron, neg, ex], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{pron}</td>
                                        <td><strong style={{ color: '#EF4444' }}>{neg}</strong></td>
                                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* SECTION 3: Professions */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <Briefcase size={20} color="var(--accent-color)" /> 3. Professions (Професии)
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ padding: '0', overflow: 'hidden' }}>
                        <table className="grammar-table" style={{ margin: 0 }}>
                            <thead>
                                <tr style={{ background: '#12151A' }}>
                                    <th style={{ padding: '1rem' }}>Masculine (M)</th>
                                    <th>Feminine (F)</th>
                                    <th>English</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.92rem' }}>
                                {[
                                    ['лекар', 'лекарка', 'doctor'],
                                    ['учител', 'учителка', 'teacher'],
                                    ['студент', 'студентка', 'student'],
                                    ['инженер', 'инженерка', 'engineer'],
                                    ['адвокат', 'адвокатка', 'lawyer'],
                                    ['журналист', 'журналистка', 'journalist'],
                                    ['пилот', 'пилотка', 'pilot'],
                                    ['готвач', 'готвачка', 'chef'],
                                    ['архитект', 'архитектка', 'architect'],
                                    ['актьор', 'актриса', 'actor/actress'],
                                ].map(([m, f, en], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                        <td style={{ padding: '0.75rem 1rem', color: '#60A5FA', fontWeight: 600 }}>{m}</td>
                                        <td style={{ color: '#F472B6', fontWeight: 600 }}>{f}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{en}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
                            💡 Most masculine professions add <strong>-ка</strong> to form the feminine. Exceptions like актьор → актриса must be memorised.
                        </div>
                    </motion.div>

                    {/* SECTION 4: Plural Rules */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <Layers size={20} color="var(--accent-color)" /> 4. Plural Rules (Множествено число)
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ padding: '0', overflow: 'hidden' }}>
                        <table className="grammar-table" style={{ margin: 0 }}>
                            <thead>
                                <tr style={{ background: '#12151A' }}>
                                    <th style={{ padding: '1rem' }}>Gender</th>
                                    <th>Ends in...</th>
                                    <th>Add</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.92rem' }}>
                                <tr>
                                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#60A5FA' }}>Masculine</td>
                                    <td>consonant</td>
                                    <td><strong>-и</strong></td>
                                    <td>студент → студент<strong>и</strong>, лекар → лекар<strong>и</strong></td>
                                </tr>
                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#F472B6' }}>Feminine</td>
                                    <td>-а / -я</td>
                                    <td><strong>-и</strong> (drop -а/-я)</td>
                                    <td>жена → жен<strong>и</strong>, учителка → учителк<strong>и</strong></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#A78BFA' }}>Neuter</td>
                                    <td>-о / -е</td>
                                    <td><strong>-а / -я</strong></td>
                                    <td>село → сел<strong>а</strong>, море → морет<strong>а</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
                            ⚠️ Irregular plurals exist! E.g. човек → хора (person → people), дете → деца (child → children).
                        </div>
                    </motion.div>

                    {/* SECTION 5: Question Words */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <HelpCircle size={20} color="var(--accent-color)" /> 5. Question Words (Въпросителни думи)
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ padding: '0', overflow: 'hidden' }}>
                        <table className="grammar-table" style={{ margin: 0 }}>
                            <thead>
                                <tr style={{ background: '#12151A' }}>
                                    <th style={{ padding: '1rem' }}>Bulgarian</th>
                                    <th>Meaning</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.92rem' }}>
                                {[
                                    ['Кой? / Коя? / Кои?', 'Who? (m/f/pl)', 'Кой е той? — Who is he?'],
                                    ['Какво? / Какъв? / Каква?', 'What? / What kind?', 'Какво е това? — What is this?'],
                                    ['Къде?', 'Where?', 'Къде си ти? — Where are you?'],
                                    ['Откъде?', 'Where from?', 'Откъде си? — Where are you from?'],
                                    ['Кога?', 'When?', 'Кога е урокът? — When is the lesson?'],
                                    ['Защо?', 'Why?', 'Защо не е тук? — Why is he not here?'],
                                    ['Как?', 'How?', 'Как си? — How are you?'],
                                    ['Колко?', 'How many/much?', 'Колко студенти? — How many students?'],
                                ].map(([bg, en, ex], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                        <td style={{ padding: '0.75rem 1rem', color: 'var(--accent-color)', fontWeight: 700 }}>{bg}</td>
                                        <td style={{ fontWeight: 600 }}>{en}</td>
                                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{ex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* SECTION 6: Ли spotlight */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <Search size={20} color="var(--accent-color)" /> 6. Deep Dive: Focusing with 'Ли'
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: '1.7' }}>
                        <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(var(--accent-rgb),0.06)', border: '1px solid var(--border-color)' }}>
                            <strong>Golden Rule:</strong> <strong>Ли</strong> goes <em>immediately after</em> the word you want to emphasise. Word order otherwise stays the same.
                        </div>
                        {[
                            { color: '#60A5FA', label: 'Focus on the noun', bg: 'Ти лекар ли си?', en: 'Are you a doctor? (vs. something else)', note: 'ли follows "лекар"' },
                            { color: '#F472B6', label: 'Focus on the verb', bg: 'Ти работиш ли?', en: 'Do you work? / Are you working?', note: 'ли follows the verb' },
                            { color: '#A78BFA', label: 'Focus on the subject', bg: 'Ти ли си лекарят?', en: 'Are YOU the doctor? (emphasis on you)', note: 'ли follows the pronoun' },
                            { color: '#34D399', label: 'Negative question', bg: 'Той не е ли лекар?', en: "Isn't he a doctor?", note: 'не + е + ли together' },
                        ].map(({ color, label, bg, en, note }, i) => (
                            <div key={i} style={{ padding: '1rem', borderRadius: '12px', border: '1px dashed var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontWeight: 700, color, marginBottom: '4px' }}>{i + 1}. {label}</div>
                                <div style={{ fontSize: '1.1rem' }}>{bg}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{en}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7, marginTop: '4px' }}>💡 {note}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* SECTION 7: Dialogue */}
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }} variants={itemVariants}>
                        <MessageSquare size={20} color="var(--accent-color)" /> 7. Dialogue: At a Party
                    </motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ lineHeight: 2, fontSize: '0.97rem' }}>
                            {[
                                ['Мария', 'Здравей! Аз съм Мария. А ти?', 'Hi! I am Maria. And you?'],
                                ['Георги', 'Здравей, аз съм Георги. Приятно ми е!', 'Hi, I am Georgi. Nice to meet you!'],
                                ['Мария', 'Ти лекар ли си?', 'Are you a doctor?'],
                                ['Георги', 'Не, не съм лекар. Аз съм инженер. А ти?', 'No, I am not a doctor. I am an engineer. And you?'],
                                ['Мария', 'Аз съм журналистка. Откъде си?', 'I am a journalist. Where are you from?'],
                                ['Георги', 'Аз съм от Пловдив. А ти от София ли си?', 'I am from Plovdiv. And are you from Sofia?'],
                                ['Мария', 'Да, от София съм.', 'Yes, I am from Sofia.'],
                            ].map(([speaker, bg, en], i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                                    <span style={{ minWidth: '64px', fontWeight: 700, color: i % 2 === 0 ? '#60A5FA' : '#F472B6', fontSize: '0.85rem', paddingTop: '2px' }}>{speaker}:</span>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>{bg}</span>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}> — {en}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </motion.section>
    );
};

export default UnitDetail;

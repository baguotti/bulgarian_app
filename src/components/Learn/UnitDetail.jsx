import React from 'react';
import { motion } from 'framer-motion';
import {
    Coffee, Sun, Moon, MessageSquare, Handshake,
    User, ThumbsUp, Smile, HelpCircle, MapPin,
    Compass, Stethoscope, GraduationCap, HardHat, Car, Briefcase, Search, ChevronLeft
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
                <h2 style={{ margin: 0 }}>
                    {unitId === 1 ? 'Unit 1: Приятно ми е!' : 'Unit 2: Кой е това?'}
                </h2>
                <div style={{ color: 'var(--text-secondary)' }}>
                    {unitId === 1 ? 'Nice to meet you!' : 'Who is this? • Professions & Questions'}
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
                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>Grammar: Negatives & Questions</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <table className="grammar-table">
                            <thead>
                                <tr>
                                    <th style={{ color: 'var(--accent-color)' }}>Type</th>
                                    <th style={{ color: 'var(--accent-color)' }}>Bulgarian</th>
                                    <th style={{ color: 'var(--accent-color)' }}>English</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Positive (+)</td>
                                    <td>Аз <strong>съм</strong> лекар.</td>
                                    <td>I am a doctor.</td>
                                </tr>
                                <tr>
                                    <td>Negative (-)</td>
                                    <td>Аз <strong>не съм</strong> лекар.</td>
                                    <td>I am <strong>not</strong> a doctor.</td>
                                </tr>
                                <tr>
                                    <td>Question (?)</td>
                                    <td>Ти лекар <strong>ли си</strong>?</td>
                                    <td><strong>Are</strong> you a doctor?</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <div>* Put "<strong>ли</strong>" after the word you are asking about.</div>
                            <div>* Put "<strong>не</strong>" before the verb "съм".</div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>Question Words</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Кой е това?</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Who is this?</div>
                            </div>
                            <div><Search size={24} color="var(--accent-color)" /></div>
                        </div>
                    </motion.div>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Откъде сте?</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Where are you from?</div>
                            </div>
                            <div><MapPin size={24} color="var(--accent-color)" /></div>
                        </div>
                    </motion.div>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Къде е...?</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Where is...?</div>
                            </div>
                            <div><Compass size={24} color="var(--accent-color)" /></div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>Sentences & Examples</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Asking "Is he/she...?"</div>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                            <li>Той <strong>лекар ли е</strong>? (Is he a doctor?)</li>
                            <li>Тя <strong>от Франция ли е</strong>? (Is she from France?)</li>
                            <li>Вие <strong>учители ли сте</strong>? (Are you teachers?)</li>
                        </ul>
                    </motion.div>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#EF4444' }}>Negative Answers</div>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                            <li>Не, той <strong>не е</strong> лекар. (No, he is not a doctor.)</li>
                            <li>Не, тя <strong>не е</strong> от Франция. (No, she is not from France.)</li>
                            <li>Аз <strong>не съм</strong> инженер. (I am not an engineer.)</li>
                        </ul>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>Dialogues</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ color: 'var(--accent-color)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            Dialogue 1: Formal Introduction
                        </div>
                        <div style={{ lineHeight: 1.8 }}>
                            <div>— <strong>Вие от Англия ли сте?</strong> (Are you from England?)</div>
                            <div>— <strong>Не, не съм от Англия. Аз съм от Америка.</strong> (No, I am not from England. I am from America.)</div>
                            <div>— <strong>А вие?</strong> (And you?)</div>
                            <div>— <strong>Аз съм от България.</strong> (I am from Bulgaria.)</div>
                        </div>
                    </motion.div>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ color: 'var(--accent-color)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            Dialogue 2: Professions
                        </div>
                        <div style={{ lineHeight: 1.8 }}>
                            <div>— <strong>Вие инженер ли сте?</strong> (Are you an engineer?)</div>
                            <div>— <strong>Не, не съм инженер. Аз съм архитект.</strong> (No, I am not an engineer. I am an architect.)</div>
                            <div>— <strong>А това кой е?</strong> (And who is this?)</div>
                            <div>— <strong>Това е моят колега Иван. Той е инженер.</strong> (This is my colleague Ivan. He is an engineer.)</div>
                        </div>
                    </motion.div>

                    <motion.h3 className="section-title" style={{ marginTop: '1.5rem' }} variants={itemVariants}>Professions (Професии)</motion.h3>
                    <motion.div className="card" variants={itemVariants}>
                        <div style={{ lineHeight: 2 }}>
                            <div><Stethoscope size={16} style={iconStyle} /> <strong>Лекар / Лекарка</strong> — Doctor</div>
                            <div><GraduationCap size={16} style={iconStyle} /> <strong>Учител / Учителка</strong> — Teacher</div>
                            <div><User size={16} style={iconStyle} /> <strong>Студент / Студентка</strong> — Student</div>
                            <div><HardHat size={16} style={iconStyle} /> <strong>Инженер</strong> — Engineer</div>
                            <div><Car size={16} style={iconStyle} /> <strong>Шофьор</strong> — Driver</div>
                            <div><Briefcase size={16} style={iconStyle} /> <strong>Бизнесмен / Бизнесдама</strong> — Businessman/woman</div>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.section>
    );
};

export default UnitDetail;

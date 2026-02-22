import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

const Navigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'learn', label: 'Learn' },
        { id: 'practice', label: 'Practice' },
        { id: 'flashcards', label: 'Vocabulary' }
    ];

    return (
        <nav className="nav-tabs" style={{ position: 'relative' }}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => {
                        triggerHaptic('light');
                        onTabChange(tab.id);
                    }}
                    style={{ position: 'relative', zIndex: 1, border: 'none' }}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="nav-active-indicator"
                            transition={{
                                type: "tween",
                                ease: [0.76, 0, 0.24, 1],
                                duration: 0.6
                            }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'var(--accent-bg)',
                                borderRadius: '20px',
                                border: '1px solid var(--accent-color)',
                                zIndex: -1
                            }}
                        />
                    )}
                    <span style={{
                        color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                        transition: 'color 0.4s ease'
                    }}>
                        {tab.label}
                    </span>
                </button>
            ))}
        </nav>
    );
};

export default Navigation;

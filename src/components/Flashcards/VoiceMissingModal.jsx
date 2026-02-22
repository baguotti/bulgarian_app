import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Globe, Download, Settings, ChevronRight } from 'lucide-react';

const VoiceMissingModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1000,
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '450px',
                            background: 'var(--card-bg)',
                            borderRadius: '24px',
                            padding: '24px',
                            zIndex: 1001,
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    background: 'rgba(99, 133, 139, 0.2)',
                                    padding: '8px',
                                    borderRadius: '12px',
                                    color: 'var(--accent-color)'
                                }}>
                                    <Globe size={24} />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Bulgarian Voice Needed</h3>
                            </div>
                            <button
                                onClick={onClose}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                            To hear pronunciations, you need to enable the Bulgarian voice in your device settings.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Android Section */}
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '16px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#3DDC84' }}>
                                    <Smartphone size={18} />
                                    <span style={{ fontWeight: 600 }}>Android</span>
                                </div>
                                <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Open <b>Settings</b> <Settings size={12} inline /></li>
                                    <li>Search for <b>"Text-to-speech"</b></li>
                                    <li>Select <b>Google Speech Engine</b></li>
                                    <li>Install <b>Bulgarian</b> voice data</li>
                                </ol>
                            </div>

                            {/* iOS Section */}
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '16px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#FFFFFF' }}>
                                    <Smartphone size={18} />
                                    <span style={{ fontWeight: 600 }}>iPhone / iOS</span>
                                </div>
                                <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>Settings <ChevronRight size={12} /> Accessibility</li>
                                    <li>Spoken Content <ChevronRight size={12} /> Voices</li>
                                    <li>Select <b>Bulgarian</b> and tap <Download size={12} /></li>
                                </ol>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%',
                                marginTop: '24px',
                                padding: '14px',
                                borderRadius: '12px',
                                background: 'var(--accent-color)',
                                border: 'none',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Got it!
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VoiceMissingModal;

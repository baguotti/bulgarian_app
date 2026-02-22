import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import UnitList from './components/Learn/UnitList';
import UnitDetail from './components/Learn/UnitDetail';
import PracticeSection from './components/Practice/PracticeSection';
import FlashcardGame from './components/Flashcards/FlashcardGame';

function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [practiceReset, setPracticeReset] = useState(0);

  // Sync state with history on mount and on popstate (back button)
  useEffect(() => {
    // Initial state
    const initialState = { tab: 'learn', unit: null };
    window.history.replaceState(initialState, '');

    const handlePopState = (event) => {
      if (event.state) {
        setActiveTab(event.state.tab || 'learn');
        setSelectedUnit(event.state.unit || null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) {
      if (tab === 'learn' && selectedUnit) {
        // Going back from detail to list
        setSelectedUnit(null);
        window.history.pushState({ tab: 'learn', unit: null }, '');
      }
      if (tab === 'practice') setPracticeReset(prev => prev + 1);
    } else {
      setActiveTab(tab);
      setSelectedUnit(null);
      window.history.pushState({ tab: tab, unit: null }, '');
    }
  };

  const handleSelectUnit = (unitId) => {
    setSelectedUnit(unitId);
    window.history.pushState({ tab: 'learn', unit: unitId }, '');
  };

  return (
    <>
      <Header currentTab={activeTab} />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedUnit || '') + (activeTab === 'practice' ? practiceReset : '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            {activeTab === 'learn' && (
              selectedUnit ? (
                <UnitDetail unitId={selectedUnit} onBack={() => {
                  setSelectedUnit(null);
                  window.history.pushState({ tab: 'learn', unit: null }, '');
                }} />
              ) : (
                <UnitList onSelectUnit={handleSelectUnit} />
              )
            )}

            {activeTab === 'practice' && <PracticeSection resetCounter={practiceReset} />}

            {activeTab === 'flashcards' && <FlashcardGame />}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import UnitList from './components/Learn/UnitList';
import UnitDetail from './components/Learn/UnitDetail';
import PracticeSection from './components/Practice/PracticeSection';
import FlashcardGame from './components/Flashcards/FlashcardGame';
import StatsSection from './components/Stats/StatsSection';
import GoalReminder from './components/Stats/GoalReminder';
import { useAppUsageTracker } from './hooks/useAppUsageTracker';

function App() {
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('activeTab') || 'learn');
  const [selectedUnit, setSelectedUnit] = useState(() => sessionStorage.getItem('selectedUnit') || null);
  const [practiceReset, setPracticeReset] = useState(0);
  
  // Track app usage
  const usageStats = useAppUsageTracker();

  // Sync state with history on mount and on popstate (back button)
  useEffect(() => {
    // Restore history state without overwriting the current position
    const initialState = { tab: activeTab, unit: selectedUnit };
    window.history.replaceState(initialState, '');

    const handlePopState = (event) => {
      if (event.state) {
        const tab = event.state.tab || 'learn';
        const unit = event.state.unit || null;
        setActiveTab(tab);
        setSelectedUnit(unit);
        sessionStorage.setItem('activeTab', tab);
        sessionStorage.setItem('selectedUnit', unit || '');
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
        sessionStorage.setItem('selectedUnit', '');
        window.history.pushState({ tab: 'learn', unit: null }, '');
      }
      if (tab === 'practice') setPracticeReset(prev => prev + 1);
    } else {
      setActiveTab(tab);
      setSelectedUnit(null);
      sessionStorage.setItem('activeTab', tab);
      sessionStorage.setItem('selectedUnit', '');
      window.history.pushState({ tab: tab, unit: null }, '');
    }
  };

  const handleSelectUnit = (unitId) => {
    setSelectedUnit(unitId);
    sessionStorage.setItem('selectedUnit', unitId);
    window.history.pushState({ tab: 'learn', unit: unitId }, '');
  };

  return (
    <>
      <Header currentTab={activeTab} />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main style={{ position: 'relative' }}>
        <GoalReminder usage={usageStats} />
        
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
            
            {activeTab === 'stats' && <StatsSection usage={usageStats} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;

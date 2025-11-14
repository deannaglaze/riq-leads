import { useLeadsState } from './state/useLeadsState';
import { useAppState } from './hooks/useAppState';
import { APP_STATES, TABS } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import MorningCheckpoint from './pages/MorningCheckpoint';
import Excluding from './pages/Excluding';
import PostExclusion from './pages/PostExclusion';
import ExcludedLeads from './pages/ExcludedLeads';

function App() {
  const leadsState = useLeadsState();
  const appState = useAppState();

  const handleExcludeClick = () => {
    if (leadsState.selectedLeads.size > 0) {
      appState.showExcludingState(leadsState.selectedLeads.size);
    }
  };

  const handleConfirmExclusion = () => {
    const count = leadsState.excludeSelectedLeads();
    appState.showPostExclusionState(count);
  };

  const handleContinueReviewing = () => {
    appState.showMorningState();
  };

  const handleViewExcluded = () => {
    appState.showMorningState();
    appState.switchToExcludedTab();
  };

  const handleReinclude = () => {
    leadsState.reincludeSelectedLeads();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header nextSendTime={leadsState.nextSendTime} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Tabs
          activeTab={appState.activeTab}
          onTabChange={appState.handleTabChange}
          checkpointCount={leadsState.leads.length}
          excludedCount={leadsState.excludedLeads.length}
        />

        {appState.activeTab === TABS.CHECKPOINT && (
          <>
            {appState.currentState === APP_STATES.MORNING && (
              <MorningCheckpoint
                leads={leadsState.leads}
                selectedLeads={leadsState.selectedLeads}
                onToggleLead={leadsState.toggleLead}
                onSelectAll={leadsState.selectAllLeads}
                onExcludeClick={handleExcludeClick}
              />
            )}

            {appState.currentState === APP_STATES.EXCLUDING && (
              <Excluding
                exclusionCount={appState.exclusionCount}
                onConfirm={handleConfirmExclusion}
                onCancel={appState.showMorningState}
              />
            )}

            {appState.currentState === APP_STATES.POST_EXCLUSION && (
              <PostExclusion
                exclusionCount={appState.exclusionCount}
                onContinue={handleContinueReviewing}
                onViewExcluded={handleViewExcluded}
              />
            )}
          </>
        )}

        {appState.activeTab === TABS.EXCLUDED && (
          <ExcludedLeads
            excludedLeads={leadsState.excludedLeads}
            selectedExcludedLeads={leadsState.selectedExcludedLeads}
            onToggleExcludedLead={leadsState.toggleExcludedLead}
            onSelectAllExcluded={leadsState.selectAllExcluded}
            onReinclude={handleReinclude}
          />
        )}
      </main>
    </div>
  );
}

export default App;

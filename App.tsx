
import React, { useState, useEffect } from 'react';
import { Agent, AgentType } from './types';
import { AGENTS, APP_TITLE, API_KEY_WARNING, NEOBRUTALISM_PALETTE } from './constants';
import MainLayout from './components/layout/MainLayout';
import AgentWorkspace from './components/agents/AgentWorkspace';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const App: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  useEffect(() => {
    // Basic check for API key presence.
    // In a real build process, process.env.API_KEY would be replaced.
    // For local dev, it needs to be set in the environment.
    if (!process.env.API_KEY) {
      console.warn(API_KEY_WARNING);
      setApiKeyMissing(true);
    }
  }, []);

  const handleSelectAgent = (agentId: AgentType) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
    }
  };

  return (
    <MainLayout
      header={<Header title={APP_TITLE} />}
      sidebar={<Sidebar agents={AGENTS} selectedAgentId={selectedAgent.id} onSelectAgent={handleSelectAgent} />}
    >
      {apiKeyMissing && (
        <div className={`p-4 mb-6 ${NEOBRUTALISM_PALETTE.error} ${NEOBRUTALISM_PALETTE.errorText} ${NEOBRUTALISM_PALETTE.border} border-2 ${NEOBRUTALISM_PALETTE.shadow}`}>
          <h3 className="font-bold text-lg">Configuration Error</h3>
          <p>{API_KEY_WARNING}</p>
        </div>
      )}
      <AgentWorkspace key={selectedAgent.id} agent={selectedAgent} isApiKeyMissing={apiKeyMissing} />
    </MainLayout>
  );
};

export default App;

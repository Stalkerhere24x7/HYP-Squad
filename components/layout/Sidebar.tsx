
import React from 'react';
import { Agent, AgentType } from '../../types';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface SidebarProps {
  agents: Agent[];
  selectedAgentId: AgentType;
  onSelectAgent: (agentId: AgentType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ agents, selectedAgentId, onSelectAgent }) => {
  return (
    <aside className={`w-20 md:w-64 p-2 md:p-4 ${NEOBRUTALISM_PALETTE.card} ${NEOBRUTALISM_PALETTE.border} border-r-2 flex flex-col space-y-2 md:space-y-3 transition-all duration-300 ease-in-out`}>
      <h2 className="hidden md:block text-lg font-semibold mb-2 md:mb-4 ${NEOBRUTALISM_PALETTE.text}">Agents</h2>
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent.id)}
          className={`
            w-full p-2 md:p-3 
            ${NEOBRUTALISM_PALETTE.border} border-2 
            ${NEOBRUTALISM_PALETTE.text} font-semibold
            flex items-center md:space-x-3 
            transition-all duration-150 ease-in-out
            ${NEOBRUTALISM_PALETTE.shadow}
            ${selectedAgentId === agent.id 
              ? `${NEOBRUTALISM_PALETTE.accent1} ${NEOBRUTALISM_PALETTE.shadow}` 
              : `${NEOBRUTALISM_PALETTE.card} ${NEOBRUTALISM_PALETTE.accent1Hover} ${NEOBRUTALISM_PALETTE.shadowHover}`}
            ${NEOBRUTALISM_PALETTE.shadowActive}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
            justify-center md:justify-start group
          `}
          title={agent.name}
        >
          <span className="transform transition-transform duration-150 group-hover:scale-110">
            {React.cloneElement(agent.icon, { className: "w-6 h-6 md:w-5 md:h-5" })}
          </span>
          <span className="hidden md:inline ml-2 md:ml-3">{agent.name}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;

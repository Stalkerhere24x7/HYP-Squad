import React from 'react';

export enum AgentType {
  CONTENT_ARTISAN = 'Content Artisan',
  MEDIA_MAESTRO = 'Media Maestro',
  CAMPAIGN_COMMANDER = 'Campaign Commander',
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>; // Updated type
  coreInstruction: string; // Base instruction for Gemini for this agent
  humanTouchPrompt: string; // Specific prompt part for "human-like" output
  fields: FormField[];
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
}
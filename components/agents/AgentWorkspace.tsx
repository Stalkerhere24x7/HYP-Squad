
import React, { useState, useEffect, useCallback } from 'react';
import { Agent, FormField, GroundingChunk } from '../../types';
import { callGeminiApi } from '../../services/geminiService';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Select from '../common/Select';
import Card from '../common/Card';
import Loader from '../common/Loader';
import AnimatedText from '../common/AnimatedText';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface AgentWorkspaceProps {
  agent: Agent;
  isApiKeyMissing: boolean;
}

const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agent, isApiKeyMissing }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>('');
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);


  useEffect(() => {
    const initialData: Record<string, string> = {};
    agent.fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    setFormData(initialData);
    setOutput('');
    setError(null);
    setIsLoading(false);
    setShowDisclaimer(true);
    setGroundingChunks(undefined);
    setEnableSearch(false); // Reset search grounding option per agent
  }, [agent]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableSearch(e.target.checked);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isApiKeyMissing) {
      setError("Cannot process request: API Key is missing.");
      return;
    }

    // Basic validation
    for (const field of agent.fields) {
        if (field.required && !formData[field.name]) {
            setError(`Please fill in the required field: ${field.label}`);
            return;
        }
    }

    setIsLoading(true);
    setError(null);
    setOutput('');
    setGroundingChunks(undefined);
    setShowDisclaimer(false);

    try {
      const response = await callGeminiApi({ agent, formData, enableSearchGrounding: enableSearch });
      setOutput(response.text);
      if (response.groundingChunks && response.groundingChunks.length > 0) {
        setGroundingChunks(response.groundingChunks);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-3 mb-4 p-4 border-b-2 border-black">
           {React.cloneElement(agent.icon, { className: "w-8 h-8 text-black" })}
          <div>
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-sm text-gray-600">{agent.description}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {agent.fields.map((field: FormField) => {
            const commonProps = {
              key: field.name,
              name: field.name,
              label: field.label,
              value: formData[field.name] || '',
              onChange: handleChange,
              placeholder: field.placeholder,
              required: field.required
            };
            if (field.type === 'textarea') {
              return <TextArea {...commonProps} rows={4} />;
            }
            if (field.type === 'select' && field.options) {
              return <Select {...commonProps} options={field.options} />;
            }
            return <Input {...commonProps} type={field.type} />;
          })}

          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="enableSearchGrounding"
              name="enableSearchGrounding"
              checked={enableSearch}
              onChange={handleCheckboxChange}
              className={`w-5 h-5 accent-lime-500 ${NEOBRUTALISM_PALETTE.border} border-2 focus:ring-lime-500 focus:ring-offset-0 rounded`}
            />
            <label htmlFor="enableSearchGrounding" className="font-medium text-sm">
              Enable Google Search Grounding (for recent info/news)
            </label>
          </div>
          
          <div className="pt-2">
            <Button type="submit" disabled={isLoading || isApiKeyMissing} variant="primary">
              {isLoading ? 'Generating...' : `Engage ${agent.name}`}
            </Button>
          </div>
        </form>
      </Card>

      {isLoading && <Loader message={`HYP Squad's ${agent.name} is thinking...`} />}
      
      {error && (
        <Card>
          <div className={`p-4 ${NEOBRUTALISM_PALETTE.error} ${NEOBRUTALISM_PALETTE.errorText}`}>
            <h3 className="font-bold text-lg">Error</h3>
            <p>{error}</p>
          </div>
        </Card>
      )}

      {output && !isLoading && (
        <Card>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-black pb-2">Response from {agent.name}:</h3>
            <AnimatedText text={output} speed={15} className="text-base leading-relaxed" />
             {groundingChunks && groundingChunks.length > 0 && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-400">
                <h4 className="text-md font-semibold mb-2 text-gray-700">Sources from Google Search:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {groundingChunks.map((chunk, index) => {
                    const source = chunk.web || chunk.retrievedContext;
                    if (source?.uri) {
                      return (
                        <li key={index} className="text-sm">
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${NEOBRUTALISM_PALETTE.accent3Hover} underline`}
                          >
                            {source.title || source.uri}
                          </a>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {showDisclaimer && !isLoading && !output && !error && (
         <Card>
            <div className={`p-4 ${NEOBRUTALISM_PALETTE.accent3} border-2 ${NEOBRUTALISM_PALETTE.border}`}>
                <h3 className="font-bold text-lg mb-2">Pro Tip for Human-Like Content:</h3>
                <p className="text-sm">To help {agent.name} generate content that feels truly human-written, be specific in your requests! Provide context, mention your desired brand voice, or add unique details in the 'Specific Instructions' field. The more tailored your input, the more original the output.</p>
            </div>
        </Card>
      )}
    </div>
  );
};

export default AgentWorkspace;

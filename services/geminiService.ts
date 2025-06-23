
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { Agent, FormField, GroundingChunk } from '../types';

interface GenerateContentParams {
  agent: Agent;
  formData: Record<string, string>;
  enableSearchGrounding?: boolean;
}

interface GeminiServiceResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}


const constructPrompt = (agent: Agent, formData: Record<string, string>): string => {
  let prompt = `${agent.coreInstruction}\n${agent.humanTouchPrompt}\n\n## Task Details:\n`;
  
  agent.fields.forEach((field: FormField) => {
    const value = formData[field.name];
    if (value) {
      // For select fields, find the label corresponding to the value for better prompt readability
      let displayValue = value;
      if (field.type === 'select' && field.options) {
        const selectedOption = field.options.find(opt => opt.value === value);
        if (selectedOption) {
          displayValue = selectedOption.label;
        }
      }
      prompt += `- ${field.label}: ${displayValue}\n`;
    } else if (field.required) {
      // This case should ideally be prevented by form validation
      prompt += `- ${field.label}: (Not provided, but required)\n`;
    }
  });

  prompt += "\n## Expected Output:\n";
  if (agent.id === 'Content Artisan') {
    prompt += "Provide the generated content directly. Ensure it meets all specified criteria for tone, style, length, and human-like quality.\n";
  } else if (agent.id === 'Media Maestro') {
    prompt += "Generate a comprehensive media plan including suggested channels, content formats, and strategic advice. Structure it clearly.\n";
  } else if (agent.id === 'Campaign Commander') {
    prompt += "Produce a creative campaign concept with slogan ideas, key messages, and content pillars. Be imaginative and impactful.\n";
  }
  
  prompt += "\nIMPORTANT: Strictly adhere to the instruction to make the content sound human-written and avoid AI detection markers. Focus on creativity, natural language flow, and originality.";
  return prompt;
};

export const callGeminiApi = async (
  params: GenerateContentParams
): Promise<GeminiServiceResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = ai.models;

  const promptText = constructPrompt(params.agent, params.formData);
  const contents: Part[] = [{ text: promptText }];

  try {
    const generationConfig: Record<string, any> = {
        temperature: 0.7, // Balances creativity and coherence.
        topP: 0.95,
        topK: 64,
        // responseMimeType: "text/plain", // Default, not JSON unless specifically requested & supported by agent
    };

    if (params.enableSearchGrounding) {
        generationConfig.tools = [{googleSearch: {}}];
        // Cannot use application/json with googleSearch
    }
    
    // Disable thinking for potentially faster, more direct responses if needed by specific agents.
    // For now, let's keep it enabled for higher quality by default.
    // if (params.agent.id === SomeAgentThatNeedsSpeed) {
    //   generationConfig.thinkingConfig = { thinkingBudget: 0 };
    // }

    const response: GenerateContentResponse = await model.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', // Use specified model
      contents: { parts: contents },
      config: generationConfig,
    });
    
    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks as GroundingChunk[] || undefined;

    return { text, groundingChunks };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // More specific error handling can be added here (e.g., for auth errors, rate limits)
        if (error.message.includes("API key not valid")) {
             throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
        }
    }
    throw new Error("Failed to get response from AI. Please try again.");
  }
};

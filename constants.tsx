
import React from 'react';
import { Agent, AgentType, FormField } from './types';

// SVG Icons
const EditPencilIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const MegaphoneIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 9.75L7.75 12l2.5 2.25M13.75 9.75L16.25 12l-2.5 2.25M3.75 9.75h16.5M3.75 14.25h16.5M5.25 6H18.75a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5z" />
  </svg>
);

const PresentationChartIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 20.25h16.5M16.5 3.75h.008v.008H16.5V3.75zm-3.75 0h.008v.008H12.75V3.75zm-3.75 0h.008v.008H9V3.75zm-3.75 0h.008v.008H5.25V3.75z" />
  </svg>
);


const HUMAN_TOUCH_PROMPT_GENERAL = "Craft the response to sound exceptionally human-like. Employ varied sentence structures, use contractions and natural colloquialisms where appropriate (but maintain professionalism if the tone requires it). Avoid repetitive phrasing, overly academic language, or patterns commonly associated with AI generation. Infuse a subtle, engaging personality into the text. The goal is for the output to be indistinguishable from content written by a creative and skilled human professional.";

export const AGENTS: Agent[] = [
  {
    id: AgentType.CONTENT_ARTISAN,
    name: 'Content Artisan',
    description: 'Generates high-quality, human-like written content.',
    icon: <EditPencilIcon />,
    coreInstruction: "You are the Content Artisan, an expert AI specializing in creating original and engaging written content. Your goal is to produce text that is indistinguishable from that written by a skilled human. ",
    humanTouchPrompt: HUMAN_TOUCH_PROMPT_GENERAL,
    fields: [
      { name: 'topic', label: 'Topic/Subject', type: 'text', placeholder: 'e.g., The Future of Renewable Energy', required: true },
      { name: 'contentType', label: 'Content Type', type: 'select', options: [
        {value: 'blog_post', label: 'Blog Post'}, {value: 'social_media_update', label: 'Social Media Update'}, {value: 'email_draft', label: 'Email Draft'}, {value: 'video_script_outline', label: 'Video Script Outline'}, {value: 'product_description', label: 'Product Description'}
      ], defaultValue: 'blog_post', required: true },
      { name: 'tone', label: 'Desired Tone', type: 'select', options: [
        {value: 'professional', label: 'Professional'}, {value: 'casual', label: 'Casual'}, {value: 'witty', label: 'Witty'}, {value: 'persuasive', label: 'Persuasive'}, {value: 'informative', label: 'Informative'}, {value: 'empathetic', label: 'Empathetic'}
      ], defaultValue: 'informative', required: true },
      { name: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Tech enthusiasts, Small business owners', required: false },
      { name: 'keywords', label: 'Keywords (comma-separated)', type: 'text', placeholder: 'e.g., solar, wind, innovation', required: false },
      { name: 'length', label: 'Approximate Length', type: 'select', options: [
        {value: 'short', label: 'Short (e.g., <200 words / 1-2 paragraphs)'}, {value: 'medium', label: 'Medium (e.g., 200-500 words / 3-5 paragraphs)'}, {value: 'long', label: 'Long (e.g., >500 words / 5+ paragraphs)'}
      ], defaultValue: 'medium', required: true},
      { name: 'specificInstructions', label: 'Specific Instructions / Humanizing Details', type: 'textarea', placeholder: 'e.g., Include a surprising statistic. Start with a question. Mention our brand values of sustainability and community.', required: false },
    ],
  },
  {
    id: AgentType.MEDIA_MAESTRO,
    name: 'Media Maestro',
    description: 'Develops strategic media plans and content distribution ideas.',
    icon: <PresentationChartIcon />,
    coreInstruction: "You are the Media Maestro, an AI expert in media planning and content strategy. Your task is to devise innovative and effective media plans. ",
    humanTouchPrompt: HUMAN_TOUCH_PROMPT_GENERAL + " Ensure the media plan recommendations are practical, creative, and sound like they come from an experienced human strategist, considering audience nuances.",
    fields: [
      { name: 'campaignGoal', label: 'Campaign Goal', type: 'text', placeholder: 'e.g., Increase brand awareness, Drive website traffic', required: true },
      { name: 'targetAudienceProfile', label: 'Detailed Target Audience Profile', type: 'textarea', placeholder: 'Describe demographics, interests, online behavior, pain points.', required: true },
      { name: 'productService', label: 'Product/Service Being Promoted', type: 'text', placeholder: 'e.g., Eco-friendly coffee beans, SaaS for project management', required: true },
      { name: 'coreMessage', label: 'Core Message', type: 'textarea', placeholder: 'What is the main takeaway for the audience?', required: true },
      { name: 'budgetConsideration', label: 'Budget Consideration', type: 'select', options: [
        {value: 'low', label: 'Low (focus on organic/low-cost)'}, {value: 'medium', label: 'Medium (mix of organic and paid)'}, {value: 'high', label: 'High (significant paid media possible)'}
      ], defaultValue: 'medium', required: true},
      { name: 'duration', label: 'Campaign Duration', type: 'text', placeholder: 'e.g., 1 month, 3 months, Ongoing', required: false },
    ],
  },
  {
    id: AgentType.CAMPAIGN_COMMANDER,
    name: 'Campaign Commander',
    description: 'Generates creative campaign concepts and messaging.',
    icon: <MegaphoneIcon />,
    coreInstruction: "You are the Campaign Commander, an AI visionary for marketing campaigns. You generate compelling campaign ideas, slogans, and messaging strategies. ",
    humanTouchPrompt: HUMAN_TOUCH_PROMPT_GENERAL + " The campaign concepts should be fresh, memorable, and resonate on an emotional level, as if conceived by a top-tier human creative director.",
    fields: [
      { name: 'productName', label: 'Product/Service Name', type: 'text', placeholder: 'e.g., Nova Smartwatch, GreenLeaf Organics', required: true },
      { name: 'uniqueSellingProposition', label: 'Unique Selling Proposition (USP)', type: 'textarea', placeholder: 'What makes it stand out? Key benefits?', required: true },
      { name: 'campaignObjective', label: 'Primary Campaign Objective', type: 'select', options: [
        {value: 'brand_awareness', label: 'Build Brand Awareness'}, {value: 'lead_generation', label: 'Generate Leads'}, {value: 'drive_sales', label: 'Drive Sales'}, {value: 'product_launch', label: 'Launch New Product'}, {value: 'community_engagement', label: 'Increase Community Engagement'}
      ], defaultValue: 'brand_awareness', required: true },
      { name: 'targetMarketDescription', label: 'Target Market Description', type: 'textarea', placeholder: 'Who are you trying to reach? Their values, aspirations?', required: true },
      { name: 'brandPersonality', label: 'Brand Personality/Voice', type: 'text', placeholder: 'e.g., Playful, Authoritative, Eco-conscious, Luxurious', required: false },
      { name: 'desiredEmotion', label: 'Desired Emotional Response from Audience', type: 'text', placeholder: 'e.g., Excitement, Trust, Curiosity, Joy', required: false },
    ],
  },
];

export const APP_TITLE = "HYP Squad";
export const API_KEY_WARNING = "Gemini API Key not detected. Please ensure the process.env.API_KEY environment variable is set for the application to function.";

export const NEOBRUTALISM_PALETTE = {
  background: 'bg-slate-100', // Off-white/light gray
  text: 'text-black',
  border: 'border-black',
  shadow: 'shadow-[4px_4px_0_#000]',
  shadowHover: 'hover:shadow-[6px_6px_0_#000]',
  shadowActive: 'active:shadow-[2px_2px_0_#000]',
  accent1: 'bg-yellow-400', // Primary action
  accent1Hover: 'hover:bg-yellow-500',
  accent2: 'bg-lime-400', // Secondary, navigation
  accent2Hover: 'hover:bg-lime-500',
  accent3: 'bg-sky-400', // Highlights, info
  accent3Hover: 'hover:bg-sky-500',
  card: 'bg-white',
  error: 'bg-red-500',
  errorText: 'text-white',
  success: 'bg-green-500',
  successText: 'text-white',
};

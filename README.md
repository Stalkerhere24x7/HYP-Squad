# HYP Squad - AI-Powered Content & Campaign Collaboration

HYP Squad is a cutting-edge web application designed to streamline and supercharge content creation, media planning, and campaign generation through a collaboration of specialized AI agents. Built with a modern tech stack and a unique neobrutalist design, it aims to make AI assistance intuitive, powerful, and produce human-quality outputs.

## Core Concept: Inspired by Agent Development Kit by Google

The architectural philosophy behind HYP Squad is inspired by the concept of an **Agent Development Kit by Google**. This approach envisions a modular system where distinct AI agents, each with specialized skills and knowledge, collaborate to achieve complex tasks. In HYP Squad, these agents are:

1.  **Content Artisan:** Generates high-quality, engaging, and human-like written content for various needs (blogs, social media, emails, etc.).
2.  **Media Maestro:** Develops strategic media plans, suggesting optimal channels and content distribution strategies.
3.  **Campaign Commander:** Brainstorms creative campaign concepts, slogans, and messaging to captivate audiences.

Each agent is trained with specific instructions and a "human touch" prompt to ensure outputs are nuanced, creative, and avoid common AI detection markers.

## Key Features

*   **Specialized AI Agents:** Dedicated agents for distinct creative and strategic tasks.
*   **Human-Like Output:** Advanced prompting techniques to generate content that is indistinguishable from human-written material.
*   **Neobrutalist UI/UX:** A bold, functional, and visually striking user interface.
*   **Dynamic Form Generation:** Input fields tailored to the selected agent's requirements.
*   **Google Search Grounding:** Option to ground AI responses with real-time information from Google Search for up-to-date content.
*   **Animated Text Responses:** Engaging type-writer effect for AI-generated content.
*   **Responsive Design:** Accessible on various devices.
*   **Clear API Error Handling:** Informative messages for users.

## Technologies Used

*   **Frontend:**
    *   React 18 (using esm.sh for module loading)
    *   TypeScript
    *   Tailwind CSS (for styling and neobrutalist design)
*   **AI Integration:**
    *   Google Gemini API (via `@google/genai` library)
    *   Model: `gemini-2.5-flash-preview-04-17`

## Setup and Running

The application is designed to run directly in a browser that supports ES Modules, fetching dependencies like React and `@google/genai` via `esm.sh`.

### Prerequisites

*   A modern web browser.
*   A valid Google Gemini API Key.

### Environment Variables

**Crucial:** The application requires a Google Gemini API key to function. This key **must** be available as an environment variable named `API_KEY` in the execution environment where the JavaScript code runs.

*   **For local development with a simple HTTP server:** You would typically need to ensure that the server process (or the context serving `index.html`) has `process.env.API_KEY` set. This can be complex for client-side-only setups without a build step.
*   **In a Node.js environment or when using a bundler:** You would set this environment variable in your system or `.env` file, and your build tool (e.g., Vite, Webpack) would make it available.
*   **For this specific project structure (direct browser ESM):** The `process.env.API_KEY` will likely be `undefined` unless a surrounding execution environment (like a specialized development server or a platform like Glitch/Codepen that allows setting server-side environment variables) injects it. If you are running `index.html` directly from your filesystem or a basic static server, the API calls will fail due to a missing API key. You might need to temporarily hardcode it for testing (NOT recommended for production) or use a local proxy server that injects the key.

**The application will display a warning if the API key is not detected.**

### Running the App

1.  Ensure all project files (`index.html`, `index.tsx`, `App.tsx`, etc.) are in the same directory structure.
2.  Serve `index.html` using a local HTTP server. A simple way is to use `npx serve .` in the project's root directory.
3.  Open the provided URL (e.g., `http://localhost:3000`) in your browser.

## Folder Structure

```
/
├── README.md                 # This file
├── metadata.json             # Application metadata
├── index.html                # Main HTML entry point
├── index.tsx                 # React application root
├── App.tsx                   # Main application component
├── types.ts                  # TypeScript type definitions
├── constants.tsx             # Application-wide constants (agents, palette)
├── services/
│   └── geminiService.ts      # Logic for interacting with the Gemini API
├── components/
│   ├── layout/               # Layout components (Header, Sidebar, MainLayout)
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   ├── agents/               # Components related to AI agents
│   │   └── AgentWorkspace.tsx
│   └── common/               # Reusable UI components (Button, Card, Input, etc.)
│       ├── AnimatedText.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Loader.tsx
│       ├── Select.tsx
│       └── TextArea.tsx
└── (other assets or config files)
```

## Contributing

This project serves as a demonstration of integrating Google Gemini API into a React application with a focus on UX/UI design and specific AI agent functionalities. Further contributions and enhancements are welcome.

---

Built with a passion for AI and great user experiences.

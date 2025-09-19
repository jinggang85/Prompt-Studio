/**
 * @file Prompt types and enums.
 * @description Define types for prompt builder and step form state.
 */

export type ScenarioKey = 'writing' | 'art' | 'code' | 'analysis' | 'chatbot' | 'custom';

/**
 * @description Full prompt builder state across steps.
 */
export interface PromptState {
  step: number;
  scenario: ScenarioKey | '';
  customScenario: string;
  details: {
    role: string;
    goal: string;
    audience: string;
    tone: string;
    constraints: string;
    keywords: string;
    length: string;
    format: string;
    language: string;
    examples: string;
  };
  tools: {
    model: string;
    temperature: number;
    maxTokens: number;
    jsonMode: boolean;
    systemPrompt: string;
  };
}

/**
 * @description Validation result per step.
 */
export interface ValidationResult {
  valid: boolean;
  warnings: string[];
}

/**
 * @description Action types for reducer.
 */
export type PromptAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_SCENARIO'; payload: ScenarioKey | '' }
  | { type: 'SET_CUSTOM_SCENARIO'; payload: string }
  | { type: 'SET_DETAILS'; payload: Partial<PromptState['details']> }
  | { type: 'SET_TOOLS'; payload: Partial<PromptState['tools']> }
  | { type: 'RESET' };

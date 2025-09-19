/**
 * @file Prompt utilities.
 * @description Build prompt string and perform per-step validation.
 */

import type { PromptState, ValidationResult } from '../types/prompt';

/**
 * @description Create a human-friendly scenario label from state.
 */
export function scenarioLabel(state: PromptState): string {
  if (state.scenario === 'custom') return state.customScenario || 'Custom';
  const map: Record<string, string> = {
    writing: 'Writing',
    art: 'Image Generation',
    code: 'Coding',
    analysis: 'Analysis',
    chatbot: 'Chatbot',
  };
  return map[state.scenario] ?? '';
}

/**
 * @description Validate current step and return warnings.
 */
export function validateStep(state: PromptState): ValidationResult {
  const warnings: string[] = [];
  if (state.step === 0) {
    if (!state.scenario) warnings.push('请选择一个应用场景。');
    if (state.scenario === 'custom' && !state.customScenario.trim()) {
      warnings.push('请输入自定义场景名称。');
    }
  }
  if (state.step === 1) {
    if (!state.details.goal.trim()) warnings.push('请填写清晰的目标（要做什么）。');
    if (!state.details.tone.trim()) warnings.push('建议选择或填写风格/语气。');
    if (!state.details.language.trim()) warnings.push('请选择输出语言。');
  }
  if (state.step === 2) {
    if (!state.tools.model.trim()) warnings.push('请选择或填写模型标识。');
    if (state.tools.temperature < 0 || state.tools.temperature > 1) {
      warnings.push('温度需在 0~1 之间。');
    }
    if (state.tools.maxTokens < 16) {
      warnings.push('最大 Token 过小，建议至少 256。');
    }
  }
  return { valid: warnings.length === 0, warnings };
}

/**
 * @description Build final prompt string from state.
 */
export function buildPrompt(state: PromptState): string {
  const lines: string[] = [];

  const scenario = scenarioLabel(state);
  if (scenario) lines.push(`# Scenario\n${scenario}`);

  if (state.details.role) lines.push(`\n# Role\n${state.details.role}`);

  lines.push(`\n# Goal\n${state.details.goal}`);

  const meta: string[] = [];
  if (state.details.audience) meta.push(`Audience: ${state.details.audience}`);
  if (state.details.tone) meta.push(`Tone: ${state.details.tone}`);
  if (state.details.length) meta.push(`Length: ${state.details.length}`);
  if (state.details.format) meta.push(`Format: ${state.details.format}`);
  if (state.details.language) meta.push(`Language: ${state.details.language}`);
  if (meta.length) lines.push(`\n# Preferences\n${meta.join('\n')}`);

  if (state.details.keywords) {
    lines.push(`\n# Keywords\n${state.details.keywords}`);
  }

  if (state.details.constraints) {
    lines.push(`\n# Constraints\n${state.details.constraints}`);
  }

  if (state.details.examples) {
    lines.push(`\n# Examples\n${state.details.examples}`);
  }

  // Tool/Model hints
  const toolMeta: string[] = [];
  if (state.tools.model) toolMeta.push(`Model: ${state.tools.model}`);
  toolMeta.push(`Temperature: ${state.tools.temperature}`);
  toolMeta.push(`MaxTokens: ${state.tools.maxTokens}`);
  toolMeta.push(`JSONMode: ${state.tools.jsonMode ? 'true' : 'false'}`);
  if (toolMeta.length) lines.push(`\n# Tooling\n${toolMeta.join('\n')}`);

  if (state.tools.systemPrompt) {
    lines.push(`\n# System\n${state.tools.systemPrompt}`);
  }

  // Final instruction
  lines.push(
    `\n# Instruction\nRespond strictly following the above sections. If any information is missing, ask for clarification before proceeding.`
  );

  return lines.join('\n');
}

/**
 * @description Generate a compact one-liner hint for preview cards.
 */
export function shortHint(state: PromptState): string {
  const s = scenarioLabel(state);
  const goal = state.details.goal ? state.details.goal.slice(0, 40) : '';
  return [s, goal].filter(Boolean).join(' · ');
}

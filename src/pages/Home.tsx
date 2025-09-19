/**
 * @file Home page.
 * @description Landing banner + multi-step prompt builder + result panel.
 */

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import StepIndicator from '../components/stepper/StepIndicator';
import StepControls from '../components/stepper/StepControls';
import ScenarioStep from '../components/steps/ScenarioStep';
import DetailsStep from '../components/steps/DetailsStep';
import ToolsStep from '../components/steps/ToolsStep';
import ReviewStep from '../components/steps/ReviewStep';
import ResultPanel from '../components/ResultPanel';

import type { PromptAction, PromptState, ScenarioKey } from '../types/prompt';
import { buildPrompt, shortHint, validateStep } from '../utils/prompt';

const steps = ['场景选择', '细节补充', '工具参数', '检视校验'];

const initialState: PromptState = {
  step: 0,
  scenario: '',
  customScenario: '',
  details: {
    role: '',
    goal: '',
    audience: '',
    tone: '',
    constraints: '',
    keywords: '',
    length: '',
    format: '',
    language: '中文',
    examples: '',
  },
  tools: {
    model: '',
    temperature: 0.3,
    maxTokens: 1024,
    jsonMode: false,
    systemPrompt: '',
  },
};

/**
 * @description Reducer to update prompt builder state.
 */
function reducer(state: PromptState, action: PromptAction): PromptState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_SCENARIO':
      return { ...state, scenario: action.payload };
    case 'SET_CUSTOM_SCENARIO':
      return { ...state, scenario: 'custom', customScenario: action.payload };
    case 'SET_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'SET_TOOLS':
      return { ...state, tools: { ...state.tools, ...action.payload } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/**
 * @description A small preview card shown at the right side for wider screens.
 */
function LivePreview({ state }: { state: PromptState }) {
  const hint = shortHint(state);
  const preview = buildPrompt(state).slice(0, 480);
  return (
    <aside className="sticky top-20 rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-900">实时预览</div>
      <div className="text-xs text-slate-600">{hint || '等待填写…'}</div>
      <pre className="mt-3 max-h-72 overflow-auto rounded-md bg-slate-50 p-3 text-[11px] leading-5 text-slate-800">
{preview}
{preview.length >= 480 ? '...' : ''}
      </pre>
    </aside>
  );
}

/**
 * @description Step container with title and content.
 */
function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 text-base font-semibold text-slate-900">{title}</div>
      {children}
    </div>
  );
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [showResult, setShowResult] = React.useState(false);

  const validation = validateStep(state);
  const onNext = () => {
    if (!validation.valid) return;
    dispatch({ type: 'SET_STEP', payload: Math.min(state.step + 1, steps.length - 1) });
  };
  const onBack = () => {
    dispatch({ type: 'SET_STEP', payload: Math.max(state.step - 1, 0) });
  };
  const onFinish = () => {
    setShowResult(true);
  };

  // For a11y: scroll to builder on step changes
  React.useEffect(() => {
    const el = document.getElementById('builder');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.step]);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
        <Header />
        <ResultPanel
          prompt={buildPrompt(state)}
          onBack={() => setShowResult(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <Header />
      <Hero />
      <main id="builder" className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4">
          <StepIndicator
            steps={steps}
            current={state.step}
            onJump={(i) => dispatch({ type: 'SET_STEP', payload: i })}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            {state.step === 0 && (
              <StepCard title="场景选择">
                <ScenarioStep
                  scenario={state.scenario as ScenarioKey | ''}
                  customScenario={state.customScenario}
                  onScenarioChange={(v) => dispatch({ type: 'SET_SCENARIO', payload: v })}
                  onCustomChange={(v) => dispatch({ type: 'SET_CUSTOM_SCENARIO', payload: v })}
                />
                {validation.warnings.length > 0 && (
                  <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    {validation.warnings.join('；')}
                  </div>
                )}
                <div className="mt-4">
                  <StepControls
                    canBack={false}
                    canNext={validation.valid}
                    onBack={onBack}
                    onNext={onNext}
                  />
                </div>
              </StepCard>
            )}

            {state.step === 1 && (
              <StepCard title="细节补充">
                <DetailsStep
                  value={state.details}
                  onChange={(v) => dispatch({ type: 'SET_DETAILS', payload: v })}
                />
                {validation.warnings.length > 0 && (
                  <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    {validation.warnings.join('；')}
                  </div>
                )}
                <div className="mt-4">
                  <StepControls
                    canBack
                    canNext={validation.valid}
                    onBack={onBack}
                    onNext={onNext}
                  />
                </div>
              </StepCard>
            )}

            {state.step === 2 && (
              <StepCard title="工具调用提示词">
                <ToolsStep
                  value={state.tools}
                  onChange={(v) => dispatch({ type: 'SET_TOOLS', payload: v })}
                />
                {validation.warnings.length > 0 && (
                  <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    {validation.warnings.join('；')}
                  </div>
                )}
                <div className="mt-4">
                  <StepControls
                    canBack
                    canNext={validation.valid}
                    onBack={onBack}
                    onNext={onNext}
                  />
                </div>
              </StepCard>
            )}

            {state.step === 3 && (
              <StepCard title="检视与校验">
                <ReviewStep
                  warnings={validation.warnings}
                  preview={buildPrompt(state).slice(0, 800)}
                />
                <div className="mt-4">
                  <StepControls
                    canBack
                    canNext
                    onBack={onBack}
                    onNext={() => {}}
                    onFinish={onFinish}
                    isLast
                  />
                </div>
              </StepCard>
            )}
          </section>

          <div className="hidden md:block">
            <LivePreview state={state} />
          </div>
        </div>
      </main>



      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Prompt Studio · 构建严谨可复用的提示词
        </div>
      </footer>
    </div>
  );
}

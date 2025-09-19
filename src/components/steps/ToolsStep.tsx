/**
 * @file ToolsStep.
 * @description Step 3: Model/tools hints and API-like parameters.
 */

import React from 'react';
import InlineTip from '../common/InlineTip';
import RefHint, { RefItem } from '../common/RefHint';

interface ToolsStepProps {
  value: {
    model: string;
    temperature: number;
    maxTokens: number;
    jsonMode: boolean;
    systemPrompt: string;
  };
  onChange: (v: Partial<ToolsStepProps['value']>) => void;
}

export default function ToolsStep({ value, onChange }: ToolsStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-800">模型（必填）</label>
          <input
            value={value.model}
            onChange={(e) => onChange({ model: e.target.value })}
            placeholder="例如：gpt-4o, gpt-4.1, claude-3.5-sonnet"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">温度</label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={value.temperature}
            onChange={(e) => onChange({ temperature: Number(e.target.value) })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">最大 Token</label>
          <input
            type="number"
            min={16}
            step={16}
            value={value.maxTokens}
            onChange={(e) => onChange({ maxTokens: Number(e.target.value) })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex items-center gap-2">
          <input
            id="jsonMode"
            type="checkbox"
            checked={value.jsonMode}
            onChange={(e) => onChange({ jsonMode: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <label htmlFor="jsonMode" className="text-sm text-slate-800">
            JSON 模式（要求结构化 JSON 输出）
          </label>
        </div>
        <div />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">系统提示词（可选）</label>
        <textarea
          value={value.systemPrompt}
          onChange={(e) => onChange({ systemPrompt: e.target.value })}
          rows={3}
          placeholder="为系统层提供约束和原则，例如：始终遵守法律法规与道德规范；输出前先进行简要思考。"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />

        <InlineTip>
          模型选择与参数设定会影响创意与稳定性：温度偏低更稳健，偏高更有创意；JSON 模式适合后续自动化解析。
        </InlineTip>
      </div>
    </div>
  );
}

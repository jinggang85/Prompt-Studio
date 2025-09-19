/**
 * @file DetailsStep.
 * @description Step 2: Fill target, content, style and related details.
 */

import React from 'react';
import InlineTip from '../common/InlineTip';
import RefHint, { RefItem } from '../common/RefHint';

interface DetailsStepProps {
  value: {
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
  onChange: (v: Partial<DetailsStepProps['value']>) => void;
}

export default function DetailsStep({ value, onChange }: DetailsStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-800">目标（必填）</label>
          <textarea
            value={value.goal}
            onChange={(e) => onChange({ goal: e.target.value })}
            rows={3}
            placeholder="清晰描述你希望 AI 完成的任务与输出（例如：为 B2B 产品撰写登陆页主视觉文案，强调可靠与高效）"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">角色</label>
          <input
            value={value.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="例如：你是一名资深增长文案/资深前端工程师/数据分析师"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <InlineTip>为模型设定合适的人设，有助于得到更贴合角色的产出。</InlineTip>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-800">风格/语气（建议）</label>
          <input
            value={value.tone}
            onChange={(e) => onChange({ tone: e.target.value })}
            placeholder="专业、友好、简洁、具象、活泼…"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">目标读者</label>
          <input
            value={value.audience}
            onChange={(e) => onChange({ audience: e.target.value })}
            placeholder="例如：产品经理、CTO、早期用户…"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">语言（必填）</label>
          <select
            value={value.language}
            onChange={(e) => onChange({ language: e.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            <option value="">选择语言…</option>
            <option value="中文">中文</option>
            <option value="English">English</option>

          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-800">关键词</label>
          <input
            value={value.keywords}
            onChange={(e) => onChange({ keywords: e.target.value })}
            placeholder="用逗号分隔，例如：稳定、可靠、自动化"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">篇幅/长度</label>
          <input
            value={value.length}
            onChange={(e) => onChange({ length: e.target.value })}
            placeholder="例如：100-150 字、一段话、要点列举"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-800">输出格式</label>
          <input
            value={value.format}
            onChange={(e) => onChange({ format: e.target.value })}
            placeholder="例如：Markdown、JSON Schema、要点列表"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800">限制/边界</label>
          <input
            value={value.constraints}
            onChange={(e) => onChange({ constraints: e.target.value })}
            placeholder="例如：避免使用术语、不能出现绝对化表述…"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">示例/参考</label>
        <textarea
          value={value.examples}
          onChange={(e) => onChange({ examples: e.target.value })}
          rows={3}
          placeholder="提供 1-2 个理想示例或参考资料链接，以便模型对齐输出风格。"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
        <InlineTip>
          示例越具体越好。若无现成示例，可先让模型产出多个版本再挑选对齐。
        </InlineTip>
      </div>
    </div>
  );
}

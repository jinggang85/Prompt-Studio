/**
 * @file ResultPanel.
 * @description Structured prompt result display with copy.
 */

import React from 'react';
import CopyButton from './common/CopyButton';

interface ResultPanelProps {
  prompt: string;
  onBack: () => void;
}

export default function ResultPanel({ prompt, onBack }: ResultPanelProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
          <h3 className="text-base font-semibold text-slate-900">生成的完整提示词</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded-md border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              返回修改
            </button>
            <CopyButton getText={() => prompt} label="一键复制" />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-auto px-4 py-4">
          <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{prompt}</pre>
        </div>
      </div>
    </section>
  );
}

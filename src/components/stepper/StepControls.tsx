/**
 * @file StepControls component.
 * @description Navigation buttons for step form.
 */

import React from 'react';

interface StepControlsProps {
  canBack: boolean;
  canNext: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish?: () => void;
  isLast?: boolean;
}

export default function StepControls({
  canBack,
  canNext,
  onBack,
  onNext,
  onFinish,
  isLast,
}: StepControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="rounded-md border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        上一步
      </button>
      <div className="flex items-center gap-3">
        {!isLast ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            下一步
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinish}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            生成结果
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * @file StepIndicator component.
 * @description A clickable step indicator to show progress.
 */

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  current: number;
  onJump: (index: number) => void;
}

export default function StepIndicator({ steps, current, onJump }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap items-center gap-3" aria-label="步骤指示器">
      {steps.map((label, idx) => {
        const done = idx < current;
        const active = idx === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <button
              onClick={() => onJump(idx)}
              className={[
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition',
                active
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : done
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 items-center justify-center rounded-full text-[11px]',
                  active
                    ? 'bg-sky-600 text-white'
                    : done
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-700',
                ].join(' ')}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : idx + 1}
              </span>
              {label}
            </button>
            {idx < steps.length - 1 && (
              <span className="mx-1 hidden h-px w-6 bg-slate-200 md:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

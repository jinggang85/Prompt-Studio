/**
 * @file InlineTip component.
 * @description Small inline tip with icon and neutral background.
 */

import { Lightbulb, AlertTriangle } from 'lucide-react';
import React from 'react';

interface InlineTipProps {
  kind?: 'info' | 'warn';
  children: React.ReactNode;
}

export default function InlineTip({ kind = 'info', children }: InlineTipProps) {
  const isWarn = kind === 'warn';
  return (
    <div
      className={`mt-2 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${
        isWarn
          ? 'border-amber-300 bg-amber-50 text-amber-900'
          : 'border-sky-200 bg-sky-50 text-sky-900'
      }`}
    >
      {isWarn ? (
        <AlertTriangle className="mt-0.5 h-4 w-4" />
      ) : (
        <Lightbulb className="mt-0.5 h-4 w-4" />
      )}
      <div className="leading-5">{children}</div>
    </div>
  );
}

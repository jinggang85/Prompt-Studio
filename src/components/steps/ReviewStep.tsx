/**
 * @file ReviewStep.
 * @description Step 4: Show validation and preview prompt snippet.
 */

import React from 'react';
import InlineTip from '../common/InlineTip';

interface ReviewStepProps {
  warnings: string[];
  preview: string;
}

export default function ReviewStep({ warnings, preview }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      {warnings.length ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-900">
          <div className="text-sm font-medium">请先修正以下问题：</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      ) : (
        <InlineTip>看起来一切就绪！你可以生成结果或回到前面微调信息。</InlineTip>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-800">提示词预览（片段）</label>
        <pre className="mt-2 max-h-48 overflow-auto rounded-md border bg-slate-50 p-3 text-xs leading-5 text-slate-800">
{preview}
        </pre>
      </div>
    </div>
  );
}

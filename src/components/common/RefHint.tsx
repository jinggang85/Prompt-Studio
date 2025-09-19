/**
 * @file RefHint.tsx
 * @description Reusable "reference values" popover. Shows suggested values and allows one-click apply.
 */

import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Lightbulb, X } from 'lucide-react';

/** Reference item with label and any typed value */
export interface RefItem<T = any> {
  /** Display label in the popover list */
  label: string;
  /** Actual value passed back on select */
  value: T;
  /** Optional note displayed under label (small text) */
  note?: string;
}

interface RefHintProps<T = any> {
  /** Optional title shown at top of the popover */
  title?: string;
  /** The suggestion items list */
  items: RefItem<T>[];
  /** Invoked when user selects an item */
  onSelect: (value: T) => void;
  /** Custom trigger label (default: '参考值') */
  triggerLabel?: string;
}

/**
 * @component RefHint
 * @description A small popover listing reference suggestions for an input field.
 * Clicking a suggestion applies it through onSelect.
 */
export default function RefHint<T = any>({
  title = '参考值建议',
  items,
  onSelect,
  triggerLabel = '参考值',
}: RefHintProps<T>) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-sky-300 bg-white px-2.5 py-1 text-xs font-medium text-sky-700 hover:bg-sky-50"
          aria-label="显示参考值"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {triggerLabel}
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={8}
        className="z-50 w-72 rounded-lg border bg-white p-3 shadow-lg outline-none"
      >
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <div className="text-xs text-slate-500">点击可快速填入对应输入框</div>
          </div>
          <Popover.Close
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </Popover.Close>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {items.map((it) => (
            <button
              key={`${String(it.label)}-${String(it.value)}`}
              type="button"
              onClick={() => onSelect(it.value)}
              className="group w-full rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-left hover:bg-sky-100"
            >
              <div className="text-xs font-medium text-sky-900">{it.label}</div>
              {it.note ? (
                <div className="mt-0.5 text-[11px] text-slate-600">{it.note}</div>
              ) : null}
            </button>
          ))}
        </div>

        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Root>
  );
}

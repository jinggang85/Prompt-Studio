/**
 * @file NextSuggestions.tsx
 * @description A reusable "Next-step Suggestions" form. Users pick a primary suggestion via radio,
 * optionally choose a secondary suggestion via dropdown, and fill extra notes per option.
 * On submit, it aggregates the payload and calls an external callback.
 */

import React from 'react';
import { Lightbulb, ListChecks } from 'lucide-react';

interface SuggestionOption {
  /** Stable key used in form payload */
  key: string;
  /** Display label */
  label: string;
  /** Optional short description shown in the card */
  desc?: string;
}

interface NextSuggestionsPayload {
  /** Primary suggestion key selected via radio, or null if not selected */
  primary: string | null;
  /** Secondary suggestion key selected via dropdown, or null if not selected */
  secondary: string | null;
  /** Notes keyed by suggestion key */
  notes: Record<string, string>;
}

interface NextSuggestionsProps {
  /** Options shown in the list (radio + notes). Provide to customize; defaults are included. */
  options?: SuggestionOption[];
  /** Callback to receive submission payload for further processing (API, store, etc.) */
  onSubmit?: (payload: NextSuggestionsPayload) => void;
}

/**
 * @component NextSuggestions
 * @description A gentle, modern form for collecting next-step feature suggestions.
 */
export default function NextSuggestions({
  options,
  onSubmit,
}: NextSuggestionsProps) {
  const defaultOptions: SuggestionOption[] = React.useMemo(
    () => [
      { key: 'templates', label: '模板管理与收藏', desc: '保存/复用配置，快速创建相似提示词' },
      { key: 'persistence', label: '本地存储与恢复', desc: '自动保存进度，下次直接续写' },
      { key: 'importExport', label: '导入导出（JSON/Markdown）', desc: '与自动化/团队流程对接' },
      { key: 'i18n', label: '多语言切换', desc: '一键切换 UI 与提示词语言' },
      { key: 'share', label: '分享链接/协作', desc: '与同事协同编辑、评论与审批' },
      { key: 'api', label: 'API 调用示例集成', desc: '示例代码/SDK 指南，快速落地' },
    ],
    []
  );

  const opts = options && options.length ? options : defaultOptions;

  const [primary, setPrimary] = React.useState<string | null>(null);
  const [secondary, setSecondary] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(opts.map((o) => [o.key, '']))
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Keep notes keys in sync if options change dynamically.
  React.useEffect(() => {
    setNotes((prev) => {
      const map = new Map(Object.entries(prev));
      opts.forEach((o) => {
        if (!map.has(o.key)) map.set(o.key, '');
      });
      // Remove no-longer-existing keys
      for (const k of Array.from(map.keys())) {
        if (!opts.find((o) => o.key === k)) map.delete(k);
      }
      return Object.fromEntries(map);
    });
  }, [opts]);

  /**
   * @function handleNoteChange
   * @description Update note text for a specific suggestion key.
   */
  const handleNoteChange = (key: string, value: string) => {
    setNotes((n) => ({ ...n, [key]: value }));
  };

  /**
   * @function handleSubmit
   * @description Validate and emit payload with selected options and notes.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!primary) {
      setError('请选择一个主要建议（单选）。');
      return;
    }

    const payload: NextSuggestionsPayload = {
      primary,
      secondary: secondary || null,
      notes,
    };

    try {
      setSubmitting(true);
      // Reserve callback for further processing
      if (onSubmit) {
        await Promise.resolve(onSubmit(payload));
      } else {
        // Fallback: simple console output in absence of handler
        // eslint-disable-next-line no-console
        console.log('[NextSuggestions] submitted:', payload);
      }
      setSuccess(true);
      // Auto hide success hint
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      setError('提交失败，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * @function handleReset
   * @description Reset selection and notes to initial state.
   */
  const handleReset = () => {
    setPrimary(null);
    setSecondary(null);
    setNotes(Object.fromEntries(opts.map((o) => [o.key, ''])));
    setError(null);
    setSuccess(false);
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-600/90 text-white shadow-sm">
          <ListChecks className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">下一步建议</h3>
          <p className="text-sm text-slate-600">帮助我们优化体验：选择你最希望上线的功能，并留下补充说明。</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-4 shadow-sm"
        aria-labelledby="next-suggestions-title"
      >
        {/* Primary (radio) */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-800">主要建议（单选）</legend>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {opts.map((opt) => {
              const active = primary === opt.key;
              return (
                <label
                  key={opt.key}
                  htmlFor={`primary-${opt.key}`}
                  className={[
                    'group relative block rounded-lg border p-4 transition',
                    active
                      ? 'border-sky-400 bg-sky-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-3">
                    <input
                      id={`primary-${opt.key}`}
                      type="radio"
                      name="primary"
                      value={opt.key}
                      checked={active}
                      onChange={() => setPrimary(opt.key)}
                      className="mt-0.5 h-4 w-4 border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-slate-900">{opt.label}</div>
                      {opt.desc && <div className="mt-0.5 text-sm text-slate-600">{opt.desc}</div>}
                      {/* Notes for each option */}
                      <div className="mt-3">
                        <label
                          htmlFor={`note-${opt.key}`}
                          className="block text-xs font-medium text-slate-700"
                        >
                          补充说明（可选）
                        </label>
                        <textarea
                          id={`note-${opt.key}`}
                          rows={2}
                          value={notes[opt.key] ?? ''}
                          onChange={(e) => handleNoteChange(opt.key, e.target.value)}
                          placeholder="例如：需要批量导出；支持角色与标签；支持共享权限设置…"
                          className={[
                            'mt-1 w-full rounded-md border px-3 py-2 text-sm',
                            'focus:outline-none focus:ring-2',
                            active
                              ? 'border-sky-300 focus:border-sky-500 focus:ring-sky-200'
                              : 'border-slate-300 focus:border-sky-500 focus:ring-sky-200',
                          ].join(' ')}
                        />
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Secondary (select) */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-slate-800">
            其他建议（下拉可选）
          </label>
          <div className="mt-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-sky-600" />
            <select
              value={secondary ?? ''}
              onChange={(e) => setSecondary(e.target.value || null)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 md:w-1/2"
            >
              <option value="">请选择（可选）</option>
              {opts.map((o) => (
                <option value={o.key} key={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? '提交中…' : '提交建议'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            重置
          </button>

          {/* Inline feedback */}
          {success && (
            <span className="text-sm text-emerald-700">已提交，感谢你的建议！</span>
          )}
          {error && (
            <span className="text-sm text-amber-700">{error}</span>
          )}
        </div>
      </form>
    </section>
  );
}

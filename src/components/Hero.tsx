/**
 * @file Hero component.
 * @description Banner with gradient, image and key selling points. The CTA uses smooth-scroll to avoid HashRouter route changes.
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/** Smoothly scroll to a section by element id */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const points = ['多步引导，避免遗漏', '实时校验与示例提示', '一键复制结构化提示词', '适配移动与桌面端'];
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-sky-900 md:text-4xl">
            用多步引导，打造严谨可复用的 AI 提示词
          </h1>
          <p className="mt-3 text-slate-600">
            选择场景、补充细节、设置工具参数，实时校验，最终一键复制完整提示词。让每一次调用 AI 更高效、更可靠。
          </p>
          <ul className="mt-5 space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('builder');
              }}
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
            >
              开始生成
            </a>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-white shadow-sm">
          <img src="https://pub-cdn.sider.ai/u/U0E5HGEZ0W/web-coder/68afacc038697d89a134e811/resource/bd7c4650-c81f-4e2a-9bff-ea658bf920a1.jpg" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
        </div>
      </div>
    </section>
  );
}

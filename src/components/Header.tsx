/**
 * @file Header component.
 * @description Simple top navigation with logo and CTA. Links use smooth-scroll instead of hash-routes to avoid blank screens with HashRouter.
 */

import { Sparkles } from 'lucide-react';
import React from 'react';

/** Smoothly scroll to a section by element id */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">Prompt Studio</span>
        </div>
        <div className="flex items-center gap-2">

          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('builder');
            }}
            className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            立即开始
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * @file CopyButton component.
 * @description A button to copy provided text to clipboard.
 */

import { Check, Copy } from 'lucide-react';
import React from 'react';

interface CopyButtonProps {
  getText: () => string;
  className?: string;
  label?: string;
}

export default function CopyButton({ getText, className, label = '复制' }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={onCopy}
      className={`inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 ${className || ''}`}
      aria-label="Copy prompt"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? '已复制' : label}
    </button>
  );
}

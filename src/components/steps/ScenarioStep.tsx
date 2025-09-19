/**
 * @file ScenarioStep.
 * @description Step 1: Choose scenario with typical options or custom.
 */

import React from 'react';
import type { ScenarioKey } from '../../types/prompt';
import InlineTip from '../common/InlineTip';
import RefHint, { RefItem } from '../common/RefHint';

interface ScenarioStepProps {
  scenario: ScenarioKey | '';
  customScenario: string;
  onScenarioChange: (v: ScenarioKey | '') => void;
  onCustomChange: (v: string) => void;
}

const presets: { key: ScenarioKey; label: string; desc: string }[] = [
  { key: 'writing', label: '写作', desc: '文章、摘要、邮件、营销文案' },
  { key: 'art', label: '绘画', desc: '图像生成、风格化、提示词设计' },
  { key: 'code', label: '代码', desc: '函数实现、重构、注释、测试' },
  { key: 'analysis', label: '分析', desc: '数据分析、研究、对比评估' },
  { key: 'chatbot', label: '对话体', desc: '助手人设、对话策略、边界' },
];

export default function ScenarioStep({
  scenario,
  customScenario,
  onScenarioChange,
  onCustomChange,
}: ScenarioStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-slate-600">请选择你本次要生成的提示词应用场景：</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((p) => {
          const active = scenario === p.key;
          return (
            <button
              key={p.key}
              onClick={() => onScenarioChange(p.key)}
              className={[
                'group rounded-lg border p-4 text-left transition hover:shadow-sm',
                active ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white',
              ].join(' ')}
            >
              <div className="text-base font-medium text-slate-900">{p.label}</div>
              <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
            </button>
          );
        })}
        <div className={['rounded-lg border p-4', scenario === 'custom' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'].join(' ')}>
          <label className="block text-sm font-medium text-slate-800">自定义场景</label>
          <input
            value={customScenario}
            onChange={(e) => {
              onScenarioChange('custom');
              onCustomChange(e.target.value);
            }}
            placeholder="例如：产品需求澄清、学术翻译..."
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      <InlineTip>
        可先选最近似的预设，再用后续步骤补充细节；也可直接自定义场景。
      </InlineTip>
    </div>
  );
}

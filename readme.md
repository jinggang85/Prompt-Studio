# Prompt Studio (React + TypeScript)

一个基于 React 18 + TypeScript 的生产级多步式提示词构建器。通过“场景选择 → 细节补充 → 工具参数 → 检视校验”的流程，帮助你生成可复用、结构化、可直接粘贴到工作流中的高质量提示词。

- 在线预览：本工程默认以 iframe 预览方式运行
- 技术栈：React 18、react-router、Tailwind CSS、shadcn UI、lucide-react、esbuild
- 设计理念：组件驱动开发、强一致性、清晰的状态流、优雅的 UI/UX、可访问性与响应式优先

---

## 快速开始

准备环境：
- Node.js ≥ 18（推荐 18/20 LTS）
- npm ≥ 9（或兼容的包管理器）

安装依赖（如需，本环境多数依赖已预装）：
```bash
npm install
```

启动开发环境（带热更新）：
```bash
npm run dev
```

生产构建（生成优化产物）：
```bash
npm run build
```

脚本说明：
- `npm run dev`：调用 `scripts/build.mjs` 启动开发模式（esbuild + HMR）
- `npm run build`：调用 `scripts/build.mjs --production` 执行生产构建

> 提示：如遇端口冲突，请释放占用端口或修改 `scripts/build.mjs` 内部配置（不建议随意修改构建脚本）。

---

## 项目结构

仅展示本工程中与页面相关的主要文件（省略工具链/脚手架等）：

```
src/
├─ App.tsx                  # 路由入口（HashRouter，提供 * 通配回退）
├─ main.tsx                 # 应用挂载入口
├─ shadcn.css               # Tailwind + shadcn 基础样式与主题变量
├─ pages/
│  └─ Home.tsx              # 首页（横幅 + 多步构建器 + 结果面板）
├─ components/
│  ├─ Header.tsx            # 头部导航（平滑滚动到构建器）
│  ├─ Hero.tsx              # 横幅（卖点 + CTA）
│  ├─ ResultPanel.tsx       # 结果展示与复制
│  ├─ NextSuggestions.tsx   # 可选建议组件（如已移除入口，组件仍可复用）
│  ├─ common/
│  │  ├─ CopyButton.tsx
│  │  ├─ InlineTip.tsx
│  │  └─ RefHint.tsx
│  ├─ stepper/
│  │  ├─ StepControls.tsx
│  │  └─ StepIndicator.tsx
│  └─ steps/
│     ├─ ScenarioStep.tsx
│     ├─ DetailsStep.tsx
│     ├─ ToolsStep.tsx
│     └─ ReviewStep.tsx
├─ types/
│  └─ prompt.ts             # 类型定义（PromptState、Action、校验结果等）
└─ utils/
   └─ prompt.ts             # 提示词构建与校验工具函数
```

---

## 路由与导航约定

- 使用 `react-router`（非 `react-router-dom`），入口在 `src/App.tsx`。
- 路由模式为 `HashRouter`，并设置了通配 `*` 回退至首页，避免未知路径导致白屏。
- 页面内跳转使用“阻止默认 + 平滑滚动”的方式，而非改变 hash 路由。例如：
  - CTA 使用 `href="#/"` 并在 `onClick` 中 `scrollIntoView` 到页面内的 `#builder` 区块。
  - 避免使用 `href="#builder"` 这类锚点直达，因为 HashRouter 会把 `#/builder` 当成路由路径。

---

## 样式与 UI 规范

- Tailwind CSS：已配置基础设计令牌（`--foreground`、`--background`、`--primary` 等）。
- shadcn UI：请勿修改 `components/ui`（若存在），也不要直接改 `shadcn.css` 的核心变量命名方式。
- 图标库：`lucide-react`。
- 设计原则：
  - 视觉层次清晰、良好的色彩对比（避免相近色）
  - 响应式优先（移动端优先，适配桌面）
  - 统一的内边距与圆角半径（参照 CSS 变量 `--radius`）

---

## 组件开发约定

- 组件驱动与命名：
  - 单一职责、高内聚低耦合
  - 采用 PascalCase 的语义化名称
  - 大文件（>100 行）应考虑拆分
- 注释要求（JSDoc）：
  - 文件头：文件用途
  - 组件/函数/类/接口：简要描述
  - 复杂逻辑：必要的说明（保持同步更新、避免过度注释）
- 图片插入（强约束）：
  - 优先使用真实 URL；未知时用“智能占位”：
    - 直接使用：`<img src="https://pub-cdn.sider.ai/u/U0E5HGEZ0W/web-coder/68afacc038697d89a134e811/resource/d977da46-3e19-4aa4-b5c2-f12139dd4dae.jpg" className="object-cover" />`
    - 遍历时的数组写法：
      ```ts
      const items = [{ name: 'Aurora', src: 'https://pub-cdn.sider.ai/u/U0E5HGEZ0W/web-coder/68afacc038697d89a134e811/resource/be9b8efb-4e17-464c-9864-ab0bcd8be95e.jpg' }];
      {items.map(item => (
        <img src={item.src} className="object-cover" />
      ))}
      ```
  - 仅支持上述两种格式，其他形式会报错
- 可访问性（a11y）：
  - 表单控件需 `label` 对应、`aria-` 属性合理使用
  - 错误/校验信息提供视觉与可读文案
  - 可聚焦元素的 `:focus` 状态可见

---

## 业务逻辑与数据流

- `PromptState` 承载分步表单所有字段（场景、细节、工具参数）
- `reducer + action` 管理状态迁移，保证步骤间数据一致
- `utils/prompt.ts` 提供：
  - `validateStep`：逐步校验，返回 `warnings`
  - `buildPrompt`：生成最终可复制的结构化提示词
  - `shortHint`：用于右侧实时预览卡的精简文案

---

## 常见问题（FAQ）

- 点击“开始生成”变成白屏？
  - 原因：HashRouter 会将 `#` 后内容视为路径，如进入 `#/builder` 时未匹配到路由导致空白
  - 解决：
    - 所有 CTA 使用 `href="#/"`，并在 `onClick` 调用 `scrollIntoView` 到 `#builder`
    - `App.tsx` 已加入 `*` 通配路由回退到首页，避免未知路径白屏

- 语言默认值如何设置为中文？
  - 已在首页初始状态将 `details.language` 设置为 `中文`，避免校验提示

- 为什么不用 `react-router-dom`？
  - 项目约束使用 `react-router` 包，且当前环境下 `HashRouter` 更稳健

---

## 扩展与二次开发建议

- 模板库：提供常见场景模板（写作/代码/分析…）抽屉式一键填充
- 本地持久化：用 `localStorage` 持久化 `PromptState`
- 导入导出：JSON/Markdown 互转，方便团队协作与自动化接入
- 多语言：以 `i18next`/`react-i18next`（已在依赖中）接管 UI 文案
- 复制/分享：支持复制 URL/分享配置（需与状态持久化配合）

> 安装新依赖请谨慎：本工程已预装常用依赖。只有在“明确需要且无法手写”的情况下再引入三方包，并在 PR 中说明理由。

---

## 开发调试技巧

- 预览 iframe：保持首页非空，有入口或内容（当前 Home 已满足）
- 平滑滚动：`document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`
- 样式排查：利用浏览器 DevTools 检查 Tailwind 类的冲突与继承

---

## 代码质量

- 类型：充分使用 TypeScript 接口/类型别名，避免 `any`
- 可测试性：组件拆分、纯函数化逻辑易于测试（可引入测试框架后补充单元测试）
- 性能：避免不必要的 re-render，适当使用 `React.memo`/`useMemo`/`useCallback`

---

## 许可与说明

- 本工程示例为教学与演示用途。请在商用前根据实际合规与品牌规范进行审阅与定制。
- 图片资源请确认是否具备许可；未知时采用智能占位图（见上文“图片插入”约束）。

---

## 贡献

欢迎通过 Issue/PR 提交：
- Bug 修复
- 交互优化
- 新的模板与最佳实践

提交前请确认：
- 通过 `npm run build`
- 组件/函数带有 JSDoc 注释
- UI 在移动端与桌面端均表现良好

祝使用愉快！
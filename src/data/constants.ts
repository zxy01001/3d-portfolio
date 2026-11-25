// 23 AI-Native UX Competencies & Frontier Engineering Toolset — 100% packed into an 8×4 (32-cell) 3D Mechanical Keyboard:
// - 1 × [2×2] Flagship Hero Keycap: Figma Variables & MCP (4 cells)
// - 6 × [2×1] Core UX & Agentic AI Architecture Wide Keycaps (12 cells)
// - 16 × [1×1] AI-Native IDE, Generative UI, RAG/Eval, AIGC & Motion/3D Tool Keycaps (16 cells)
// Total = 4 + 12 + 16 = 32 cells (8 columns × 4 rows, 100% edge-to-edge full, zero orange!).
export enum SkillNames {
  FIGMA = "figma",
  AI_UX = "aiux",
  CURSOR = "cursor",
  CODEX = "codex",
  MCP = "mcp",
  PROMPT_EVAL = "eval",
  DESIGN_SYSTEM = "designsystem",
  RAG_UX = "rag",
  AXURE = "axure",
  PROTOPIE = "protopie",
  JISHI = "jishi",
  SYSTEM_MODEL = "domain",
  INFO_ARCH = "ia",
  HTML_CSS = "htmlcss",
  RESPONSIVE = "responsive",
  AFTER_EFFECTS = "ae",
  BLENDER = "blender",
  STATE_FLOW = "state",
  DATA_VIZ = "dataviz",
  COMFYUI = "comfyui",
  MIDJOURNEY = "midjourney",
  STABLE_DIFFUSION = "sd",
  USER_RESEARCH = "research",
}

export type Skill = {
  id: number;
  name: string;
  /** ASCII heading rendered as 3D extruded geometry above the keyboard. */
  label: string;
  /** Authoritative Chinese/English professional label shown in UI badges, cards, and HUD. */
  labelZh: string;
  category: string;
  shortDescription: string;
  color: string;
  /** Clean 1x1 white icon used in HTML badges and fallback grid. */
  icon: string;
  /** HiDPI SVG artwork rendered onto the 3D keycap top plane. */
  keyboardIcon?: string;
  /** Sculpted 3D keycap body color (zero orange). */
  keyboardColor?: string;
  /** Unique physical KeyboardEvent.code shortcut. */
  shortcut: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
};

export const SKILLS: Record<SkillNames, Skill> = {
  // ================= ROW 0 =================
  // Col 0..1, Row 0..1: [2x2] Flagship Figma Hero Keycap (4x size)
  [SkillNames.FIGMA]: {
    id: 1,
    name: "figma",
    label: "Figma & Variables",
    labelZh: "Figma（Variables / MCP）",
    category: "核心设计工程平台",
    shortDescription:
      "构建基于语义化 Variables 与 Auto Layout 的双端组件体系（覆盖率 92%），打通 Design-to-Code 交付管线",
    color: "#5b4eff",
    icon: "/assets/keyboard/logos/ux/figma.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/figma-2x2.svg",
    keyboardColor: "#5b4eff",
    shortcut: "KeyF",
    colSpan: 2,
    rowSpan: 2,
  },
  // Col 2..3, Row 0: [2x1] Core Competency #1 — Agentic UX
  [SkillNames.AI_UX]: {
    id: 2,
    name: "aiux",
    label: "Agentic UX",
    labelZh: "Agentic UX 智能体体验",
    category: "AI 原生核心架构",
    shortDescription:
      "构建多智能体编排（Multi-Agent）、置信度外显与人机回环（HITL）核验机制，收敛生成式模型的不确定性",
    color: "#7c3aed",
    icon: "/assets/keyboard/logos/ux/aiux.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/aiux-2x1.svg",
    keyboardColor: "#7c3aed",
    shortcut: "KeyU",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 4..7, Row 0: 4 × [1x1] Frontier AI-Native Engineering Stack
  [SkillNames.CURSOR]: {
    id: 3,
    name: "cursor",
    label: "Vibe Coding",
    labelZh: "Cursor / Claude Code",
    category: "AI 原生研发工作流",
    shortDescription:
      "践行 Vibe Coding 工作流，直接构建含真实状态机与数据联动的前端可运行交互原型，跨越静态画布局限",
    color: "#4f46e5",
    icon: "/assets/keyboard/logos/ux/cursor.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/cursor.svg",
    keyboardColor: "#4338ca",
    shortcut: "KeyV",
  },
  [SkillNames.CODEX]: {
    id: 4,
    name: "codex",
    label: "Generative UI",
    labelZh: "Generative UI 原型工程",
    category: "动态界面生成",
    shortDescription:
      "探索意图驱动的动态组件装配（Generative UI）与流式渲染交互，高效验证高复杂度 AI 场景",
    color: "#2563eb",
    icon: "/assets/keyboard/logos/ux/codex.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/codex.svg",
    keyboardColor: "#1d4ed8",
    shortcut: "KeyC",
  },
  [SkillNames.MCP]: {
    id: 5,
    name: "mcp",
    label: "Design MCP",
    labelZh: "Figma MCP 工程闭环",
    category: "AI 设计工程化",
    shortDescription:
      "基于 Model Context Protocol 贯通设计语义 Token、组件结构与前端代码生成，降低跨端还原损耗",
    color: "#0284c7",
    icon: "/assets/keyboard/logos/ux/mcp.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/mcp.svg",
    keyboardColor: "#0369a1",
    shortcut: "KeyN",
  },
  [SkillNames.PROMPT_EVAL]: {
    id: 6,
    name: "eval",
    label: "Prompt & Eval",
    labelZh: "结构化 Prompt 与评测",
    category: "模型协同与归因",
    shortDescription:
      "设计思维链（CoT）系统提示词契约，构建边缘场景测试集与 Badcase 归因闭环，反哺交互容错设计",
    color: "#10a37f",
    icon: "/assets/keyboard/logos/ux/eval.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/eval.svg",
    keyboardColor: "#059669",
    shortcut: "KeyG",
  },

  // ================= ROW 1 =================
  // (Col 0..1 occupied by Figma 2x2)
  // Col 2..3, Row 1: [2x1] Core Competency #2 — Design System
  [SkillNames.DESIGN_SYSTEM]: {
    id: 7,
    name: "designsystem",
    label: "Design System",
    labelZh: "双端设计系统与 Token",
    category: "核心体系工程",
    shortDescription:
      "统筹三级语义化 Design Tokens、多态组件变体契约与跨端治理标准，推动产研协同效率提升约 30%",
    color: "#3b5bdb",
    icon: "/assets/keyboard/logos/ux/designsystem.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/designsystem-2x1.svg",
    keyboardColor: "#3b5bdb",
    shortcut: "KeyD",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 4..7, Row 1: 4 × [1x1] RAG UX & Professional Prototyping Stack
  [SkillNames.RAG_UX]: {
    id: 8,
    name: "rag",
    label: "RAG & Grounding",
    labelZh: "RAG 知识溯源与防幻觉",
    category: "可解释 AI 体验",
    shortDescription:
      "针对企业知识库检索增强（RAG）场景，设计文档解析状态外显、原文证据链锚定与低置信度兜底机制",
    color: "#6d28d9",
    icon: "/assets/keyboard/logos/ux/rag.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/rag.svg",
    keyboardColor: "#5b21b6",
    shortcut: "KeyK",
  },
  [SkillNames.AXURE]: {
    id: 9,
    name: "axure",
    label: "Axure RP",
    labelZh: "Axure RP 逻辑建模",
    category: "复杂业务推演",
    shortDescription:
      "构建企业级多分支业务流程图与团队标准化原型规范库，在立项早期前置锁定业务规则",
    color: "#0ea5e9",
    icon: "/assets/keyboard/logos/ux/axure.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/axure.svg",
    keyboardColor: "#0284c7",
    shortcut: "KeyA",
  },
  [SkillNames.PROTOPIE]: {
    id: 10,
    name: "protopie",
    label: "ProtoPie",
    labelZh: "ProtoPie 条件微交互",
    category: "高保真动态验证",
    shortDescription:
      "结合传感器输入、条件变量与跨屏通信机制，构建设备级高保真语音及手势交互验证原型",
    color: "#db2777",
    icon: "/assets/keyboard/logos/ux/protopie.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/protopie.svg",
    keyboardColor: "#be185d",
    shortcut: "KeyP",
  },
  [SkillNames.JISHI]: {
    id: 11,
    name: "jishi",
    label: "Design Ops",
    labelZh: "云端协同与 DesignOps",
    category: "团队工程协同",
    shortDescription:
      "依托云端协同平台建立跨职能评审、标注交付与组件版本演进机制，保障大规模需求敏捷并行",
    color: "#3b82f6",
    icon: "/assets/keyboard/logos/ux/jishi.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/jishi.svg",
    keyboardColor: "#2563eb",
    shortcut: "KeyJ",
  },

  // ================= ROW 2 =================
  // Col 0..1, Row 2: [2x1] Core Competency #3 — Domain Modeling
  [SkillNames.SYSTEM_MODEL]: {
    id: 12,
    name: "domain",
    label: "Domain Model",
    labelZh: "复杂业务领域建模",
    category: "系统架构核心能力",
    shortDescription:
      "运用面向对象（OOUX）方法抽象实体关系、单据生命周期与 RBAC 权限矩阵，确立可扩展的产品底层骨架",
    color: "#4338ca",
    icon: "/assets/keyboard/logos/ux/domain.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/domain-2x1.svg",
    keyboardColor: "#4338ca",
    shortcut: "KeyM",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 2..3, Row 2: [2x1] Core Competency #4 — Information Architecture
  [SkillNames.INFO_ARCH]: {
    id: 13,
    name: "ia",
    label: "Info Arch",
    labelZh: "信息架构与认知降维",
    category: "系统架构核心能力",
    shortDescription:
      "基于心智模型重组与渐进式披露（Progressive Disclosure），系统性治理多轮迭代堆叠的高耦合存量模块",
    color: "#0891b2",
    icon: "/assets/keyboard/logos/ux/ia.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/ia-2x1.svg",
    keyboardColor: "#0891b2",
    shortcut: "KeyI",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 4..7, Row 2: 4 × [1x1] Frontend, Cross-End, Motion & Spatial 3D
  [SkillNames.HTML_CSS]: {
    id: 14,
    name: "htmlcss",
    label: "Frontend Spec",
    labelZh: "HTML / CSS / React 认知",
    category: "前端工程协同",
    shortDescription:
      "深入理解现代组件树、Flex/Grid 布局及响应式断点机制，以工程化思维保障高还原度研发交付",
    color: "#06b6d4",
    icon: "/assets/keyboard/logos/ux/htmlcss.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/htmlcss.svg",
    keyboardColor: "#0e7490",
    shortcut: "KeyH",
  },
  [SkillNames.RESPONSIVE]: {
    id: 15,
    name: "responsive",
    label: "Adaptive UI",
    labelZh: "跨端自适应信息编排",
    category: "多端体验架构",
    shortDescription:
      "依据桌面高密度工作台与移动单手作业场景重构信息优先级，建立同源异构的跨端交互规范",
    color: "#0d9488",
    icon: "/assets/keyboard/logos/ux/responsive.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/responsive.svg",
    keyboardColor: "#0f766e",
    shortcut: "KeyR",
  },
  [SkillNames.AFTER_EFFECTS]: {
    id: 16,
    name: "ae",
    label: "Motion System",
    labelZh: "After Effects 动态编排",
    category: "状态转场与叙事",
    shortDescription:
      "设计符合空间物理直觉的阻尼缓动曲线、AI 流式推理微动效与企业级产品全链路视觉演示",
    color: "#7c3aed",
    icon: "/assets/keyboard/logos/ux/ae.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/ae.svg",
    keyboardColor: "#5b21b6",
    shortcut: "KeyE",
  },
  [SkillNames.BLENDER]: {
    id: 17,
    name: "blender",
    label: "Blender 3D",
    labelZh: "Blender 三维空间视觉",
    category: "三维建模与光影",
    shortDescription:
      "掌握三维硬表面建模、PBR 材质系统与全局光影渲染，赋能高辨识度的品牌与空间交互表达",
    color: "#0284c7",
    icon: "/assets/keyboard/logos/ux/blender.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/blender.svg",
    keyboardColor: "#0369a1",
    shortcut: "KeyL",
  },

  // ================= ROW 3 =================
  // Col 0..1, Row 3: [2x1] Core Competency #5 — Multimodal & State Machine
  [SkillNames.STATE_FLOW]: {
    id: 18,
    name: "state",
    label: "Multimodal HITL",
    labelZh: "多模态交互与状态机",
    category: "AI 原生核心架构",
    shortDescription:
      "贯通语音/文本多模态输入、流式转写反馈、读写态分离与全分支异常自愈路径，确保零断路闭环",
    color: "#059669",
    icon: "/assets/keyboard/logos/ux/state.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/state-2x1.svg",
    keyboardColor: "#0d9488",
    shortcut: "KeyS",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 2..3, Row 3: [2x1] Core Competency #6 — AI + BI Decision Workbench
  [SkillNames.DATA_VIZ]: {
    id: 19,
    name: "dataviz",
    label: "AI + BI Studio",
    labelZh: "智能经营决策看板",
    category: "数据架构核心能力",
    shortDescription:
      "围绕“态势感知—异动归因—多维对比—明细下钻”重构高信噪比 BI 工作台，支持极值降噪与实时联动",
    color: "#0284c7",
    icon: "/assets/keyboard/logos/ux/dataviz.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/dataviz-2x1.svg",
    keyboardColor: "#0284c7",
    shortcut: "KeyB",
    colSpan: 2,
    rowSpan: 1,
  },
  // Col 4..7, Row 3: 4 × [1x1] Parametric AIGC Workflows & UX Audit
  [SkillNames.COMFYUI]: {
    id: 20,
    name: "comfyui",
    label: "ComfyUI Flow",
    labelZh: "ComfyUI 节点式管线",
    category: "参数化 AIGC 工程",
    shortDescription:
      "搭建模块化节点式生成管线（Workflow），实现可控风格、高一致性的批量化产品视觉资产生产",
    color: "#0ea5e9",
    icon: "/assets/keyboard/logos/ux/comfyui.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/comfyui.svg",
    keyboardColor: "#0369a1",
    shortcut: "KeyW",
  },
  [SkillNames.MIDJOURNEY]: {
    id: 21,
    name: "midjourney",
    label: "Midjourney",
    labelZh: "Midjourney 视觉推演",
    category: "AIGC 概念设定",
    shortDescription:
      "用于高效率视觉方向探索、企业数字员工/智能体形象设定及高质感场景化辅助素材构建",
    color: "#475569",
    icon: "/assets/keyboard/logos/ux/midjourney.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/midjourney.svg",
    keyboardColor: "#334155",
    shortcut: "KeyO",
  },
  [SkillNames.STABLE_DIFFUSION]: {
    id: 22,
    name: "sd",
    label: "ControlNet / SD",
    labelZh: "Stable Diffusion 可控生成",
    category: "精准视觉控制",
    shortDescription:
      "结合 ControlNet 构图约束与 LoRA 微调权重，产出严格契合品牌调性的结构化图形资产",
    color: "#8b5cf6",
    icon: "/assets/keyboard/logos/ux/sd.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/sd.svg",
    keyboardColor: "#6d28d9",
    shortcut: "KeyT",
  },
  [SkillNames.USER_RESEARCH]: {
    id: 23,
    name: "research",
    label: "UX Audit & QA",
    labelZh: "体验度量与还原验收",
    category: "全周期质量闭环",
    shortDescription:
      "运用启发式评估、任务完成率度量与全量边界走查清单，驱动设计方案从文档定义到线上指标闭环",
    color: "#14b8a6",
    icon: "/assets/keyboard/logos/ux/research.svg",
    keyboardIcon: "/assets/keyboard/logos/keys-v4/research.svg",
    keyboardColor: "#0f766e",
    shortcut: "KeyQ",
  },
};

export const VALUE_PILLARS = [
  {
    metric: "3 款 0→1",
    tag: "AGENTIC UX · HITL PARADIGM",
    title: "生成式与多模态 AI 的确定性交互架构",
    desc: "主导企业智能体编排平台、多模态语音抄单（准确率 80%+）及 AI 销售陪练商业化投产，建立“流式过程外显、置信度分层核验（HITL）、全分支异常自愈”的 AI 原生设计范式。",
  },
  {
    metric: "92% 覆盖",
    tag: "DESIGN TOKENS · VIBE CODING",
    title: "设计系统工程化与代码级交互验证",
    desc: "统筹构建基于语义化 Variables 的双端 Figma 组件库与标准化原型体系（协同提效 30%），并融合 Cursor / Claude Code 等 Vibe Coding 工具直出高保真数据联动原型。",
  },
  {
    metric: "6+ 业务域",
    tag: "OOUX · DOMAIN ARCHITECTURE",
    title: "复杂 B 端面向对象建模与存量治理",
    desc: "运用 OOUX 领域建模完成「易仓配」全链路仓储状态机架构，主导企业级设置中心六大业务域的信息架构降维、读写状态解耦与 RBAC 权限边界重构。",
  },
];

export type Experience = {
  id: number;
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  badge?: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "2025.05", end: "至今" }],
    title: "UED 交互设计师（AI 原生与复杂系统方向）",
    company: "南京掌控网络科技有限公司",
    badge: "平台 / 消费品 / 智能 AI 三线主设",
    description: [
      "Agentic AI 产品 0→1 架构落地：独立主导企业智能体编排工作台、多模态语音抄单助手及跨端 AI 销售陪练系统的领域建模、人机回环（HITL）核验机制与证据化评估体验设计。",
      "设计工程化与 Vibe Coding 提效：统筹 Web / Mobile 双端 Figma 语义化组件库（覆盖率 92%，产研提效 30%），引入 Design-to-Code 与代码级交互原型验证，显著消除复杂状态沟通偏差。",
      "复杂 B 端建模与存量治理：完成易仓配 WMS 全链路单据状态机设计，主导设置中心六大职能域的认知降维、读写态分离与权限校验规则前置。",
    ],
    skills: [
      SkillNames.FIGMA,
      SkillNames.AI_UX,
      SkillNames.CURSOR,
      SkillNames.MCP,
      SkillNames.DESIGN_SYSTEM,
      SkillNames.SYSTEM_MODEL,
      SkillNames.RAG_UX,
    ],
  },
  {
    id: 2,
    periods: [{ start: "2024.08", end: "2025.04" }],
    title: "产品体验设计实习生",
    company: "上海清鹤科技股份有限公司",
    badge: "企业级 B 端系统",
    description: [
      "负责企业级后台系统的交互架构优化、组件标注交付与前端工程还原走查，并独立完成核心业务流动态交互演示设计。",
    ],
    skills: [SkillNames.FIGMA, SkillNames.AFTER_EFFECTS, SkillNames.HTML_CSS],
  },
];

export const EDUCATION = {
  school: "南京传媒学院",
  degree: "交互设计 · 本科",
  period: "2021 — 2025",
  highlight: "专业排名前 3%",
  certs: "CET-4 · 全国计算机二级",
};

export const themeDisclaimers = {
  light: ["已切换至浅色视图模式，适配高对比度文档与界面细节审阅。"],
  dark: ["已切换至深色视图模式，适配三维空间光影与沉浸式案例浏览。"],
};

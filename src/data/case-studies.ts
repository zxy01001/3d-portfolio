export type Hotspot = {
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  title: string;
  detail: string;
};

export type FlowStep = {
  label: string;
  title: string;
  decision: string;
  image: string;
  device?: "desktop" | "mobile";
  hotspots?: Hotspot[];
};

export type FlowTrack = {
  id: string;
  tab: string;
  device: "desktop" | "mobile";
  steps: FlowStep[];
};

export type CompareModule = {
  id: string;
  label: string;
  title: string;
  decision: string;
  beforeImg: string;
  afterImg: string;
  editImg?: string; // Optional secondary state (e.g. View vs Edit)
  beforePain: string;
  afterGain: string;
};

export type DetailHighlight = {
  tag: string;
  title: string;
  caption: string;
  image: string;
  wide?: boolean;
};

export type ValueTakeaway = {
  code: string;
  title: string;
  desc: string;
};

export type CaseStudyData = {
  slug: string;
  indexLabel: string;
  category: string;
  filterGroup: "ai" | "b2b";
  featuredSpan?: boolean;
  badge: string;
  title: string;
  oneLiner: string;
  role: string;
  period: string;
  coverSrc: string;
  accentFrom: string;
  accentTo: string;
  metrics: { value: string; label: string }[];
  studioMode: "flow" | "compare" | "bi";
  tracks?: FlowTrack[];
  compareModules?: CompareModule[];
  highlights: DetailHighlight[];
  takeaways: ValueTakeaway[];
};

const ZXY = "/assets/zxy";

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "agent-platform",
    indexLabel: "01",
    category: "企业 AI 中台",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "0→1 已上线",
    title: "企业智能体工作台",
    oneLiner: "将底层大模型参数、知识库与诊断逻辑抽象封装，构建面向业务人员的零代码 AI 编排工作台。",
    role: "项目主设（需求拆解 / 架构 / 交互 / UI）",
    period: "2026.02 — 2026.04",
    coverSrc: `${ZXY}/agent-platform/library/library-overview.png`,
    accentFrom: "#4263eb",
    accentTo: "#2fc5c9",
    metrics: [
      { value: "0 → 1", label: "产品化上线" },
      { value: "0 代码", label: "业务自主编排" },
      { value: "2 大链路", label: "资产库 + 诊断台" },
    ],
    studioMode: "flow",
    tracks: [
      {
        id: "library",
        tab: "智能体资产库",
        device: "desktop",
        steps: [
          {
            label: "分组总览",
            title: "用文件夹心智治理百级 Agent 资产",
            decision: "自定义分组与单体智能体共用一套栅格骨架，凭数量角标与色标秒级区分层级。",
            image: `${ZXY}/agent-platform/library/library-overview.png`,
            hotspots: [
              {
                x: 24,
                y: 34,
                title: "同构文件夹卡片",
                detail: "目录与单智能体保持统一卡片尺寸，混合排布时视觉依然严整有序。",
              },
              {
                x: 78,
                y: 22,
                title: "高频检索与新建收敛",
                detail: "顶部聚焦全局搜索与主创建入口，抑制次要管理按钮抢占视觉重心。",
              },
            ],
          },
          {
            label: "卡片骨架",
            title: "高信噪比的对象信息分层",
            decision: "锁定「类型图标—名称—业务简介—下属数量—更多操作」五要素，消除跨类型跳动。",
            image: `${ZXY}/agent-platform/library/group-card.png`,
          },
          {
            label: "批量调度",
            title: "面向规模化运维的多选模式",
            decision: "进入多选态后浮动呈现批量归类与管理动作，平时隐藏以保持浏览纯净度。",
            image: `${ZXY}/agent-platform/library/library-selection.png`,
          },
          {
            label: "目录迁移",
            title: "不脱离当前上下文的轻量移动",
            decision: "采用目录树模态框完成跨组迁移，操作后即时刷新归属反馈。",
            image: `${ZXY}/agent-platform/library/move-item.png`,
          },
        ],
      },
      {
        id: "diagnosis",
        tab: "客户诊断编排",
        device: "desktop",
        steps: [
          {
            label: "配置与沙盒同屏",
            title: "左规则配置 · 右实时对话预览",
            decision: "消除“保存—跳转—测试—返回”的跨页割裂链路，实现规则参数修改与右侧对话沙盒的实时同步验证。",
            image: `${ZXY}/agent-platform/diagnosis/overview.png`,
            hotspots: [
              {
                x: 32,
                y: 45,
                title: "渐进式规则表单",
                detail: "将底层 Prompt 拆解为业务可读的数据源、参数与开场白模块。",
              },
              {
                x: 76,
                y: 50,
                title: "实时仿真对话窗",
                detail: "保持上下文不丢失，随时检验欢迎语、快捷追问与诊断输出格式。",
              },
            ],
          },
          {
            label: "条件树构造",
            title: "树形分类 + AND/OR 逻辑组同屏协同",
            decision: "左树锚定业务大类，右表编排且/或条件嵌套，实现多层级布尔逻辑条件的可视化编排。",
            image: `${ZXY}/agent-platform/diagnosis/scope-rules.png`,
          },
          {
            label: "洞察维度",
            title: "将模型变量翻译为业务语言",
            decision: "围绕订单、回款、活跃度组织分析维度，让一线运营无需理解底层字段名。",
            image: `${ZXY}/agent-platform/diagnosis/dimension-config.png`,
          },
          {
            label: "结论映射",
            title: "诊断结论与跟进动作强绑定",
            decision: "建立风险等级色标、结论摘要与销售动作建议的确定性映射。",
            image: `${ZXY}/agent-platform/diagnosis/conclusion-config.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "CONFIG + SANDBOX",
        title: "配置与验证同屏闭环",
        caption: "将调试前置到配置过程中，显著减少错误规则流入生产环境。",
        image: `${ZXY}/agent-platform/diagnosis/overview.png`,
        wide: true,
      },
      {
        tag: "RULE BUILDER",
        title: "复杂布尔条件降维表达",
        caption: "左侧分类树锁定上下文，右侧嵌套条件组清晰可控。",
        image: `${ZXY}/agent-platform/diagnosis/scope-rules.png`,
      },
      {
        tag: "ASSET SYSTEM",
        title: "可扩展的文件夹与卡片同构",
        caption: "从 5 个智能体到 500 个智能体，信息架构无需推倒重来。",
        image: `${ZXY}/agent-platform/library/group-card.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 架构价值",
        title: "业务语义替代技术术语",
        desc: "将底层 Prompt、模型变量与阈值封装为“洞察维度、适用范围、诊断结论”，实现业务侧零代码自主配置。",
      },
      {
        code: "02 · 交互克制",
        title: "渐进式披露控制复杂度",
        desc: "首屏聚焦核心配置骨架，复杂条件组按流程节点渐进式展开，严格控制单屏认知负荷。",
      },
      {
        code: "03 · 商业落地",
        title: "0→1 补齐中台核心底座",
        desc: "2026 年 4 月正式投产，支撑企业多业务线智能体的统一收口管理与快速复用。",
      },
    ],
  },

  {
    slug: "voice-order",
    indexLabel: "02",
    category: "AI 多模态交互",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "准确率 80%+",
    title: "智能语音抄单助手",
    oneLiner: "支持语音口述与文本粘贴的多商品批量解析成单，通过分层核对机制建立高可靠的人机协同闭环。",
    role: "项目主设（任务流 / 状态机 / 视觉交付）",
    period: "2025.07 — 2025.08",
    coverSrc: `${ZXY}/covers/voice-order-cover.svg`,
    accentFrom: "#0d9488",
    accentTo: "#3b82f6",
    metrics: [
      { value: "80%+", label: "多品下单准确率" },
      { value: "10+ 家", label: "日活批发企业" },
      { value: "100%", label: "异常分支全兜底" },
    ],
    studioMode: "flow",
    tracks: [
      {
        id: "main",
        tab: "主路径：输入→解析→核对",
        device: "mobile",
        steps: [
          {
            label: "唤起引导",
            title: "前置结构化输入范例，降低自然语言交互的冷启动门槛",
            decision: "面板首屏直接给出多商品+规格+数量的口语示例，引导高命中率表达。",
            image: `${ZXY}/voice-order/02-voice-assistant.png`,
            hotspots: [
              {
                x: 50,
                y: 44,
                title: "高命中率句式提示",
                detail: "用真实批发订货语料示范“商品名 + 规格 + 单位数量”，前置提升识别率。",
              },
              {
                x: 50,
                y: 84,
                title: "单手拇指热区",
                detail: "高频语音与文本粘贴入口全部收敛于屏幕下半区，契合仓库走动单手操作。",
              },
            ],
          },
          {
            label: "实时声波转写",
            title: "声波反馈与流式转写实时同步，提升识别过程可感知度",
            decision: "声波律动配合流式文本实时上屏，消除传统语音识别的黑盒等待焦虑。",
            image: `${ZXY}/voice-order/04-recording-live-1.png`,
          },
          {
            label: "微信文本粘贴",
            title: "兼容批发业务场景中采购文本批量粘贴解析的高频工作流",
            decision: "无需切回键盘逐字敲击，一键粘贴客户发来的采购文字即可同链路拆解。",
            image: `${ZXY}/voice-order/06-text-paste.png`,
          },
          {
            label: "四层可解释核对",
            title: "透明化解析映射链路，降低人工核验认知成本",
            decision: "按「原始语句 → 提取词项 → 首选匹配商品 → 数量规格」四层结构排布，提升批量订单核验效率。",
            image: `${ZXY}/voice-order/09-match-result.png`,
            hotspots: [
              {
                x: 45,
                y: 28,
                title: "原话与解析词对照",
                detail: "保留用户原始输入切片，方便业务员核查是否漏品或串行。",
              },
              {
                x: 78,
                y: 56,
                title: "低成本微调控件",
                detail: "直接在结果卡内增减数量或剔除单品，无需退回重录。",
              },
            ],
          },
          {
            label: "相近候选展开",
            title: "一键切换同名异规候选品",
            decision: "针对同名多规格商品匹配场景，默认收纳高置信度候选列表，支持单次点击快速替换。",
            image: `${ZXY}/voice-order/10-match-expanded.png`,
          },
        ],
      },
      {
        id: "edge",
        tab: "容错闭环：异常与成单",
        device: "mobile",
        steps: [
          {
            label: "未识别采购意图",
            title: "针对意图未识别场景提供明确归因与重新录入引导",
            decision: "摒弃技术化错误码提示，明确反馈未提取到有效商品实体并保留底部快捷重录入口。",
            image: `${ZXY}/voice-order/15-empty-unrecognized.png`,
          },
          {
            label: "库内无匹配商品",
            title: "解析成功但无对应库存时的平滑转接",
            decision: "保留已识别关键词，引导一键跳转常规搜索或联系新增商品，任务不中断。",
            image: `${ZXY}/voice-order/16-empty-unmatched.png`,
          },
          {
            label: "批量写入成单",
            title: "核对确认后秒级生成正式业务订单",
            decision: "清晰反馈成功写入的商品项数与金额汇总，形成高确定性收尾。",
            image: `${ZXY}/voice-order/13-order-success.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "EXPLAINABLE AI",
        title: "四层结构化核对卡",
        caption: "通过分层核对卡片与候选商品快捷切换机制，系统性收敛自然语言识别的不确定性。",
        image: `${ZXY}/voice-order/10-match-expanded.png`,
      },
      {
        tag: "MULTIMODAL",
        title: "语音口述 + 微信粘贴双引擎",
        caption: "贴合真实批发场景，不强迫用户改变既有沟通习惯。",
        image: `${ZXY}/voice-order/06-text-paste.png`,
      },
      {
        tag: "EDGE RECOVERY",
        title: "精细拆分的失败恢复路径",
        caption: "针对“意图未识别”与“库存无匹配”两类异常状态，提供差异化的任务恢复路径。",
        image: `${ZXY}/voice-order/16-empty-unmatched.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 核心判断",
        title: "效率与准确性的平衡点",
        desc: "B 端订单错发一箱货损失巨大，因此设计重心不是“全自动静默下单”，而是“极速核对”。",
      },
      {
        code: "02 · 状态功底",
        title: "异常分支决定真实口碑",
        desc: "完整定义收音态、解析加载态、多候选切换、全部清空及两类异常空状态，保障线上交互闭环。",
      },
      {
        code: "03 · 数据印证",
        title: "准确率 80%+ · 10+ 日活企业",
        desc: "显著压缩多商品录单时长与漏单率，验证了轻量化 AI 助手在传统流通业的生命力。",
      },
    ],
  },

  {
    slug: "sales-coaching",
    indexLabel: "03",
    category: "跨端 AI 陪练",
    filterGroup: "ai",
    badge: "Web + Mobile 闭环",
    title: "AI 销售陪练双端系统",
    oneLiner: "打通管理者 Web 三步配课与一线销售移动端拟真对练、证据化复盘的完整体验。",
    role: "项目主设（跨端对象建模 / 交互 / UI）",
    period: "2026.07 — 持续验证",
    coverSrc: `${ZXY}/sales-coaching/04-scene-setup.png`,
    accentFrom: "#6366f1",
    accentTo: "#14b8a6",
    metrics: [
      { value: "Web+App", label: "双角色跨端同源" },
      { value: "3 步向导", label: "收敛 5 类复杂实体" },
      { value: "证据回溯", label: "扣分直连对话原声" },
    ],
    studioMode: "flow",
    tracks: [
      {
        id: "web",
        tab: "Web 管理配课端",
        device: "desktop",
        steps: [
          {
            label: "01 定知识",
            title: "三步向导第一步：锚定训练知识源",
            decision: "将高耦合的五类业务实体解耦为线性三步向导，首步聚焦训练语料导入与核心考点确认。",
            image: `${ZXY}/sales-coaching/01-knowledge-step.png`,
            hotspots: [
              {
                x: 50,
                y: 14,
                title: "确定性三步步骤条",
                detail: "将「定知识 → 配场景 → 发任务」固化为顶部向导，消除跨多页配置的迷失感。",
              },
            ],
          },
          {
            label: "AI 考点萃取",
            title: "显性化 AI 解析过程与人工校对入口",
            decision: "文档解析完成后结构化列出核心话术点，管理员可随时增删覆写。",
            image: `${ZXY}/sales-coaching/03-knowledge-ready.png`,
          },
          {
            label: "02 配客户场景",
            title: "模块化配置虚拟客户画像与高挑战异议场景",
            decision: "将抽象 Prompt 拆解为客户身份、性格特征、核心异议与通关目标卡片。",
            image: `${ZXY}/sales-coaching/04-scene-setup.png`,
            hotspots: [
              {
                x: 28,
                y: 48,
                title: "可视化角色选择器",
                detail: "内置标准化高抗拒度客户画像模板并支持参数化微调，显著降低实训课程配置门槛。",
              },
              {
                x: 72,
                y: 55,
                title: "场景与异议绑定",
                detail: "明确每场对练必须攻克的客户痛点，直接联动后续评分标准。",
              },
            ],
          },
          {
            label: "评分权重规则",
            title: "建立量化评分权重矩阵，保障评估客观一致性",
            decision: "按礼貌度、需求挖掘、异议化解等维度配置分值占比，直接驱动移动端报告。",
            image: `${ZXY}/sales-coaching/07-score-rules.png`,
          },
          {
            label: "03 任务全局看板",
            title: "发布前完整性预检与训后追踪",
            decision: "统一归集参训成员进度、平均得分与高频失分点，闭环反哺课程迭代。",
            image: `${ZXY}/sales-coaching/15-task-overview.png`,
          },
        ],
      },
      {
        id: "mobile",
        tab: "Mobile 销售对练端",
        device: "mobile",
        steps: [
          {
            label: "任务大厅",
            title: "按紧迫度与状态分流待练任务",
            decision: "清晰区分待开始、进行中与已复盘，一线销售打开即知今日重点。",
            image: `${ZXY}/sales-coaching/mobile/01-task-list.png`,
          },
          {
            label: "拟真抗拒对话",
            title: "高还原度模拟真实业务异议沟通场景",
            decision: "还原自然聊天节奏与角色口吻，降低真人演练的尴尬与心理负担。",
            image: `${ZXY}/sales-coaching/mobile/07-practice-chat.png`,
          },
          {
            label: "语音应答与锦囊",
            title: "支持按需调取结构化应答策略提示，兼顾实训辅助与能力评估",
            decision: "底部设置高可达性语音输入热区，右上角轻量收纳应答策略面板，维持对话交互连贯性。",
            image: `${ZXY}/sales-coaching/mobile/08-practice-voice.png`,
          },
          {
            label: "多维证据复盘",
            title: "支持各维度失分项精准回溯至原始对话语句与录音节点",
            decision: "总分雷达 + 逐维度点评 + 原对话录音定位，让 AI 评分真正令人信服。",
            image: `${ZXY}/sales-coaching/mobile/12-result-overview.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "WIZARD ARCHITECTURE",
        title: "五类复杂对象收敛为三步向导",
        caption: "依序完成知识源锚定、角色及评分规则配置、参训人员指派发布，确保各阶段产出高度可控。",
        image: `${ZXY}/sales-coaching/04-scene-setup.png`,
        wide: true,
      },
      {
        tag: "AI CO-PILOT",
        title: "AI 辅助生成角色与对话预览",
        caption: "管理端配置时即可唤起 AI 试聊，提前校验客户人设是否贴合业务。",
        image: `${ZXY}/sales-coaching/11-ai-dialog.png`,
      },
      {
        tag: "RULE TRANSPARENCY",
        title: "同源贯通的评分维度配置",
        caption: "后台配课规则与移动端复盘卡片一一映射，消除双端认知断层。",
        image: `${ZXY}/sales-coaching/07-score-rules.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 跨端视角",
        title: "构建双端同源的业务模型契约",
        desc: "以“训练任务”为核心契约，确保管理端配置的每一项参数都在练习端产生真实反馈。",
      },
      {
        code: "02 · 认知减负",
        title: "将网状多实体依赖重构为线性向导流程",
        desc: "通过对象依赖分析决定哪些动作合并同屏、哪些放入抽屉，大幅降低建课放弃率。",
      },
      {
        code: "03 · 可信评估",
        title: "用“原文证据链”建立 AI 权威度",
        desc: "评分报告绑定具体对话回合与改进建议，真正帮助销售提升实战话术。",
      },
    ],
  },

  {
    slug: "business-overview",
    indexLabel: "04",
    category: "BI 决策工作台",
    filterGroup: "b2b",
    badge: "含实时联动原型",
    title: "经营概览看板重设计",
    oneLiner: "从碎片化报表堆砌，转向“看现状—找波动—做对比—查明细”的连续决策路径。",
    role: "核心设计师（信息层级 / 数据联动 / 响应式规范）",
    period: "2026 专项重设计",
    coverSrc: `${ZXY}/business-overview/dashboard-full.png`,
    accentFrom: "#0284c7",
    accentTo: "#2563eb",
    metrics: [
      { value: "4 步动线", label: "感知→趋势→对比→下钻" },
      { value: "双端重排", label: "Web 双栏 + 移动重排" },
      { value: "实时联动", label: "可点击操作验证原型" },
    ],
    studioMode: "bi",
    tracks: [
      {
        id: "screens",
        tab: "高保真设计状态",
        device: "desktop",
        steps: [
          {
            label: "默认高信噪比态",
            title: "严控首屏视觉密度，建立固定读数顺序",
            decision: "按「全局筛选 → 指标开关 → 趋势视图 → 异常项过滤」建立固定视觉动线，强化数据因果可读性。",
            image: `${ZXY}/business-overview/chart-default.png`,
          },
          {
            label: "图例选中对比态",
            title: "柔和聚焦目标对象，保留全局参照系",
            decision: "选中单一品类时以品牌色描边提亮，其余系列弱化保留而非隐藏，方便横向对比。",
            image: `${ZXY}/business-overview/chart-selected.png`,
          },
          {
            label: "明细排行下钻态",
            title: "左列图形看结构 · 右列排行查精确值",
            decision: "双栏并置视觉占比与精确金额表，支持剔除极值干扰并继续追查具体单品。",
            image: `${ZXY}/business-overview/chart-scrolled.png`,
          },
          {
            label: "完整看板全景",
            title: "销售、资金、采购三大经营主题一体化统合",
            decision: "上层全局 KPI 联动主趋势，下层页签承载专项分析，彻底终结纵向无限堆图。",
            image: `${ZXY}/business-overview/dashboard-full.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "VISUAL HIERARCHY",
        title: "默认态与选中态的克制对比",
        caption: "摒弃高饱和度冗余色彩干扰，通过克制的明度与饱和度对比聚焦核心分析序列。",
        image: `${ZXY}/business-overview/chart-selected.png`,
      },
      {
        tag: "DUAL-COLUMN",
        title: "图形直觉与财务精度的同屏平衡",
        caption: "左图看趋势占比，右表看精确数字与排名涨跌。",
        image: `${ZXY}/business-overview/chart-default.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 决策导向",
        title: "指标卡即趋势切换器",
        desc: "点击顶部核心 KPI 直接切换主折线图，省去重复平铺 4 张同质趋势图的空间浪费。",
      },
      {
        code: "02 · 跨端法则",
        title: "移动端是重新编排，而非等比缩小",
        desc: "窄屏下改为横向指标流 + 单列图表 + 独立横滑数据表，确保触控热区与表头零错位。",
      },
      {
        code: "03 · 原型验证",
        title: "用真实代码原型验证联动手感",
        desc: "直接在上方交互工作台中还原筛选、周期与剔除逻辑，前置对齐研发实现细节。",
      },
    ],
  },

  {
    slug: "profile-settings",
    indexLabel: "05",
    category: "存量架构治理",
    filterGroup: "b2b",
    badge: "新旧滑块 + 读写切换",
    title: "个人与系统设置重构",
    oneLiner: "拆解多年迭代堆叠的超长耦合表单，重建六维心智分组与读写分离秩序。",
    role: "项目负责人（全量体验走查 / 架构重组 / UIUX）",
    period: "2026.07 — 持续推进",
    coverSrc: `${ZXY}/covers/profile-settings-cover.svg`,
    accentFrom: "#4f46e5",
    accentTo: "#06b6d4",
    metrics: [
      { value: "6 大模块", label: "全量入口心智重组" },
      { value: "读写解耦", label: "解构高耦合超长表单" },
      { value: "规则前置", label: "补齐权限与校验边界" },
    ],
    studioMode: "compare",
    compareModules: [
      {
        id: "entry",
        label: "01 设置入口架构",
        title: "从底层设备清单，重组为用户任务分组",
        decision: "划分账号安全、消息提醒、设备能力与服务支持，消除无分组长列表的寻路迷茫。",
        beforeImg: `${ZXY}/profile-settings/old/account/settings-index.png`,
        afterImg: `${ZXY}/profile-settings/new/account/settings-index.png`,
        beforePain: "旧版：系统开关、认证、帮助平铺混杂，缺少视觉主次",
        afterGain: "新版：按使用频次与任务心智分卡归类，关键认证状态外显",
      },
      {
        id: "profile",
        label: "02 资料读写分离",
        title: "默认采用低噪只读视图，按需显式触发编辑（支持切换查看/编辑态）",
        decision: "重构旧版全量输入框平铺的高风险长表单，清晰界定系统只读字段与用户可编辑字段边界。",
        beforeImg: `${ZXY}/profile-settings/old/account/profile-long-form.png`,
        afterImg: `${ZXY}/profile-settings/new/account/profile-view.png`,
        editImg: `${ZXY}/profile-settings/new/account/profile-edit.png`,
        beforePain: "旧版：阅读与修改混杂，控件噪音极大且易误触改写",
        afterGain: "新版：阅读态与编辑态分离，企业锁定字段与可修改项层级分明",
      },
      {
        id: "reminder",
        label: "03 订单提醒聚焦",
        title: "单一任务降噪与开关组件统一",
        decision: "收敛标题说明、触发时间与保存反馈，沉淀同类通知设置的标准卡片模板。",
        beforeImg: `${ZXY}/profile-settings/old/reminders/order-reminder.png`,
        afterImg: `${ZXY}/profile-settings/new/reminders/order-reminder.png`,
        beforePain: "旧版：说明层级松散，开关与底部按钮样式不统一",
        afterGain: "新版：主开关置顶聚焦，时间规则联动清晰可复用",
      },
      {
        id: "org",
        label: "04 员工通讯录扫描",
        title: "搜索、部门分组与人员状态同屏高效定位",
        decision: "强化姓名、岗位与在职标签层级，为后续组织架构扩展预留弹性空间。",
        beforeImg: `${ZXY}/profile-settings/old/organization/staff-list.png`,
        afterImg: `${ZXY}/profile-settings/new/organization/contact-list.png`,
        beforePain: "旧版：信息密度失衡，部门归属与状态识别效率低",
        afterGain: "新版：高信噪比列表骨架，支持快速检索与跨部门浏览",
      },
    ],
    highlights: [
      {
        tag: "READ / WRITE SPLIT",
        title: "查看态与编辑态显性分离",
        caption: "基于高频查阅、低频修改的真实访问特征，默认只读视图大幅降低界面控件噪音并提升扫读效率。",
        image: `${ZXY}/profile-settings/new/account/profile-view.png`,
      },
      {
        tag: "COMPONENT UNIFICATION",
        title: "跨模块统一的设置组件语言",
        caption: "消除多年历史迭代遗留的多套开关、弹窗与色值分叉。",
        image: `${ZXY}/profile-settings/new/reminders/approval-reminder.png`,
      },
      {
        tag: "HIGH-DENSITY LIST",
        title: "高可读性的组织架构列表",
        caption: "兼顾百人团队快速检索与角色权限状态识别。",
        image: `${ZXY}/profile-settings/new/organization/contact-list.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 诊断方法",
        title: "先完成系统边界诊断，再推进界面视觉重构",
        desc: "对 20 余个存量页面开展系统性体验审计（功能边界模糊、信息层级失衡、校验规则缺失），确保架构重构精准解决核心问题。",
      },
      {
        code: "02 · 状态严谨",
        title: "把权限与校验规则前置到设计稿",
        desc: "明确管理员锁定态、起止日期冲突校验与异常回滚提示，大幅减少开发阶段返工追问。",
      },
      {
        code: "03 · 体系沉淀",
        title: "单点重构反哺全局设计系统",
        desc: "提炼出的表单、列表与提醒模板直接沉淀入团队 Figma 组件库，持续赋能后续模块。",
      },
    ],
  },

  {
    slug: "storefront-system",
    indexLabel: "06",
    category: "设计系统与低代码引擎",
    filterGroup: "b2b",
    featuredSpan: true,
    badge: "Container Query 契约",
    title: "双端店铺装修与容器组件体系",
    oneLiner:
      "构建三栏可视化低代码装修工作台，制定基于父容器宽度的五级自适应栅格契约（Container Query V2.0），打通双端高还原交付闭环。",
    role: "组件工程主设（低代码编排交互 / 容器断点规格 / 双端组件契约）",
    period: "2026.05 — 2026.08",
    coverSrc: `${ZXY}/storefront-system/01-pc-builder-manual.png`,
    accentFrom: "#4f46e5",
    accentTo: "#0ea5e9",
    metrics: [
      { value: "8 种分栏", label: "低代码骨架无缝嵌套" },
      { value: "5 级断点", label: "容器宽度精准映射" },
      { value: "92% 覆盖", label: "双端语义组件复用" },
    ],
    studioMode: "flow",
    tracks: [
      {
        id: "builder",
        tab: "双端低代码装修引擎",
        device: "desktop",
        steps: [
          {
            label: "手工选品与脏数据自愈",
            title: "左骨架组件库 · 中实时画布 · 右属性面板三栏协同",
            decision:
              "支持 100% 通栏、1:1、3:1、1:2:1 等分栏自由嵌套；属性侧内置「自动识别并剔除停售商品」非阻断降级横幅，消除线上空白坏卡。",
            image: `${ZXY}/storefront-system/01-pc-builder-manual.png`,
            hotspots: [
              {
                x: 8,
                y: 22,
                title: "结构与业务组件解耦",
                detail:
                  "左侧先定布局骨架（分栏比例），再拖入营销橱窗或财务/工单数据看板，心智层次清晰。",
              },
              {
                x: 88,
                y: 34,
                title: "停售异常自动剔除自愈",
                detail:
                  "当底层 ERP 商品状态变更为停售时，配置面板主动拦截并提示已清理数量，无需人工逐个排查。",
              },
            ],
          },
          {
            label: "动态标签规则圈选",
            title: "从静态人工维护，升级为布尔规则动态商品池",
            decision:
              "支持按「新品 / 促销 / 常购」等多标签「或（OR）」逻辑组合自动圈品，商户上新后前台橱窗零人工介入实时刷新。",
            image: `${ZXY}/storefront-system/02-pc-builder-tag.png`,
            hotspots: [
              {
                x: 89,
                y: 31,
                title: "手工 vs 标签双模切换",
                detail:
                  "兼顾精细化主推坑位（手工排序置顶）与大规模日常运营（标签规则自动流转）两类场景。",
              },
            ],
          },
          {
            label: "移动端同源配置器",
            title: "一套语义化 Schema 驱动 Web 与移动端双端装修",
            decision:
              "左侧控制模块显隐与拖拽排序，中间真机视口实时联动分组页签（推荐 / 常购 / 热销），右侧复用同一套标签与停售自愈逻辑。",
            image: `${ZXY}/storefront-system/06-mobile-builder.png`,
          },
          {
            label: "采购端多维选品弹窗",
            title: "高密度 B2B 订货橱窗的消费态落地",
            decision:
              "统一编码、规格、批发价与收藏热区排布，支持编码/名称/条形码聚合检索，直接承接后台装修配置输出。",
            image: `${ZXY}/storefront-system/03-pc-product-modal.png`,
          },
        ],
      },
      {
        id: "container-query",
        tab: "Container Query 栅格契约",
        device: "desktop",
        steps: [
          {
            label: "容器断点规格 V2.0",
            title: "以父容器栏宽替代视口宽度，终结多分栏嵌套变形",
            decision:
              "严格定义 Zone 1~Zone 5 五段容器区间（280px~1500px）与 8 种分栏骨架的列数映射公式，作为前后端联调唯一标尺。",
            image: `${ZXY}/storefront-system/07-container-spec-v2.svg`,
            hotspots: [
              {
                x: 52,
                y: 25,
                title: "五级容器断点轴线",
                detail:
                  "锁定单卡最小可读宽度 ≥ 200px、统一间距 12px，无论组件被拖入主栏还是窄侧栏均自动匹配最佳列数。",
              },
              {
                x: 45,
                y: 66,
                title: "8 种骨架零歧义映射表",
                detail:
                  "直接向前端输出精确到像素的栏宽与列数契约（如 1:1 分栏 744px → 3 列 227px/张），消除还原走查争议。",
              },
            ],
          },
          {
            label: "横向卡片 4 档重排",
            title: "横向商品卡在通栏、双栏与极窄侧栏下的弹性降维",
            decision:
              "从 1500px 3 列舒展态平滑过渡至 380px 以下单列紧凑态，低于 180px 自动触发横向滚动兜底，确保编码与价格永不截断错位。",
            image: `${ZXY}/storefront-system/04-container-horizontal.png`,
          },
          {
            label: "纵向卡片 5 档与空图兜底",
            title: "覆盖 5 列至 1 列全梯度响应及缺图占位容错",
            decision:
              "针对 B2B 海量长尾工业品常缺实拍图的现状，内置标准化无图占位骨架与两行标题截断规则，严守整行基线对齐。",
            image: `${ZXY}/storefront-system/05-container-vertical.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "ENGINEERING CONTRACT · 容器级响应式标准",
        title: "商品卡片网格 · Container Query 断点区间映射契约 V2.0",
        caption:
          "将设计直觉量化为前端可直接编码实现的 5 级容器区间与 8 种分栏映射矩阵，从根源上解决低代码画布任意拖拽后的排版崩坏问题。",
        image: `${ZXY}/storefront-system/07-container-spec-v2.svg`,
        wide: true,
      },
      {
        tag: "FAULT-TOLERANT CONFIG",
        title: "停售商品自动巡检剔除与双模选品",
        caption:
          "把 ERP 库存生命周期变更前置到装修配置侧自动消化，兼顾运营效率与线上商城零死链体验。",
        image: `${ZXY}/storefront-system/01-pc-builder-manual.png`,
      },
      {
        tag: "EDGE-CASE MATRIX",
        title: "纵向与横向双形态全断点压力验证",
        caption:
          "完整覆盖长标题折行、无商品主图、极窄侧翼栏等真实企业采购边缘数据场景。",
        image: `${ZXY}/storefront-system/05-container-vertical.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · 工程契约",
        title: "组件响应式必须绑定“父容器”而非“屏幕”",
        desc: "在低代码可嵌套场景下，传统 Media Query 必然失效；建立 Container Query 区间映射表后，前端仅凭一套 CSS 容器规则即可通吃 8 种布局。",
      },
      {
        code: "02 · 异常自愈",
        title: "优秀配置工具能主动消化上下游脏数据",
        desc: "通过「停售商品自动识别清理」与「无图占位骨架」，避免后台 ERP 主数据变动直接传导为前台采购端的报错或破版。",
      },
      {
        code: "03 · 双端同构",
        title: "配置心智同源，渲染形态按端适配",
        desc: "Web 与移动端共享同一套选品 Schema 与标签布尔规则，大幅降低商户学习成本并支撑团队 92% 双端组件复用率。",
      },
    ],
  },

  {
    slug: "wms-fulfillment",
    indexLabel: "07",
    category: "供应链履约与状态机",
    filterGroup: "b2b",
    featuredSpan: true,
    badge: "OOUX 视角反转",
    title: "WMS 仓储履约全链路重构",
    oneLiner:
      "运用 OOUX 将集货作业从“逐单翻找”反转为“商品主视角统分”，贯通 PDA 限流领单、多批次效期拆零、双视角封箱与跨单集货状态机闭环。",
    role: "供应链体验主设（仓内动线走查 / OOUX 领域建模 / PDA 高频交互重构）",
    period: "2026.08 — 2026.10",
    coverSrc: `${ZXY}/covers/wms-fulfillment-cover.svg`,
    accentFrom: "#2563eb",
    accentTo: "#14b8a6",
    metrics: [
      { value: "视角反转", label: "商品主分配 · 订单辅核验" },
      { value: "3 级单位", label: "箱/袋/瓶同源步进契约" },
      { value: "4 大环节", label: "领单→拣货→装箱→集货" },
    ],
    studioMode: "flow",
    tracks: [
      {
        id: "consolidate",
        tab: "OOUX 集货分单与合并",
        device: "mobile",
        steps: [
          {
            label: "双轨集货任务池",
            title: "进度条外显 +「集货分单 / 集货合并」双轨清晰分流",
            decision:
              "将库位号、关联拣货单与商品/拣货单处理进度条置顶呈现，以蓝/青语义标签一眼区分“一批商品分多单”与“多拣货单合一单”两类作业。",
            image: `${ZXY}/wms-fulfillment/06-consolidate-list.png`,
            hotspots: [
              {
                x: 83,
                y: 27,
                title: "作业类型显性分流",
                detail:
                  "在列表层即明确标识「集货分单」与「集货合并」，让仓内作业员在走动前预判拿取容器策略。",
              },
              {
                x: 52,
                y: 33,
                title: "可视化配齐进度条",
                detail:
                  "直观呈现 8/12 种、11/12 个实时完成度，优先推进临近尾声的待发运波次。",
              },
            ],
          },
          {
            label: "商品主视角跨单统分",
            title: "OOUX 核心重构：以商品为主操作对象，一次分完关联多单",
            decision:
              "颠覆旧版“点进订单 A 分 3 瓶 → 退出 → 点进订单 B 分 3 瓶”的折返路径；同屏汇聚总需求(10)、实集(8)、缺口(2)与门店分配策略。",
            image: `${ZXY}/wms-fulfillment/07-consolidate-distribute.png`,
            hotspots: [
              {
                x: 76,
                y: 39,
                title: "需求 / 实集 / 缺口三栏看板",
                detail:
                  "缺口数量以高对比警示色实时计算，从源头阻断超分与漏分冲突。",
              },
              {
                x: 58,
                y: 88,
                title: "一键策略预填 + 自动下一项",
                detail:
                  "支持「按先到先得」或「按比例」自动填充各门店分配数，确认后自动切入下一待分品项。",
              },
            ],
          },
          {
            label: "品项状态与缺货抽屉",
            title: "不脱离当前作业流，原位拉起「全部 / 未处理 / 已处理」核查",
            decision:
              "底部轻抽屉集中暴露缺货差额（如缺 2 瓶）与处理状态，消除深层页面跳转带来的上下文迷失。",
            image: `${ZXY}/wms-fulfillment/08-consolidate-drawer.png`,
          },
          {
            label: "跨区拣货单合流",
            title: "面向多温区并行拣货的「集货合并」容器状态机",
            decision:
              "按 A/B/C 库区货架容器逐单确认，已核验容器自动切换为「已确认」并解锁「装箱」入口，防止未齐套错发。",
            image: `${ZXY}/wms-fulfillment/09-consolidate-merge.png`,
          },
          {
            label: "货架容器明细核对",
            title: "单拣货容器原位清点与缺货异常留痕",
            decision:
              "聚焦当前周转箱（如 PK-1031-05）展示货架来源与差异数量，单手大热区一键确认。",
            image: `${ZXY}/wms-fulfillment/10-consolidate-check.png`,
          },
        ],
      },
      {
        id: "pick-pack",
        tab: "PDA 拣货与双模装箱",
        device: "mobile",
        steps: [
          {
            label: "限流领单与防误触",
            title: "基于仓内负载均衡的规则限流与滑动领单",
            decision:
              "顶部外显总池任务数与当前权限可领上限（24 单中可领 8 单），单卡采用防误触滑动领取与「一单一拣」标签提示。",
            image: `${ZXY}/wms-fulfillment/01-pick-claim.png`,
          },
          {
            label: "多级计量单位拆零",
            title: "整箱 · 中袋 · 散瓶三级步进器同屏精准录入",
            decision:
              "针对快消商贸复杂包装换算痛点，将三级单位纵向对齐并联动总待拣数，该组件同步复用于 DMS 调拨单模块。",
            image: `${ZXY}/wms-fulfillment/02-pick-multiunit.png`,
            hotspots: [
              {
                x: 76,
                y: 48,
                title: "多级包装防算错组件",
                detail:
                  "无需仓管员心算箱规折合率，按实物整箱、中袋、散瓶直填即可自动汇总校验。",
              },
            ],
          },
          {
            label: "FEFO 多批次溯源",
            title: "同库位多效期批次（LOT）显性并列核验",
            decision:
              "拣货卡直接外显各批次号与对应单位数量（LOT2080 / LOT20），严守食品医药先进先出（FEFO）合规红线。",
            image: `${ZXY}/wms-fulfillment/03-pick-lot-batch.png`,
          },
          {
            label: "按商品维度装箱",
            title: "边拣边装：面向装入动作的「按商品」视图",
            decision:
              "锁定当前开启箱号（1 号箱装箱中），逐品输入装入袋数并一键封箱，贴合单手手持 PDA 投箱节奏。",
            image: `${ZXY}/wms-fulfillment/04-pack-by-sku.png`,
          },
          {
            label: "按箱号拆分与打单",
            title: "面向封箱复核与城配交接的「按箱号」视图",
            decision:
              "左侧箱号导航轨联动右侧箱内明细，顶部集中提供逐箱蓝牙面单「打印」与超重「拆分」能力，形成物理履约闭环。",
            image: `${ZXY}/wms-fulfillment/05-pack-by-box.png`,
          },
        ],
      },
    ],
    highlights: [
      {
        tag: "OOUX STATE ARCHITECTURE · 业务建模壁垒",
        title: "集货作业视角反转架构图：以商品分配为主、订单核对为辅",
        caption:
          "完整拆解「集货分单（1 批商品 → N 张订单）」与「集货合并（M 张拣货单 → 1 张订单）」双轨状态流转及异常缺口拦截机制。",
        image: `${ZXY}/wms-fulfillment/11-ooux-architecture.svg`,
        wide: true,
      },
      {
        tag: "PERSPECTIVE INVERSION",
        title: "跨单统分与策略预填工作面",
        caption:
          "将分散在十余张门店单据里的同一 SKU 聚拢至单屏完成分配，单品跨单分货路径缩短约 60%。",
        image: `${ZXY}/wms-fulfillment/07-consolidate-distribute.png`,
      },
      {
        tag: "DUAL-VIEW PACKING",
        title: "「按商品装入」与「按箱号拆打」双视角切换",
        caption:
          "同一物理装箱流程在不同阶段需要完全不同的主键视角：装入时看商品，封箱打印与超重拆箱时看箱号。",
        image: `${ZXY}/wms-fulfillment/05-pack-by-box.png`,
      },
    ],
    takeaways: [
      {
        code: "01 · OOUX 反转",
        title: "选对主操作对象，比局部美化按钮有效十倍",
        desc: "当业务本质是“把刚拣回的一车货分给多家门店”时，强迫用户按订单进入就是逆人因设计；反转为商品主视角后，认知与点击成本迎刃而解。",
      },
      {
        code: "02 · 现场人因",
        title: "为走动、单手与高频扫码的真实仓库环境设计",
        desc: "引入底部固定大热区、策略一键预填、「自动下一项」连贯跳转与原位轻抽屉，最大限度减少仓管员在货架间的低头点按次数。",
      },
      {
        code: "03 · 跨端资产",
        title: "提炼多级计量单位与批次核验的供应链原子组件",
        desc: "将「箱/袋/瓶多级步进器」与「效期批次胶囊」抽象为标准业务组件，无缝横向复用至 DMS 调拨单与盘点模块。",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

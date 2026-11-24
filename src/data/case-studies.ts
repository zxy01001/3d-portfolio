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
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

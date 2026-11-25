import {
  InteractiveCompareShowcase,
  InteractiveFlowShowcase,
} from "@/components/case-showcase";
import { ReactNode } from "react";

const ZXY_PATH = "/assets/zxy";

export type ProjectFilterGroup = "all" | "ai" | "b2b";

export type Project = {
  id: string;
  indexLabel: string;
  category: string;
  filterGroup: Exclude<ProjectFilterGroup, "all">;
  featuredSpan?: boolean;
  badge: string;
  title: string;
  oneLiner: string;
  metrics: string[];
  src: string;
  live: string;
  liveLabel: string;
  content: ReactNode;
};

const projects: Project[] = [
  {
    id: "agent-platform",
    indexLabel: "01",
    category: "企业 AI 中台",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "0→1 已上线",
    title: "企业智能体工作台",
    oneLiner: "零代码管理海量 Agent 与复杂客户诊断规则编排",
    metrics: ["0→1 商业化上线", "双核心链路闭环", "配置与沙盒同屏"],
    src: `${ZXY_PATH}/agent-platform/library/library-overview.png`,
    live: "/projects/agent-platform",
    liveLabel: "审阅完整案例研究",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "library",
            tab: "智能体资产库",
            steps: [
              {
                label: "分组总览",
                image: `${ZXY_PATH}/agent-platform/library/library-overview.png`,
                note: "文件夹与单个智能体共享一套卡片栅格，用数量与类型色标降低扫描成本",
              },
              {
                label: "卡片操作",
                image: `${ZXY_PATH}/agent-platform/library/group-card.png`,
                note: "固定图标、描述与更多操作热区，保持不同资产类型的浏览一致性",
              },
              {
                label: "批量选择",
                image: `${ZXY_PATH}/agent-platform/library/library-selection.png`,
                note: "应对企业级大规模智能体维护，支持多选与快捷批量调度",
              },
              {
                label: "移动归类",
                image: `${ZXY_PATH}/agent-platform/library/move-item.png`,
                note: "轻量弹窗目录树归类，不打断当前列表浏览上下文",
              },
            ],
          },
          {
            id: "diagnosis",
            tab: "客户诊断编排",
            steps: [
              {
                label: "配置与实时预览",
                image: `${ZXY_PATH}/agent-platform/diagnosis/overview.png`,
                note: "左配置参数、右真实对话沙盒同屏并置，修改规则即时可见",
              },
              {
                label: "条件树构造",
                image: `${ZXY_PATH}/agent-platform/diagnosis/scope-rules.png`,
                note: "左侧业务分类树 + 右侧 AND/OR 条件组，化解多层逻辑嵌套门槛",
              },
              {
                label: "洞察维度",
                image: `${ZXY_PATH}/agent-platform/diagnosis/dimension-config.png`,
                note: "把底层模型变量翻译为订单、行为等业务人员熟悉的分析维度",
              },
              {
                label: "结论映射",
                image: `${ZXY_PATH}/agent-platform/diagnosis/conclusion-config.png`,
                note: "将诊断结果、风险等级色与跟进建议绑定为确定性输出",
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · OBJECT ORDER",
            title: "同构卡片骨架",
            desc: "统一文件夹与智能体视觉结构，支撑百级 Agent 规模化检索与归类。",
          },
          {
            tag: "02 · PROGRESSIVE",
            title: "四步渐进式编排",
            desc: "按「维度→范围→结论→调试」隐藏底层复杂度，实现业务零代码上手。",
          },
          {
            tag: "03 · ZERO JUMP",
            title: "配置与沙盒同屏",
            desc: "消除保存后再跳页测试的割裂感，在单工作区内完成验证闭环。",
          },
        ]}
      />
    ),
  },
  {
    id: "voice-order",
    indexLabel: "02",
    category: "AI 多模态交互",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "准确率 80%+",
    title: "智能语音抄单助手",
    oneLiner: "支持多模态自然语言批量录单，通过分层核对机制收敛识别不确定性",
    metrics: ["下单准确率 80%+", "日活企业 10+", "全异常分支兜底"],
    src: `${ZXY_PATH}/covers/voice-order-cover.svg`,
    live: "/projects/voice-order",
    liveLabel: "审阅完整案例研究",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "main",
            tab: "语音与粘贴下单流",
            steps: [
              {
                label: "唤起助手",
                image: `${ZXY_PATH}/voice-order/02-voice-assistant.png`,
                note: "提供自然语言示例引导，降低首次使用的表达门槛",
                isMobile: true,
              },
              {
                label: "实时收音转写",
                image: `${ZXY_PATH}/voice-order/04-recording-live-1.png`,
                note: "声波反馈与文字流实时上屏，让用户随时确认收音准确度",
                isMobile: true,
              },
              {
                label: "文本一键粘贴",
                image: `${ZXY_PATH}/voice-order/06-text-paste.png`,
                note: "兼容微信采购清单直接粘贴解析，贴合批发业务员高频场景",
                isMobile: true,
              },
              {
                label: "结构化核对",
                image: `${ZXY_PATH}/voice-order/09-match-result.png`,
                note: "按「原始输入 → 提取词项 → 匹配商品」分层呈现，避免黑盒自动提交导致的错单风险",
                isMobile: true,
              },
              {
                label: "相近候选切换",
                image: `${ZXY_PATH}/voice-order/10-match-expanded.png`,
                note: "一键展开同名不同规格候选品，纠错成本远低于重新搜索",
                isMobile: true,
              },
            ],
          },
          {
            id: "edge",
            tab: "容错与完成态",
            steps: [
              {
                label: "未识别需求兜底",
                image: `${ZXY_PATH}/voice-order/15-empty-unrecognized.png`,
                note: "未提取到有效商品实体时提供结构化输入范例与重试入口，消除阻断式报错",
                isMobile: true,
              },
              {
                label: "未命中库存引导",
                image: `${ZXY_PATH}/voice-order/16-empty-unmatched.png`,
                note: "明确告知解析成功但库内无匹配项，引导无缝转入人工搜品补录",
                isMobile: true,
              },
              {
                label: "提交成单",
                image: `${ZXY_PATH}/voice-order/13-order-success.png`,
                note: "核对无误后批量写入正式订货单，单据生成效率大幅提升",
                isMobile: true,
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · AI TRUST",
            title: "可解释的四层卡片",
            desc: "原文、关键词、首选品与候选品逐层对应，建立人机核对信任感。",
          },
          {
            tag: "02 · DUAL INPUT",
            title: "语音 + 文本双模态",
            desc: "同时覆盖仓库走动口述与微信文字转抄两大真实订货场景。",
          },
          {
            tag: "03 · RECOVERY",
            title: "全分支异常恢复机制",
            desc: "明确区分“意图未识别”与“库存无匹配”两类异常状态，构建最短恢复路径。",
          },
        ]}
      />
    ),
  },
  {
    id: "sales-coaching",
    indexLabel: "03",
    category: "跨端 AI 陪练",
    filterGroup: "ai",
    badge: "Web + Mobile 闭环",
    title: "AI 销售陪练系统",
    oneLiner: "贯通管理者三步配课与一线销售拟真对练、逐句复盘闭环",
    metrics: ["Web + 移动双端", "3 步向导配课", "证据化评分回溯"],
    src: `${ZXY_PATH}/sales-coaching/04-scene-setup.png`,
    live: "/projects/sales-coaching",
    liveLabel: "审阅完整案例研究",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "web",
            tab: "Web 管理配置端",
            steps: [
              {
                label: "定知识材料",
                image: `${ZXY_PATH}/sales-coaching/01-knowledge-step.png`,
                note: "第一步聚焦训练素材导入，通过三步向导降低五类对象的耦合复杂度",
              },
              {
                label: "AI 萃取考点",
                image: `${ZXY_PATH}/sales-coaching/03-knowledge-ready.png`,
                note: "显性化解析进度与生成结果，支持管理员上线前人工校对微调",
              },
              {
                label: "配客户场景",
                image: `${ZXY_PATH}/sales-coaching/04-scene-setup.png`,
                note: "结构化配置虚拟客户画像、核心异议场景与考核目标",
              },
              {
                label: "设评分标准",
                image: `${ZXY_PATH}/sales-coaching/07-score-rules.png`,
                note: "按维度拆解权重与得分点，确保移动端 AI 判分有据可依",
              },
              {
                label: "任务数据看板",
                image: `${ZXY_PATH}/sales-coaching/15-task-overview.png`,
                note: "发布后追踪团队完训率与薄弱维度，形成管理闭环",
              },
            ],
          },
          {
            id: "mobile",
            tab: "Mobile 销售练习端",
            steps: [
              {
                label: "待练任务列表",
                image: `${ZXY_PATH}/sales-coaching/mobile/01-task-list.png`,
                note: "清晰区分待完成、练习中与已结束状态，直达核心动作",
                isMobile: true,
              },
              {
                label: "拟真对话演练",
                image: `${ZXY_PATH}/sales-coaching/mobile/07-practice-chat.png`,
                note: "还原真实客户抗拒点，提供低压力的沉浸式实战环境",
                isMobile: true,
              },
              {
                label: "按住语音应答",
                image: `${ZXY_PATH}/sales-coaching/mobile/08-practice-voice.png`,
                note: "适配单手移动场景的语音输入热区与实时应答策略辅助",
                isMobile: true,
              },
              {
                label: "多维评分复盘",
                image: `${ZXY_PATH}/sales-coaching/mobile/12-result-overview.png`,
                note: "评分结果直接映射至原始对话录音节点，实现有据可查的闭环复盘",
                isMobile: true,
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · ENTITY FLOW",
            title: "三步向导收敛复杂度",
            desc: "将知识、角色、场景、评分、成员五大实体梳理为线性确定路径。",
          },
          {
            tag: "02 · CROSS-END",
            title: "双端体验同源映射",
            desc: "后台配置的每一项权重，均精准映射为移动端的练习目标与复盘卡片。",
          },
          {
            tag: "03 · EXPLAINABLE",
            title: "证据化 AI 判分",
            desc: "摒弃单一结果分值呈现，支持由扣分维度直接回溯原始对话上下文。",
          },
        ]}
      />
    ),
  },
  {
    id: "business-overview",
    indexLabel: "04",
    category: "BI 决策工作台",
    filterGroup: "b2b",
    badge: "含联动数据原型",
    title: "经营概览看板重设计",
    oneLiner: "围绕“看现状—找变化—做比较—查明细”重构高信噪比决策路径",
    metrics: ["4 步阅读动线", "Web/移动响应式重排", "可点击代码原型"],
    src: `${ZXY_PATH}/business-overview/dashboard-full.png`,
    live: "/projects/business-overview",
    liveLabel: "审阅交互看板方案",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "bi",
            tab: "数据阅读与交互状态",
            steps: [
              {
                label: "首屏默认态",
                image: `${ZXY_PATH}/business-overview/chart-default.png`,
                note: "筛选器、核心指标卡与主趋势图建立稳定视觉动线，抑制数字噪音",
              },
              {
                label: "选中高亮对比",
                image: `${ZXY_PATH}/business-overview/chart-selected.png`,
                note: "点击图例柔和聚焦单一对象，同时保留其余系列作为参照基准",
              },
              {
                label: "排行下钻态",
                image: `${ZXY_PATH}/business-overview/chart-scrolled.png`,
                note: "左列视觉趋势 + 右列精确数值排行协同，支持剔除极值追查原因",
              },
              {
                label: "完整看板架构",
                image: `${ZXY_PATH}/business-overview/dashboard-full.png`,
                note: "围绕销售、资金、采购三大核心经营域统筹布局，解决多源报表碎片化问题",
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · READING PATH",
            title: "指标卡即趋势开关",
            desc: "点击顶部 KPI 直接联动下方趋势图，消除多张相似折线图重复堆叠。",
          },
          {
            tag: "02 · DUAL VIEW",
            title: "左图形 · 右精确表",
            desc: "兼顾管理者的宏观波动直觉与财务级的精确数值比对需求。",
          },
          {
            tag: "03 · ADAPTIVE",
            title: "移动端按优先级重排",
            desc: "窄屏重构为横向指标流、单列图表与独立横滑数据表，避免简单等比缩放导致的可读性劣化。",
          },
        ]}
      />
    ),
  },
  {
    id: "profile-settings",
    indexLabel: "05",
    category: "存量架构治理",
    filterGroup: "b2b",
    badge: "Before / After 对比",
    title: "个人与系统设置重构",
    oneLiner: "拆解历史堆叠超长表单，建立六维心智分组与查看/编辑态解耦",
    metrics: ["6 大职能模块重组", "读写状态分离", "新旧双屏/滑块对比"],
    src: `${ZXY_PATH}/covers/profile-settings-cover.svg`,
    live: "/projects/profile-settings",
    liveLabel: "审阅重构对比方案",
    content: (
      <InteractiveCompareShowcase
        pairs={[
          {
            label: "1. 设置入口架构",
            beforeImg: `${ZXY_PATH}/profile-settings/old/account/settings-index.png`,
            afterImg: `${ZXY_PATH}/profile-settings/new/account/settings-index.png`,
            note: "从设备能力与账号信息混杂的长清单，重组为符合用户心智的分层卡片",
          },
          {
            label: "2. 个人资料读写分离",
            beforeImg: `${ZXY_PATH}/profile-settings/old/account/profile-long-form.png`,
            afterImg: `${ZXY_PATH}/profile-settings/new/account/profile-view.png`,
            note: "解耦高频查阅态与低频修改态：默认采用低噪只读视图，按需显式触发编辑",
          },
          {
            label: "3. 自动订单提醒",
            beforeImg: `${ZXY_PATH}/profile-settings/old/reminders/order-reminder.png`,
            afterImg: `${ZXY_PATH}/profile-settings/new/reminders/order-reminder.png`,
            note: "剔除无关干扰信息，统一开关、触发时间与底部保存动作的组件规范",
          },
          {
            label: "4. 组织员工通讯录",
            beforeImg: `${ZXY_PATH}/profile-settings/old/organization/staff-list.png`,
            afterImg: `${ZXY_PATH}/profile-settings/new/organization/contact-list.png`,
            note: "强化姓名、部门与在职状态主次层级，搜索与分组同屏高效定位",
          },
        ]}
        decisions={[
          {
            tag: "01 · IA GROUPING",
            title: "六维任务心智分组",
            desc: "厘清账户、认证、提醒、设备、组织与工单边界，大幅降低寻路成本。",
          },
          {
            tag: "02 · STATE SPLIT",
            title: "读写状态显性分离",
            desc: "解耦信息查阅态与表单编辑态，明确系统锁定字段边界，有效规避误触修改风险。",
          },
          {
            tag: "03 · GOVERNANCE",
            title: "沉淀通用设置规范",
            desc: "统一列表、开关与校验反馈，将单次改版转化为跨模块复用的设计资产。",
          },
        ]}
      />
    ),
  },
  {
    id: "storefront-system",
    indexLabel: "06",
    category: "设计系统与低代码引擎",
    filterGroup: "b2b",
    featuredSpan: true,
    badge: "Container Query 契约",
    title: "双端店铺装修与容器组件体系",
    oneLiner: "三栏可视化低代码装修工作台与五级父容器自适应栅格工程契约",
    metrics: ["8 种分栏骨架适配", "5 级容器断点契约", "停售脏数据自愈"],
    src: `${ZXY_PATH}/storefront-system/01-pc-builder-manual.png`,
    live: "/projects/storefront-system",
    liveLabel: "审阅组件工程契约",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "builder",
            tab: "双端低代码装修引擎",
            steps: [
              {
                label: "手工选品与停售自愈",
                image: `${ZXY_PATH}/storefront-system/01-pc-builder-manual.png`,
                note: "左布局骨架、中实时画布、右属性配置三栏联动，内置停售商品自动识别剔除横幅",
              },
              {
                label: "动态标签规则圈选",
                image: `${ZXY_PATH}/storefront-system/02-pc-builder-tag.png`,
                note: "支持多标签布尔「或」逻辑动态圈品，新品上架后前台橱窗零人工维护自动更新",
              },
              {
                label: "移动端同源装修器",
                image: `${ZXY_PATH}/storefront-system/06-mobile-builder.png`,
                note: "复用同一套选品与异常清理 Schema，真机视口实时预览多分组页签切换效果",
              },
              {
                label: "采购端选品弹窗",
                image: `${ZXY_PATH}/storefront-system/03-pc-product-modal.png`,
                note: "承接装修引擎输出的 B2B 高密度订货橱窗，支持编码、名称与条形码聚合检索",
              },
            ],
          },
          {
            id: "container",
            tab: "容器级响应式契约",
            steps: [
              {
                label: "断点区间规格 V2.0",
                image: `${ZXY_PATH}/storefront-system/07-container-spec-v2.svg`,
                note: "基于父容器栏宽（280px~1500px）定义 5 大区间与 8 种分栏列数映射公式",
              },
              {
                label: "横向卡片 4 档重排",
                image: `${ZXY_PATH}/storefront-system/04-container-horizontal.png`,
                note: "从 1500px 通栏 3 列平滑收敛至窄侧栏 1 列与极窄横滑兜底，编码价格零截断",
              },
              {
                label: "纵向卡片与空图兜底",
                image: `${ZXY_PATH}/storefront-system/05-container-vertical.png`,
                note: "完整覆盖 5 列至 1 列梯度及 B2B 长尾商品无主图占位态，保持整行基线严整",
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · CONTAINER QUERY",
            title: "父容器断点替代视口断点",
            desc: "将 8 种低代码分栏骨架精确映射为 5 级容器区间，任意嵌套拖拽均不破版。",
          },
          {
            tag: "02 · SELF-HEALING",
            title: "停售脏数据自动巡检",
            desc: "在配置面板主动拦截并剔除 ERP 已停售 SKU，杜绝线上空窗与死链。",
          },
          {
            tag: "03 · DUAL SCHEMA",
            title: "双端同源 Schema 复用",
            desc: "Web 与移动端共享手工/标签双模选品逻辑，支撑 92% 组件库覆盖率。",
          },
        ]}
      />
    ),
  },
  {
    id: "wms-fulfillment",
    indexLabel: "07",
    category: "供应链履约与状态机",
    filterGroup: "b2b",
    featuredSpan: true,
    badge: "OOUX 视角反转",
    title: "WMS 仓储履约全链路重构",
    oneLiner: "以“商品主分配、订单辅核验”重构跨单集货，打通拣货·拆零·封箱闭环",
    metrics: ["OOUX 操作对象反转", "箱/袋/瓶三级拆零", "双视角分箱打单"],
    src: `${ZXY_PATH}/covers/wms-fulfillment-cover.svg`,
    live: "/projects/wms-fulfillment",
    liveLabel: "审阅状态机与交互方案",
    content: (
      <InteractiveFlowShowcase
        groups={[
          {
            id: "consolidate",
            tab: "OOUX 集货分单与合并",
            steps: [
              {
                label: "双轨集货架构图",
                image: `${ZXY_PATH}/wms-fulfillment/11-ooux-architecture.svg`,
                note: "拆解「1批商品→N张订单（分单）」与「M张拣货单→1张订单（合并）」双轨状态机",
              },
              {
                label: "集货任务池分流",
                image: `${ZXY_PATH}/wms-fulfillment/06-consolidate-list.png`,
                note: "外显库位号、实时配齐进度条与分单/合并语义色标，辅助现场快速决策",
                isMobile: true,
              },
              {
                label: "商品主视角统分",
                image: `${ZXY_PATH}/wms-fulfillment/07-consolidate-distribute.png`,
                note: "同屏聚合总需求、实集与缺口预警，支持按先到先得或按比例一键预填多单",
                isMobile: true,
              },
              {
                label: "品项缺货轻抽屉",
                image: `${ZXY_PATH}/wms-fulfillment/08-consolidate-drawer.png`,
                note: "原位切换全部/未处理/已处理视图，高亮缺货差额，零跳页损耗",
                isMobile: true,
              },
              {
                label: "跨区拣货单合流",
                image: `${ZXY_PATH}/wms-fulfillment/09-consolidate-merge.png`,
                note: "按库区货架容器逐一核验合流，确认后原地解锁装箱动作",
                isMobile: true,
              },
            ],
          },
          {
            id: "pick-pack",
            tab: "PDA 拣货与双模装箱",
            steps: [
              {
                label: "规则限流领单",
                image: `${ZXY_PATH}/wms-fulfillment/01-pick-claim.png`,
                note: "明确展示总任务池与可领配额上限，滑动领单防止仓内走动误触",
                isMobile: true,
              },
              {
                label: "三级计量单位拆零",
                image: `${ZXY_PATH}/wms-fulfillment/02-pick-multiunit.png`,
                note: "整箱、中袋、散瓶三级步进器直观录入，免除复杂箱规心算",
                isMobile: true,
              },
              {
                label: "多效期批次核验",
                image: `${ZXY_PATH}/wms-fulfillment/03-pick-lot-batch.png`,
                note: "外显同库位多 LOT 批次明细，保障商贸快消效期先出（FEFO）合规",
                isMobile: true,
              },
              {
                label: "按商品装入封箱",
                image: `${ZXY_PATH}/wms-fulfillment/04-pack-by-sku.png`,
                note: "投箱阶段锁定当前箱号，按商品维度快速录入装入数并封箱",
                isMobile: true,
              },
              {
                label: "按箱号拆箱打印",
                image: `${ZXY_PATH}/wms-fulfillment/05-pack-by-box.png`,
                note: "复核阶段切换至左箱号轨+右箱内明细，支持单箱面单打印与超重拆分",
                isMobile: true,
              },
            ],
          },
        ]}
        decisions={[
          {
            tag: "01 · OOUX INVERSION",
            title: "商品主视角反转",
            desc: "将跨单分货从“逐单进出翻找”反转为“单品统分多单”，操作路径缩短约 60%。",
          },
          {
            tag: "02 · MULTI-UNIT",
            title: "多级包装与批次契约",
            desc: "沉淀箱/袋/瓶三级步进器与 LOT 批次胶囊，横向复用至 DMS 调拨单体系。",
          },
          {
            tag: "03 · DUAL PACKING",
            title: "装入与复核双模切换",
            desc: "装入看商品、封箱打单看箱号，精准匹配仓内物理履约两阶段心智。",
          },
        ]}
      />
    ),
  },
];

export default projects;

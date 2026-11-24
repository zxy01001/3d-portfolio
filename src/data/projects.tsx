import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const ZXY_PATH = "/assets/zxy";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const CaseStudyCTA = ({
  live,
  label = "打开完整交互案例页（含可操作原型）",
}: {
  live?: string;
  label?: string;
}) => {
  if (!live || live === "#") return null;
  return (
    <div className="my-5 flex flex-wrap items-center gap-3">
      <Link href={live} target="_blank" rel="noopener">
        <Button size="default" className="gap-2 rounded-full px-6 shadow-md">
          <Sparkles className="h-4 w-4" />
          {label}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

const MetaStrip = ({
  items,
}: {
  items: { label: string; value: string }[];
}) => (
  <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
    {items.map((item) => (
      <div
        key={item.label}
        className="rounded-xl border border-border bg-secondary/35 px-4 py-3"
      >
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {item.label}
        </div>
        <div className="mt-1 text-sm font-bold text-foreground">
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

const BulletGroup = ({ items }: { items: string[] }) => (
  <ul className="my-3 space-y-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const uxSkill = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/ux/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  figma: uxSkill("Figma", "figma.svg"),
  axure: uxSkill("Axure RP", "axure.svg"),
  protopie: uxSkill("ProtoPie", "protopie.svg"),
  ae: uxSkill("After Effects", "ae.svg"),
  htmlcss: uxSkill("HTML / CSS", "htmlcss.svg"),
  designSystem: uxSkill("设计系统", "designsystem.svg"),
  responsive: uxSkill("双端响应式", "responsive.svg"),
  aiUx: uxSkill("AI 产品体验", "aiux.svg"),
  codex: uxSkill("AI 交互原型", "codex.svg"),
  chatgpt: uxSkill("ChatGPT", "chatgpt.svg"),
  domain: uxSkill("复杂业务建模", "domain.svg"),
  ia: uxSkill("信息架构", "ia.svg"),
  state: uxSkill("状态与异常闭环", "state.svg"),
  research: uxSkill("需求拆解与调研", "research.svg"),
  dataviz: uxSkill("BI 数据看板", "dataviz.svg"),
  qa: uxSkill("PRD 与设计走查", "qa.svg"),
};

export type ProjectFilterGroup = "all" | "ai" | "business" | "system";

export type Project = {
  id: string;
  category: string;
  filterGroup: Exclude<ProjectFilterGroup, "all">;
  featuredSpan?: boolean;
  badge?: string;
  title: string;
  subtitle: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode;
  github?: string;
  live: string;
  liveLabel?: string;
};

const projects: Project[] = [
  {
    id: "agent-platform",
    category: "企业 AI 中台 · 0→1 上线",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "核心案例",
    title: "智能体库搭建",
    subtitle: "把模型、知识库与诊断规则转化为企业可理解、可配置的零代码工作台",
    src: `${ZXY_PATH}/agent-platform/library/library-overview.png`,
    screenshots: ["library-overview.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.aiUx,
        PROJECT_SKILLS.ia,
        PROJECT_SKILLS.domain,
        PROJECT_SKILLS.state,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.axure,
        PROJECT_SKILLS.codex,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/agent-platform.html",
    liveLabel: "进入智能体平台交互案例页",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            从智能体生命周期管理到客户诊断业务编排，将底层模型、Prompt、知识库与条件规则转化为业务人员<strong>零代码即可配置、调试与发布</strong>的企业级 AI 工作台。
          </p>

          <MetaStrip
            items={[
              { label: "项目类型", value: "企业 AI 中台（0 → 1）" },
              { label: "我的角色", value: "项目设计负责人" },
              { label: "项目周期", value: "2026.02 — 2026.04" },
              { label: "落地状态", value: "已正式上线 · 持续迭代" },
            ]}
          />

          <CaseStudyCTA live={this.live} label="打开完整交互案例页（支持模块切换预览）" />

          <TypographyH3 className="mt-6">01 · 核心设计挑战</TypographyH3>
          <BulletGroup
            items={[
              "规模化资产管理：随着企业智能体数量增长，需要支持自定义文件夹分组、搜索、批量选择与跨组移动归类。",
              "高复杂度规则表达：客户诊断涉及分类树、多维条件组及 AND / OR 逻辑嵌套，直接平铺参数极易迷失。",
              "配置与结果割裂：洞察维度、诊断结论与真实对话表现之间需要建立即时可验证的前后反馈关系。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/agent-platform/library/library-overview.png`,
              `${ZXY_PATH}/agent-platform/library/group-card.png`,
              `${ZXY_PATH}/agent-platform/library/library-selection.png`,
              `${ZXY_PATH}/agent-platform/library/move-item.png`,
            ]}
          />

          <TypographyH3 className="mt-6">02 · 关键架构与交互决策</TypographyH3>
          <BulletGroup
            items={[
              "统一对象卡片骨架：同一套卡片网格同时承载“分组文件夹”与“单个智能体”，用数量与类型标签保持一致的浏览节奏。",
              "四步渐进式披露：将复杂客户诊断拆解为「定义洞察维度 → 圈定客户范围 → 配置结论建议 → 预览与调试」四步稳定闭环。",
              "左配置 · 右实时预览：分类树、条件表单与真实对话预览保持同屏，无需离开当前上下文即可检验欢迎语与诊断路径。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/agent-platform/diagnosis/overview.png`,
              `${ZXY_PATH}/agent-platform/diagnosis/scope-rules.png`,
              `${ZXY_PATH}/agent-platform/diagnosis/dimension-config.png`,
              `${ZXY_PATH}/agent-platform/diagnosis/conclusion-config.png`,
            ]}
          />

          <TypographyH3 className="mt-6">03 · 上线验证与价值</TypographyH3>
          <BulletGroup
            items={[
              "2026 年 4 月完成从 0 到 1 产品化上线，补齐 AI 中台的智能体资产管理与业务编排能力。",
              "支持业务团队零代码自主完成多场景智能体的搭建、调试与发布。",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "voice-order",
    category: "AI 语音交互 · 准确率 80%+",
    filterGroup: "ai",
    featuredSpan: true,
    badge: "核心案例",
    title: "智能抄单助手",
    subtitle: "把自然语言多商品订货需求转化为可核对、可修正、可恢复的结构化订单",
    src: `${ZXY_PATH}/covers/voice-order-cover.svg`,
    screenshots: ["09-match-result.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.aiUx,
        PROJECT_SKILLS.state,
        PROJECT_SKILLS.ia,
        PROJECT_SKILLS.research,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.protopie,
        PROJECT_SKILLS.codex,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/voice-order.html",
    liveLabel: "体验语音下单完整交互流程",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            用“说清楚或粘贴一段订货需求”替代传统的“逐一搜索商品、选规格、填数量”，围绕<strong>效率、信任、容错</strong>三大原则处理 AI 识别的不确定性。
          </p>

          <MetaStrip
            items={[
              { label: "项目类型", value: "移动端 AI 效率工具" },
              { label: "我的角色", value: "项目设计负责人" },
              { label: "核心指标", value: "下单准确率 80%+" },
              { label: "线上表现", value: "日活企业 10+ 稳定运行" },
            ]}
          />

          <CaseStudyCTA live={this.live} label="打开完整交互案例页（体验分步下单流程）" />

          <TypographyH3 className="mt-6">01 · 关键交互判断：不替用户做黑盒决策</TypographyH3>
          <BulletGroup
            items={[
              "建立「语音/文本输入 → 实时识别 → 商品匹配 → 候选核对 → 提交下单」五步清晰反馈链路。",
              "分层呈现置信度：按“需求原文、解析关键词、首选匹配商品与候选展开”分层排布，支持一键切换相近规格商品。",
              "完整设计异常恢复分支：针对未识别出有效需求、未命中商品库存、全部取消等边缘状态提供明确原因说明与重试入口。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/voice-order/02-voice-assistant.png`,
              `${ZXY_PATH}/voice-order/04-recording-live-1.png`,
              `${ZXY_PATH}/voice-order/06-text-paste.png`,
              `${ZXY_PATH}/voice-order/07-matching-loading-1.png`,
              `${ZXY_PATH}/voice-order/09-match-result.png`,
              `${ZXY_PATH}/voice-order/10-match-expanded.png`,
            ]}
          />

          <TypographyH3 className="mt-6">02 · 异常边界与业务验证</TypographyH3>
          <BulletGroup
            items={[
              "覆盖未命中需求、未命中商品等真实长尾场景，避免用户卡死在空白报错页。",
              "上线后稳定服务 10+ 日活批发订货企业，多商品混合下单准确率达 80%+，显著降低人工抄单漏单与错单率。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/voice-order/15-empty-unrecognized.png`,
              `${ZXY_PATH}/voice-order/16-empty-unmatched.png`,
              `${ZXY_PATH}/voice-order/13-order-success.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "sales-coaching",
    category: "跨端 AI 陪练 · Web + Mobile",
    filterGroup: "ai",
    badge: "双端闭环",
    title: "AI 销售陪练系统",
    subtitle: "打通管理者 Web 任务配置端与销售人员移动端对练复盘的完整体验闭环",
    src: `${ZXY_PATH}/sales-coaching/04-scene-setup.png`,
    screenshots: ["04-scene-setup.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.aiUx,
        PROJECT_SKILLS.domain,
        PROJECT_SKILLS.state,
        PROJECT_SKILLS.responsive,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.axure,
        PROJECT_SKILLS.chatgpt,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/sales-coaching.html",
    liveLabel: "查看 Web + 移动端双端案例",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            同时服务“培训管理者（Web 配置端）”与“一线销售（移动端对练端）”两类角色，把知识材料、AI 陪练角色、对话情境与评分标准组织成可检查、可演练、可复盘的任务闭环。
          </p>

          <MetaStrip
            items={[
              { label: "项目类型", value: "跨端企业 AI 培训系统" },
              { label: "我的角色", value: "项目设计负责人" },
              { label: "项目周期", value: "2026.07 — 至今" },
              { label: "覆盖终端", value: "Web 配置端 + 移动练习端" },
            ]}
          />

          <CaseStudyCTA live={this.live} label="打开完整双端切换案例页" />

          <TypographyH3 className="mt-6">01 · Web 配置端：三步向导与 AI 生成核对</TypographyH3>
          <BulletGroup
            items={[
              "将散乱对象收敛为「定知识 → 配场景与角色 → 设评分并发任务」三步向导，每一步均有明确阶段产出。",
              "显性化 AI 生成状态：知识解析中、生成完成、角色微调与发布前完整性校验全链路可见可控。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/sales-coaching/01-knowledge-step.png`,
              `${ZXY_PATH}/sales-coaching/03-knowledge-ready.png`,
              `${ZXY_PATH}/sales-coaching/04-scene-setup.png`,
              `${ZXY_PATH}/sales-coaching/07-score-rules.png`,
              `${ZXY_PATH}/sales-coaching/11-ai-dialog.png`,
              `${ZXY_PATH}/sales-coaching/15-task-overview.png`,
            ]}
          />

          <TypographyH3 className="mt-6">02 · 移动练习端：语音对练与多维评分复盘</TypographyH3>
          <BulletGroup
            items={[
              "沿着同一条业务主线串联课前知识速览、AI 拟真语音对练、实时提示与课后评分逐句回溯。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/sales-coaching/mobile/01-task-list.png`,
              `${ZXY_PATH}/sales-coaching/mobile/07-practice-chat.png`,
              `${ZXY_PATH}/sales-coaching/mobile/08-practice-voice.png`,
              `${ZXY_PATH}/sales-coaching/mobile/12-result-overview.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "profile-settings",
    category: "体验重构 · 新旧对比",
    filterGroup: "system",
    badge: "架构治理",
    title: "个人设置与系统信息优化",
    subtitle: "拆解历史叠加超长表单，重构信息架构、查看/编辑分离与权限边界",
    src: `${ZXY_PATH}/covers/profile-settings-cover.svg`,
    screenshots: ["settings-index.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ia,
        PROJECT_SKILLS.state,
        PROJECT_SKILLS.designSystem,
        PROJECT_SKILLS.research,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.codex,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/profile-settings.html",
    liveLabel: "体验新旧版本拖拽对比原型",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            针对长期迭代堆叠导致的入口混杂、超长编辑表单与组件割裂问题，通过全量历史页面走查建立六大模块映射，让用户每一步都清楚<strong>“我在看什么、能改什么、修改会影响什么”</strong>。
          </p>

          <MetaStrip
            items={[
              { label: "项目类型", value: "历史系统体验重构" },
              { label: "我的角色", value: "问题审查 / 架构 / UIUX" },
              { label: "重构范围", value: "6 大设置与组织模块" },
              { label: "特色交互", value: "支持 Before/After 滑块对比" },
            ]}
          />

          <CaseStudyCTA live={this.live} label="打开新旧版本交互对比案例页" />

          <TypographyH3 className="mt-6">01 · 核心重构策略</TypographyH3>
          <BulletGroup
            items={[
              "按任务心智重组入口：划分账户信息、身份安全、消息提醒、设备系统能力、组织通讯录与需求反馈六大模块。",
              "查看态与编辑态解耦：告别一进页面就是几十个输入框的混合长表单，默认只读浏览，主动触发编辑，降低误触风险。",
              "规则与权限前置：协同产研补齐不可编辑字段说明、日期逻辑校验与异常状态统一反馈。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/profile-settings/new/account/settings-index.png`,
              `${ZXY_PATH}/profile-settings/old/account/settings-index.png`,
              `${ZXY_PATH}/profile-settings/new/account/profile-view.png`,
              `${ZXY_PATH}/profile-settings/new/account/profile-edit.png`,
              `${ZXY_PATH}/profile-settings/new/reminders/order-reminder.png`,
              `${ZXY_PATH}/profile-settings/new/organization/contact-list.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "business-overview",
    category: "BI 数据看板 · 响应式重排",
    filterGroup: "business",
    badge: "可操作原型",
    title: "经营概览优化设计",
    subtitle: "围绕“看现状—找变化—做比较—查明细”构建连续的经营决策工作台",
    src: `${ZXY_PATH}/business-overview/dashboard-full.png`,
    screenshots: ["dashboard-full.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.dataviz,
        PROJECT_SKILLS.ia,
        PROJECT_SKILLS.responsive,
        PROJECT_SKILLS.state,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.htmlcss,
        PROJECT_SKILLS.codex,
      ],
    },
    live: "/cases/business-overview.html",
    liveLabel: "体验可点击联动的经营看板原型",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            经营看板不是静态报表的堆砌。设计围绕管理者的真实看数路径，将分散的核心指标、趋势折线与员工/商品排行串联成<strong>可扫描、可联动对比、可继续下钻</strong>的分析闭环。
          </p>

          <MetaStrip
            items={[
              { label: "项目类型", value: "B 端商业智能看板" },
              { label: "核心方法", value: "四步渐进式决策路径" },
              { label: "多端策略", value: "Web 双栏 + 移动端优先级重排" },
              { label: "交付亮点", value: "高保真 + 可交互数据原型" },
            ]}
          />

          <CaseStudyCTA live={this.live} label="打开经营看板交互原型页" />

          <TypographyH3 className="mt-6">01 · 阅读动线与跨端规则</TypographyH3>
          <BulletGroup
            items={[
              "指标与趋势同屏联动：首屏关键指标卡点击即可切换下方主趋势图，避免重复堆叠多张同质化图表。",
              "视觉分析与精确数值并置：左列图形化呈现占比与波动，右列保留可排序、可排除异常项的精确排行表。",
              "移动端重排而非缩小：窄屏下按决策优先级改为「横向滑动指标卡 → 核心趋势 → 单列专项分析 → 独立横向滚动表格」。",
            ]}
          />

          <SlideShow
            images={[
              `${ZXY_PATH}/business-overview/chart-default.png`,
              `${ZXY_PATH}/business-overview/chart-selected.png`,
              `${ZXY_PATH}/business-overview/chart-scrolled.png`,
              `${ZXY_PATH}/business-overview/dashboard-full.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "design-system",
    category: "设计系统 · 覆盖率 92%",
    filterGroup: "system",
    featuredSpan: true,
    badge: "提效 +30%",
    title: "Figma 双端组件库迁移与搭建",
    subtitle: "从语义 Token 到 Web/移动端复合组件及 Axure 原型库的全链路资产标准化",
    src: `${ZXY_PATH}/covers/design-system-cover.svg`,
    screenshots: ["design-system-cover.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.designSystem,
        PROJECT_SKILLS.responsive,
        PROJECT_SKILLS.ia,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.axure,
        PROJECT_SKILLS.htmlcss,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/resume.html#projects",
    liveLabel: "在完整简历中查看项目详情",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            主导团队设计工具迁移过程中的双端组件资产重建，打通<strong>产品原型（Axure）— 视觉交互（Figma）— 研发走查</strong>的一致性标准。
          </p>

          <MetaStrip
            items={[
              { label: "项目角色", value: "项目负责人" },
              { label: "持续周期", value: "2025.06 — 至今" },
              { label: "组件覆盖率", value: "92% 业务场景覆盖" },
              { label: "协作收益", value: "团队设计效率提升约 30%" },
            ]}
          />

          <SlideShow images={[`${ZXY_PATH}/covers/design-system-cover.svg`]} />

          <TypographyH3 className="mt-6">01 · 体系搭建与团队落地</TypographyH3>
          <BulletGroup
            items={[
              "基础语义变量（Tokens）：从品牌色、功能状态色、字阶行高到 4px 间距模数，逐层构建 Web 与移动端原子及业务复合组件。",
              "双库同步前置：同步输出标准化 Axure 原型组件库，让产品经理在画原型阶段即可复用统一交互模式。",
              "治理与宣讲机制：制定组件命名、Auto Layout 变体规范与新增维护流程，跨三条业务线显著消除样式分叉。",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "warehouse",
    category: "B2B 仓储系统 · 0→1 上线",
    filterGroup: "business",
    featuredSpan: true,
    badge: "复杂业务建模",
    title: "易仓配｜仓储全链路作业体系",
    subtitle: "从零构建覆盖入库、出库、盘点、调拨与移库的单据状态与实时库存交互模型",
    src: `${ZXY_PATH}/covers/warehouse-cover.svg`,
    screenshots: ["warehouse-cover.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.domain,
        PROJECT_SKILLS.state,
        PROJECT_SKILLS.ia,
      ],
      backend: [
        PROJECT_SKILLS.figma,
        PROJECT_SKILLS.axure,
        PROJECT_SKILLS.qa,
      ],
    },
    live: "/cases/resume.html#projects",
    liveLabel: "在完整简历中查看项目详情",
    get content() {
      return (
        <div className="space-y-6">
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
            面向企业供应链场景从 0 到 1 建立完整仓储作业模块，解决多仓、多批次作业中<strong>“单据流转状态”与“库存可用量增减”难以对应</strong>的核心痛点。
          </p>

          <MetaStrip
            items={[
              { label: "项目角色", value: "核心 UX 设计师" },
              { label: "项目周期", value: "2025.11 — 2025.12" },
              { label: "核心模块", value: "入库 / 出库 / 盘点 / 调拨 / 移库" },
              { label: "落地进展", value: "2025 年 12 月正式上线" },
            ]}
          />

          <SlideShow images={[`${ZXY_PATH}/covers/warehouse-cover.svg`]} />

          <TypographyH3 className="mt-6">01 · 对象建模与关键流程</TypographyH3>
          <BulletGroup
            items={[
              "建立「仓库库位 — 实时库存账本 — 业务单据 — 现场作业」四维对象模型，统一六类仓储单据的列表、详情与审核骨架。",
              "重点打磨入库、出库与盘点三大高频任务流，覆盖创建校验、实收实发差异录入、部分出入库及冲红回滚等异常分支。",
              "2025 年 12 月按期上线稳定运行，实现核心仓储作业全流程线上化闭环。",
            ]}
          />
        </div>
      );
    },
  },
];

export default projects;

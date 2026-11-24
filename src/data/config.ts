const config = {
  title: "朱星宇 | UX 交互设计师 · 复杂业务系统与 AI 产品体验",
  description: {
    long: "朱星宇个人交互作品集——专注复杂 B 端业务系统与 AI 产品体验的 UX 交互设计师。擅长从业务目标、用户任务与系统约束出发，完成信息架构、关键流程、状态规则与异常边界设计，推动方案从 0 到 1 落地闭环。",
    short:
      "朱星宇｜专注复杂 B 端系统与 AI 产品体验的 UX 交互设计师作品集",
  },
  keywords: [
    "朱星宇",
    "UX设计师",
    "交互设计师",
    "UI设计师",
    "AI产品体验",
    "B端产品设计",
    "复杂业务建模",
    "信息架构",
    "设计系统",
    "智能体平台",
    "作品集",
    "Figma",
    "Axure",
    "ProtoPie",
  ],
  author: "朱星宇",
  authorEn: "ZHU XINGYU",
  role: "UX 交互设计师",
  tagline: "把复杂业务与系统规则，转化为清晰、可靠、可持续迭代的产品体验。",
  location: "南京 / 常州",
  experienceYears: "2 年经验",
  education: "南京传媒学院 · 交互设计（前 3%）",
  status: "求职中 · OPEN TO WORK",
  email: "476181740@qq.com",
  site: "https://zxy01001.github.io/portfolio",

  // 隐藏面向程序员的 GitHub Stars 计数器，保持设计师作品集纯粹感
  githubUsername: "",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/zxy/avatar.jpg";
  },
  social: {
    twitter: "mailto:476181740@qq.com",
    linkedin: "/cases/resume.html",
    instagram: "mailto:476181740@qq.com",
    facebook: "mailto:476181740@qq.com",
    github: "https://github.com/zxy01001",
  },
};
export { config };

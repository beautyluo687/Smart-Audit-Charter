import { SlideSection, KpiCard, TimelineData } from './types';

export const initialKpis: KpiCard[] = [
  {
    titleZh: "审计周期缩短",
    titleEn: "Audit cycle time reduction",
    valueZh: "-45% 耗时",
    valueEn: "-45% duration",
    icon: "Clock",
    color: "emerald"
  },
  {
    titleZh: "SLA内闭环率提升",
    titleEn: "Closure rate within SLA improvement",
    valueZh: "+35% 闭环",
    valueEn: "+35% rate",
    icon: "CheckSquare",
    color: "blue"
  },
  {
    titleZh: "发现项错分率降低",
    titleEn: "Finding misclassification rate decrease",
    valueZh: "-60% 误差",
    valueEn: "-60% rate",
    icon: "TrendingDown",
    color: "rose"
  },
  {
    titleZh: "审核员满意度提升",
    titleEn: "Auditor satisfaction increase",
    valueZh: "94% 评分",
    valueEn: "94% score",
    icon: "Smile",
    color: "amber"
  }
];

export const initialSections: SlideSection[] = [
  {
    id: "sched",
    number: "1",
    titleZh: "智能审计计划与触发",
    titleEn: "Smart Audit Planning & Triggering",
    icon: "Calendar",
    phase: "Pre",
    timelineZh: "FY26/27 智能排程",
    timelineEn: "FY26/27 Smart Scheduling",
    color: "indigo",
    items: [
      { textZh: "审计日历与计划智能排程", textEn: "Audit calendar & smart scheduling" },
      { textZh: "自动触发智能审计流程", textEn: "Auto-trigger audit workflow" },
      { textZh: "自动对应加载规范检查表", textEn: "Auto-loading matching checklists" },
      { textZh: "自动关联历史审计与参考案例", textEn: "Auto-associating historical cases" }
    ]
  },
  {
    id: "exec",
    number: "2",
    titleZh: "审计执行与自动合规检查",
    titleEn: "Audit Execution & Auto Compliance",
    icon: "ClipboardCheck",
    phase: "During",
    timelineZh: "FY26/27 核心发布",
    timelineEn: "FY26/27 Core Launch",
    color: "cyan",
    items: [
      { textZh: "自动化合规规则扫描", textEn: "Automated compliance checks" },
      { textZh: "NLP 标准/ISO 核心条款自动对照分析", textEn: "NLP standards & ISO auto-matching" },
      { textZh: "异常偏离即时提示与报告", textEn: "Real-time exception reporting" }
    ],
    subBlock: {
      titleZh: "检查表校验器",
      titleEn: "Checklist Validator",
      icon: "Cpu",
      timelineZh: "FY26/27 方案验证",
      timelineEn: "FY26/27 Verification",
      items: [
        { textZh: "审计规范自动交叉比对", textEn: "Automated cross-referencing" },
        { textZh: "执行缺项/不吻合点智能高亮", textEn: "Strict gaps highlighting" }
      ]
    }
  },
  {
    id: "severity",
    number: "3",
    titleZh: "发现与严重性引擎",
    titleEn: "Finding & Severity Engine",
    icon: "AlertOctagon",
    phase: "During",
    timelineZh: "FY26/27 规则版 | FY27/28+ ML 增强",
    timelineEn: "FY26/27 Rules | FY27/28+ ML Enhanced",
    color: "amber",
    items: [
      { textZh: "基于规则的分类 + ML 严重性判断", textEn: "Rule-based classification & ML severity determination" },
      { textZh: "自动生成标准发现项与报告", textEn: "Auto report & standard finding generation" },
      { textZh: "Actions recommendation", textEn: "Actions recommendation" }
    ]
  },
  {
    id: "closedloop",
    number: "4",
    titleZh: "闭环干预与改进",
    titleEn: "Closed-loop Intervention & Improvement",
    icon: "RotateCcw",
    phase: "Post",
    timelineZh: "FY26/27 基础闭环 | FY27/28+ 完整干预",
    timelineEn: "FY26/27 Basic Link | FY27/28+ Total Loop",
    color: "purple",
    items: [
      { textZh: "自动提醒 & 闭证检查", textEn: "Auto reminder triggers & closure evidence check" },
      { textZh: "改进效果与合规性多维度核查", textEn: "Multi-dimensional inspection of improvement effects & compliance" },
      { textZh: "闭环结论确认", textEn: "Bi-directional closure confirmation" },
      { textZh: "A/B 角色配置 & 审计移交", textEn: "A/B role configuration & audit handover" }
    ]
  }
];

export const initialHubItems = {
  titleZh: "审计智能中枢",
  titleEn: "Audit Intelligence Hub",
  subtitleZh: "本模块作为长期能力池积淀，不标注特定发布时间",
  subtitleEn: "No time label, serves as the long-term continuous core capability pool",
  items: [
    { textZh: "审计数据湖 (存储多维原始审计档案与指标数据)", textEn: "Audit data lake (multi-dimensional diagnostic assets)" },
    { textZh: "审计可视化看板 (基于 Power BI / 敏捷报表的决策面板)", textEn: "Interactive audit dashboard (Power BI / Agile charts)" },
    { textZh: "审计精细化知识库 (KB 集成标准、条款、最佳实践)", textEn: "Audit knowledge base (KB for rules & best practices)" },
    { textZh: "安全风险评级矩阵 (针对内部流程及供应商 vendor 比对)", textEn: "Risk grading models & comparative matrix for suppliers" },
    { textZh: "持续闭环反馈学习回路 (模型迭代与用户标记回传)", textEn: "Close-loop feedback learning & continuous human-in-loop" },
    { textZh: "移动终端文本提取、语音记录及现场图像采集", textEn: "Mobile capture mechanisms (OCR texts, voice transcripts, photos)" },
    { textZh: "横向多维度供应商 / 相似级别 Vendor 全方位对标", textEn: "Vertical & horizontal benchmark comparisons for vendors" },
    { textZh: "执行合规检查表智能校验器 (验证缺项与交叉对比)", textEn: "Continuous diagnostic checklist validator system" }
  ]
};

export const initialTimeline: TimelineData[] = [
  {
    period: "FY25/26",
    titleZh: "能力底座与数据集成",
    titleEn: "Baselines & Data Foundation",
    itemsZh: [
      "审计数据湖底层搭建与指标提取",
      "审计检查表数字化与索引索引"
    ],
    itemsEn: [
      "Data lake foundation connecting to Core Audit",
      "Digitalization & indexing of standard checklists"
    ]
  },
  {
    period: "FY26/27",
    titleZh: "核心流转与规则期 (核心上线)",
    titleEn: "Core Components & Rule Flow",
    itemsZh: [
      "1.审计排程与日历自动加载触发上线",
      "2.NLP合规核查与校验器方案验证",
      "3.规则版发现项评估及报告生成",
      "4.跟进提醒、证据核查与基础闭环"
    ],
    itemsEn: [
      "Mod 1: Auto triggers & scheduled calendars",
      "Mod 2: NLP clause validation & validator MVP",
      "Mod 3: Pre-set rules for gravity analysis",
      "Mod 4: Reminder delivery & basic loop closure"
    ]
  },
  {
    period: "FY27/28+",
    titleZh: "ML评级增强与改进深度核查",
    titleEn: "ML Gravity & High-Fidelity Loop",
    itemsZh: [
      "3.自适应机器学习(ML)严重等级分类评定",
      "4.改进效果与合规性多维度核查实现",
      "5.智能中枢：移动端语音、OCR图像采集入库"
    ],
    itemsEn: [
      "Mod 3: Deep self-adaptive ML gravity modeling",
      "Mod 4: High fidelity multi-dimension audits",
      "Hub: Real-time OCR & on-site logs capturing"
    ]
  },
  {
    period: "长期底座",
    titleZh: "中枢长效赋能与知识演进",
    titleEn: "Continuous Hub & Knowledge Pool",
    itemsZh: [
      "审计智能可视化决策看板(Power BI)",
      "供应商/相似 Vendor 多维对标",
      "审计知识库常态沉淀与反馈自学习"
    ],
    itemsEn: [
      "Power BI decision support systems",
      "Cross-vendor risk index modeling",
      "Human-in-the-loop self-learning loop"
    ]
  }
];

// Interactive presentation scripts / transcript generator for presenter
export const presenterScripts = [
  {
    id: "sched",
    title: "1. Smart Audit Planning & Triggering (智能审计计划与触发)",
    zh: "在准备（Pre）阶段，智能审计解决的首要痛点是‘无事遗漏、有据可循’。系统内置智能日历与AI排程算法，能够根据过往履历自动在特定频度推荐并触发审计项目。该模块不仅省去了手工开案的反复对接，还会把最适用的审计检查细目（Checklist）与历史关联文档精准匹配到位，彻底消解审计前的准备空白期。",
    en: "In the 'Pre' stage, smart scheduling ensures nothing is missed. Based on vendor risk tiers, the system automatically suggests scheduling frequencies and loads historical data so auditors hit the ground running with all checklists populated automatically."
  },
  {
    id: "exec",
    title: "2. Audit Execution & Checklist Validator (审计执行与合规检查)",
    zh: "执行（During）阶段不仅需要保证审计广度，更需要关注精度。通过集成 NLP 处理流程，系统对大批量的条约、标准（如行业严苛的ISO规范）进行快速扫描匹配，当即生成差异或异常检测提示。同时，为保障各检查项的真实与完整性，‘检查表校验器’可验证潜在的空缺项，进行交叉稽核以规避虚假或遗缺反馈。",
    en: "During live execution, NLP parsers read vendor docs relative to rigorous ISO criteria. The checklist validator serves as a secondary guardrail, cross-referencing audit sheets to flag missing data or gap items instantaneously."
  },
  {
    id: "severity",
    title: "3. Finding & Severity Engine (发现与严重性评估)",
    zh: "过去针对发现项的严重评级带有较强主观性，而此时‘发现与严重性引擎’便发挥核心作用。此引擎在FY26/27会基于明确的严苛预设规则，FY27/28+起会过渡成自适应的机器学习模型（ML Model）判别级别。评定完成后，会自动填充标准化中英文规范描述，生成整改（Action Items）具体方案，并将改进事项归宿入库，保障判定公正一致。",
    en: "Determining error severity can be highly subjective. This module leverages a rule-based engine transitioning into a fully adaptive ML Classifier in FY27/28+. It drafts standardize complaints, auto-generates formal actions, and recommends clear remediations based on the infraction type."
  },
  {
    id: "closedloop",
    title: "4. Closed-loop Interventions (闭闭环干预与改进)",
    zh: "审计往往是‘发现容易，整改难’，这也是闭环（Post）设计的灵药。本模块在FY26/27提供带有跟进推送的自动化提醒，而在FY27/28+升级为多维度改进效果核查与合规对照，支持管理A/B角色交割以及整改闭环双向审核确认，直到最终在系统中彻底销案。",
    en: "Smart push services nudge the responsible parties on closure evidence. Dual role (A/B) delegation ensures handovers are fully recorded and audited. In FY27/28+, we upgrade to multi-dimensional improvement inspections ensuring bulletproof compliance prior to closure sign-off."
  },
  {
    id: "hub",
    title: "5. Audit Intelligence Hub (审计中枢能力池)",
    zh: "最后，这是整个平台的底座——‘智能中枢’。这里包含长效赋能的审计湖、一站式Power BI分析看板、ISO及历史整改措施的丰富知识库（KB）。它不仅能对众多供应商进行横向的风险画像评估，还支持手机等便携终端一键语音收录与图像OCR自动入档，让算法引擎越用越聪明。",
    en: "The foundational bedrock of our system. It hosts the data storage lake, custom business dashboards, and the core Knowledge Base (KB). This supports on-the-field capture (voice notes, pictures, OCR) and computes cross-vendor benchmark graphs to detect systemic risks."
  }
];

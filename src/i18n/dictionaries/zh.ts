import type { Dictionary } from "./en";

// Simplified Chinese. The staff speak English and Spanish only, so the copy says so instead of "Hablamos Español".
// Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const zh: Dictionary = {
  meta: {
    homeTitle: "格伦代尔车祸整脊医生 | 亚利桑那州 | 尽快就诊",
    homeDescription:
      "在格伦代尔或 Arrowhead Ranch 遭遇车祸受伤？可尽快进行整脊检查；如果其他司机有过错，您无需自付任何费用。",
    ogImageAlt: "{name}，亚利桑那州格伦代尔。致电 {phone}",
  },

  common: {
    skipLink: "跳到主要内容",
    home: "首页",
    call: "致电 {phone}",
    requestCallback: "预约回电",
    mainNav: "主导航",
    breadcrumb: "面包屑导航",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
    officeHours: "门诊时间",
  },

  spoken: {
    lang: undefined,
    badge: "我们提供英语和西班牙语服务",
    title: "英语和西班牙语服务",
    text: "我们的医生和工作人员讲英语和西班牙语。电话沟通和就诊均以英语或西班牙语进行。",
    interpreter: "欢迎您带一位能为您翻译的亲友一同前来。",
  },

  nav: {
    about: "关于我们",
    treatments: "车祸伤治疗",
    painManagement: "疼痛管理",
    noCost: "无需自付费用",
    faq: "常见问题",
    blog: "博客",
    contact: "联系我们",
  },

  legal: {
    terms: "使用条款",
    privacy: "隐私政策",
    disclosure: "披露政策",
    englishOnly: "（英文）",
  },

  footer: {
    treatments: "车祸伤治疗",
    languages: "语言",
    aboutTitle: "车祸伤诊疗",
    noCostLead: "无需自付费用。",
    noCost: "如果事故由他人造成，{name} 将向过错方的保险公司收费并等待付款。无需医疗保险。如果您有律师，我们将通过医疗费用偿付安排（lien）与您的律师合作并等待付款。所有文书工作都由我们处理。",
    experience: "我们诊所拥有超过 10 年为车祸受害者提供诊疗的经验，您无需自付费用。",
    appointments: "可尽快预约。请致电预约当天或下一个门诊日就诊：",
    painManagement: "我们由医生和疼痛管理医生为您的损伤提供疼痛管理，并在必要时转诊至骨科，您无需自付费用。",
    callUs: "请致电：",
    clinicTitle: "亚利桑那州格伦代尔车祸整脊医生",
    contactTitle: "联系我们",
  },

  ctaBand: {
    title: "车祸受伤了？别拖延，尽快检查。",
    text: "门诊日可当天预约；如果事故由其他司机造成，您无需自付任何费用。",
  },

  callCta: {
    label: "预约检查",
    title: "车祸受伤，可尽快检查。",
    before: "请立即致电，或",
    link: "预约回电",
    after: "。",
  },

  sidebar: {
    label: "联系诊所",
    title: "车祸受伤？尽快检查。",
  },

  costAndQuestions: {
    title: "对费用或保险有疑问？",
    noCost: "了解无需自付费用的诊疗安排",
    faq: "车祸常见问题",
  },

  hours: {
    closed: "休诊",
    openUntil: "今天接诊至{time}",
    openUntilReopens: "接诊至{time}，{reopen}恢复接诊",
    opensToday: "今天{time}开始接诊",
    opensTomorrow: "目前休诊，明天{time}开始接诊",
    opensOn: "目前休诊，{day}{time}开始接诊",
    closedNow: "目前休诊",
  },

  howItWorks: {
    title: "从检查到康复的诊疗流程",
    lead: "请专心康复。我们会协调检查、诊疗记录及保险账单事宜。",
    steps: [
      {
        title: "致电我们",
        text: "致电或预约回电。可安排当天或下一个门诊日就诊，即使您已经去过急诊室。",
      },
      {
        title: "全面检查与记录",
        text: "全面的脊柱和骨科检查有助于发现损伤。我们会记录检查结果，为诊疗和索赔提供依据。",
      },
      {
        title: "您的治疗方案",
        text: "您的方案可能包括整脊治疗和疼痛管理，必要时转诊接受核磁共振检查或骨科诊疗。",
      },
      {
        title: "账单由我们处理",
        text: "如果事故责任在其他司机，我们会向对方的保险公司收费。如果您已聘请律师，我们也会与其合作。请致电了解收费安排。",
      },
    ],
  },

  valueProps: [
    { title: "尽快预约", text: "致电后，当天或下一个门诊日即可看医生。" },
    { title: "无需自付费用", text: "如果事故由其他司机造成，我们向对方的保险公司收费并等待付款。" },
    { title: "无需医疗保险", text: "即使没有医疗保险，您也可以接受治疗。" },
    { title: "与您的律师合作", text: "我们可通过医疗费用偿付安排（lien）延后收款，并向您的律师提供诊疗记录。" },
    { title: "整脊医生与临床医生", text: "协调安排整脊治疗和疼痛管理，并在必要时转诊至骨科。" },
    { title: "英语和西班牙语", text: "我们的医生和工作人员讲英语和西班牙语。欢迎您带一位能为您翻译的亲友一同前来。" },
  ],

  team: {
    sampleTag: "示例资料",
    sampleBio: "示例简介。",
    roles: {
      "Founder and Chiropractic Physician": "诊所创始人，整脊医生",
      "Chiropractic Physician": "整脊医生",
      "Pain Management Physician": "疼痛管理医生",
    },
  },

  founder: {
    eyebrow: "认识我们的创始人",
    credentialsTitle: "资质与认证",
    credentials: [
      "美国法医专业委员会认证（DABFP）",
      "挥鞭伤与脑损伤创伤学认证",
      "低速碰撞法医风险分析认证",
      "医学针灸学会会士（FIAMA）",
    ],
    story: [
      "Vaughn Anthony Movses 医生（D.C.）是一位备受尊敬的整脊医生，致力于为亚利桑那州格伦代尔的患者提供卓越的照护。凭借丰富的医学训练和富有同理心的诊疗方式，Movses 医生根据每位患者的独特需求提供个性化的医疗方案。他对患者健康的投入不止于传统的医疗实践，他注重建立相互信任的关系，并促进坦诚的沟通。",
      "患者可以从 Movses 医生这里获得全面而贴心的照护，他始终致力于紧跟本领域的最新进展。交通便利，位于亚利桑那州格伦代尔 {street}，",
      "Movses 医生欢迎各个年龄和背景的人士来到诊所，在温馨舒适的环境中获得最高标准的医疗照护。",
    ],
    quote:
      "一场车祸可能在几秒钟内彻底改变您的生活。我的目标很简单：仔细的检查、坦诚的解答，以及根据您的伤情制定的治疗方案，帮助您康复并回到日常生活。",
    link: "查看完整简介",
  },

  cards: {
    readArticle: "阅读文章",
  },

  form: {
    title: "预约回电",
    intro: "只需不到一分钟。未标注“选填”的项目均为必填。",
    name: "姓名",
    phone: "电话",
    email: "电子邮箱",
    accidentDate: "事故日期",
    message: "我们能为您做些什么？",
    optional: "（选填）",
    honeypot: "请勿填写此栏",
    consent: "我同意诊所通过电话、短信或电子邮件就我的请求与我联系。",
    submit: "预约回电",
    sending: "正在发送…",
    note: "请勿填写医疗细节。我们会在门诊时间内用英语或西班牙语给您回电。",
    sentTitle: "谢谢。我们会在门诊时间内给您回电。",
    sentBefore: "需要立即帮助？请致电 ",
    sentAfter: "。",
    errors: {
      name_short: "请输入您的姓名。",
      name_long: "请不要超过 {max} 个字符。",
      phone: "请输入 10 位美国电话号码，例如 (623) 555-0123。",
      email: "请输入电子邮箱地址（例如 name@example.com），或留空。",
      accident_date: "事故日期不能晚于今天。",
      message_long: "请不要超过 {max} 个字符。",
      consent: "请勾选此框，以便我们与您联系。",
      bad_request: "无法发送您的请求。请重试，或致电 {phone}。",
      send_failed: "无法发送您的请求。请致电 {phone}。",
      too_many: "请求过多。请致电 {phone}。",
      network: "无法连接服务器。请检查网络后重试，或致电 {phone}。",
    },
  },

  home: {
    h1: "亚利桑那州格伦代尔车祸伤整脊医生",
    intro:
      "如果您或亲人遭遇车祸，全面检查有助于发现损伤并确定诊疗方案。症状不一定立即出现。请致电预约当天或下一个门诊日就诊。",
    heroPoints: ["门诊日可当天预约", "如果其他司机有过错，您无需自付费用", "无需医疗保险"],
    injuriesTitle: "我们治疗的车祸伤",
    injuriesLead: "我们的整脊医生和临床医生专注于车祸伤和工伤。选择症状或损伤类型，了解更多。",
    costTitle: "不是您的过错，就无需自付费用",
    costText:
      "如果事故由他人造成，我们诊所会向过错方的保险公司收费并等待付款。我们在照护车祸受害者方面拥有超过 10 年的经验，患者无需自付任何费用。",
    costLink: "了解无需自付费用的诊疗安排",
    billingPoints: [
      "我们向过错方的保险公司收费并等待付款。",
      "不需要医疗保险。",
      "如果您已聘请律师，我们可通过医疗费用偿付安排（lien）将收款延后至案件结案时。",
      "所有文书工作都由我们为您处理。",
    ],
    faqTitle: "车祸后的常见疑问",
    faqLead: "清楚解答有关急诊就诊、轻微车损和治疗费用的问题。",
    faqLink: "阅读全部 {count} 个问题",
    areasTitle: "服务地区",
    areasLead: "车祸患者来自格伦代尔、Arrowhead Ranch 以及以下周边社区。",
    blogTitle: "博客文章",
    blogLink: "全部文章",
  },

  page: {
    ourDoctors: "我们的医生",
    relatedInjuries: "相关损伤",
    aboutTeamLead: "整脊医生和一位疼痛管理医生在同一诊所协同诊疗。",
  },

  blog: {
    title: "车祸伤相关文章 | 格伦代尔整脊诊所",
    description: "来自亚利桑那州格伦代尔车祸伤诊所的文章，内容涵盖车祸伤、整脊治疗和保险误区。",
    crumb: "博客",
    h1: "车祸伤相关文章",
    lead: "以通俗语言介绍车祸伤、整脊治疗和保险相关研究与问题。",
    published: "发布于",
    updated: "更新于",
  },

  contact: {
    title: "联系我们 | 格伦代尔车祸整脊医生",
    description: "致电 {phone} 或预约回电。亚利桑那州格伦代尔车祸伤可尽快就诊。我们提供英语和西班牙语服务。",
    h1: "联系我们",
    lead: "请致电预约就诊，或提交表格，我们会在门诊时间内给您回电。",
    formTitle: "预约回电",
    required: "未标注“选填”的项目均为必填。",
    visit: "诊所地址",
    mapTitle: "{name} 地图",
    mapPlaceholder: "地址确认后将显示地图",
  },

  notFound: {
    title: "页面未找到 | {name}",
    description: "您要找的页面不存在或已移动。",
    eyebrow: "页面未找到",
    h1: "这个页面走错了路",
    text: "您要找的页面不存在或已移动。如果您在车祸中受伤，仍然可以现在致电我们，或从首页开始。",
    home: "返回首页",
    contact: "联系我们",
  },
};

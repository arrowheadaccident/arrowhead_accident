import type { Dictionary } from "./en";

// Simplified Chinese. The staff speak English and Spanish only, so the copy says so instead of "Hablamos Español".
// Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const zh: Dictionary = {
  meta: {
    homeTitle: "格伦代尔车祸整脊医生 | 亚利桑那州 | 当天就诊",
    homeDescription:
      "在格伦代尔或 Arrowhead Ranch 遭遇车祸受伤？当天即可进行整脊检查；如果其他司机有过错，您无需自付任何费用。",
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
    callToday: "",
    cta: "致电 {phone}",
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
    clinic: "我们的诊所",
    languages: "语言",
    disclaimer:
      "本网站上的信息为一般性信息，不构成医疗或法律建议，也不建立医患关系。如遇医疗紧急情况，请拨打 911。",
    notAssociated: "本网站与 Dr. Vaughn Movses 或 Arrowhead Accident Group 无任何关联。",
  },

  ctaBand: {
    title: "车祸受伤了？今天就来检查。",
    text: "可当天预约；如果事故由其他司机造成，您无需自付任何费用。",
  },

  callCta: {
    label: "预约当天检查",
    title: "车祸受伤，当天即可检查。",
    before: "请立即致电，或",
    link: "预约回电",
    after: "。",
  },

  sidebar: {
    label: "联系诊所",
    title: "车祸受伤？当天即可检查。",
  },

  costAndQuestions: {
    title: "对费用或保险有疑问？",
    noCost: "了解如何无需自付费用",
    faq: "车祸常见问题",
  },

  hours: {
    closed: "休息",
    openUntil: "今天营业至{time}",
    opensToday: "今天{time}开门",
    opensTomorrow: "现在休息。明天{time}开门",
    opensOn: "现在休息。{day}{time}开门",
    closedNow: "现在休息",
  },

  howItWorks: {
    title: "从车祸到康复：流程如下",
    lead: "您只需专心康复。检查、文书和保险由我们负责。",
    steps: [
      {
        title: "致电我们",
        text: "致电或预约回电。可安排当天或次日就诊，即使您已经去过急诊室。",
      },
      {
        title: "全面检查与记录",
        text: "全面的脊椎和骨科检查可以发现隐藏的损伤，每项检查结果都会为您的索赔记录在案。",
      },
      {
        title: "您的治疗方案",
        text: "整脊治疗和疼痛管理；需要时为您转诊做核磁共振（MRI）或看骨科。",
      },
      {
        title: "账单由我们处理",
        text: "我们向肇事司机的保险公司收费，并与您的律师合作，您无需自付任何费用。",
      },
    ],
  },

  valueProps: [
    { title: "当天预约", text: "今天致电，今天或明天即可看医生。" },
    { title: "无需自付费用", text: "如果事故由其他司机造成，我们向对方的保险公司收费并等待付款。" },
    { title: "无需医疗保险", text: "即使没有医疗保险，您也可以接受治疗。" },
    { title: "与您的律师合作", text: "我们接受留置权（lien），并将您的病历和报告发送给您的律师。" },
    { title: "整脊医生与西医医生", text: "整脊治疗、疼痛管理和骨科转诊，一站完成。" },
    { title: "英语和西班牙语", text: "我们的医生和工作人员讲英语和西班牙语。欢迎您带一位能为您翻译的亲友一同前来。" },
  ],

  team: {
    sampleTag: "示例资料",
    sampleBio: "示例简介。",
    roles: {
      "Chiropractic Physician": "整脊医生",
      "Pain Management Physician": "疼痛管理医生",
    },
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
    sentTitle: "谢谢，我们会尽快给您回电。",
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
      "如果您或您的亲人遭遇了车祸，您应该接受一次全面的整脊检查，找出可能在多年后仍影响您的潜在损伤。最糟糕的做法就是等着看疼痛会不会自行消失。今天就致电，预约当天或次日就诊。",
    heroPoints: ["当天预约", "如果其他司机有过错，您无需自付费用", "无需医疗保险"],
    injuriesTitle: "我们治疗的车祸伤",
    injuriesLead: "我们的整脊医生和西医医生只治疗车祸伤和工伤。选择您的症状，了解更多。",
    costTitle: "不是您的过错，就无需自付费用",
    costText:
      "如果事故由他人造成，我们诊所会向过错方的保险公司收费并等待付款。我们在照护车祸受害者方面拥有超过 10 年的经验，患者无需自付任何费用。",
    costLink: "了解如何无需自付费用",
    billingPoints: [
      "我们向过错方的保险公司收费并等待付款。",
      "不需要医疗保险。",
      "如果您有律师，我们以留置权（lien）方式合作并等待付款。",
      "所有文书工作都由我们为您处理。",
    ],
    careLabel: "疼痛管理和语言服务",
    painTitle: "同一诊所提供疼痛管理",
    painText:
      "我们为您的损伤提供疼痛管理，由内科医生、骨科医生和疼痛管理医生诊治；如果其他司机有过错，您无需自付费用。可预约急诊：今天致电，今天就能看医生。",
    painLink: "了解疼痛管理",
    teamTitle: "整脊医生与西医医生，同在一处",
    teamLead: "四位整脊医生和一位疼痛管理医生，每天都在治疗车祸伤。",
    teamLink: "进一步了解我们的诊所",
    faqTitle: "车祸后的常见疑问",
    faqLead: "关于急诊、轻微车损和由谁付费的直接解答。",
    faqLink: "阅读全部 {count} 个问题",
    areasTitle: "服务地区",
    areasLead: "车祸患者来自格伦代尔、Arrowhead Ranch 以及以下周边社区。",
    blogTitle: "博客文章",
    blogLink: "全部文章",
  },

  page: {
    ourDoctors: "我们的医生",
    relatedInjuries: "相关损伤",
    aboutTeamLead: "整脊医生和一位疼痛管理西医在同一诊所协同工作。",
  },

  blog: {
    title: "车祸伤相关文章 | 格伦代尔整脊诊所",
    description: "来自亚利桑那州格伦代尔车祸伤诊所的文章，内容涵盖车祸伤、整脊治疗和保险误区。",
    crumb: "博客",
    h1: "车祸伤相关文章",
    lead: "关于车祸伤、整脊治疗和保险的研究与直白解答。",
    published: "发布于",
    updated: "更新于",
  },

  contact: {
    title: "联系我们 | 格伦代尔车祸整脊医生",
    description: "致电 {phone} 或预约回电。亚利桑那州格伦代尔车祸伤可当天就诊。我们提供英语和西班牙语服务。",
    h1: "联系我们",
    lead: "致电预约当天就诊，或提交表格，我们会给您回电。",
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

import type { Dictionary } from "./en";

// Vietnamese, addressing the reader as "quý vị". The staff speak English and Spanish only, so the copy says so
// instead of "Hablamos Español". Machine-assisted translation: have a native speaker review it before launch
// (docs/CONTENT-NOTES.md).
export const vi: Dictionary = {
  meta: {
    homeTitle: "Nắn chỉnh cột sống sau tai nạn xe hơi tại Glendale, AZ",
    homeDescription:
      "Bị thương trong tai nạn xe hơi ở Glendale hoặc Arrowhead Ranch? Khám nắn chỉnh cột sống trong ngày và không tốn tiền túi khi tài xế khác có lỗi.",
    ogImageAlt: "{name}, Glendale, AZ. Gọi {phone}",
  },

  common: {
    skipLink: "Chuyển đến nội dung chính",
    home: "Trang chủ",
    call: "Gọi {phone}",
    requestCallback: "Yêu cầu gọi lại",
    mainNav: "Menu chính",
    breadcrumb: "Đường dẫn",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    language: "Ngôn ngữ",
    officeHours: "Giờ làm việc",
  },

  spoken: {
    lang: undefined,
    badge: "Chúng tôi nói tiếng Anh và tiếng Tây Ban Nha",
    title: "Tiếng Anh và tiếng Tây Ban Nha",
    text: "Bác sĩ và nhân viên của chúng tôi nói tiếng Anh và tiếng Tây Ban Nha. Các cuộc gọi và buổi khám đều bằng tiếng Anh hoặc tiếng Tây Ban Nha.",
    interpreter: "Quý vị có thể đi cùng người thân hoặc bạn bè để thông dịch.",
    callToday: "",
    cta: "Gọi {phone}",
  },

  nav: {
    about: "Giới thiệu",
    treatments: "Điều trị tai nạn",
    painManagement: "Giảm đau",
    noCost: "Không tốn tiền túi",
    faq: "Hỏi đáp",
    blog: "Blog",
    contact: "Liên hệ",
  },

  legal: {
    terms: "Điều khoản sử dụng",
    privacy: "Chính sách quyền riêng tư",
    disclosure: "Chính sách công bố thông tin",
    englishOnly: " (tiếng Anh)",
  },

  footer: {
    treatments: "Điều trị chấn thương do tai nạn",
    clinic: "Phòng khám",
    languages: "Ngôn ngữ",
    disclaimer:
      "Thông tin trên trang web này là thông tin chung, không phải lời khuyên y tế hay pháp lý, và không tạo ra quan hệ bác sĩ – bệnh nhân. Nếu gặp trường hợp cấp cứu y tế, hãy gọi 911.",
    notAssociated: "Trang web này hoàn toàn không liên quan đến Dr. Vaughn Movses hay Arrowhead Accident Group.",
  },

  ctaBand: {
    title: "Bị thương trong tai nạn xe hơi? Hãy đi khám ngay hôm nay.",
    text: "Hẹn khám trong ngày, và không tốn tiền túi khi tài xế khác có lỗi.",
  },

  callCta: {
    label: "Đặt lịch khám trong ngày",
    title: "Khám trong ngày cho chấn thương do tai nạn xe hơi.",
    before: "Hãy gọi ngay, hoặc ",
    link: "yêu cầu chúng tôi gọi lại",
    after: ".",
  },

  sidebar: {
    label: "Liên hệ phòng khám",
    title: "Bị thương trong tai nạn? Khám ngay trong ngày.",
  },

  costAndQuestions: {
    title: "Có thắc mắc về chi phí hoặc bảo hiểm?",
    noCost: "Vì sao quý vị không tốn tiền túi",
    faq: "Hỏi đáp về tai nạn xe hơi",
  },

  hours: {
    closed: "Đóng cửa",
    openUntil: "Hôm nay mở cửa đến {time}",
    opensToday: "Hôm nay mở cửa lúc {time}",
    opensTomorrow: "Hiện đã đóng cửa. Mở cửa lúc {time} ngày mai",
    opensOn: "Hiện đã đóng cửa. Mở cửa lúc {time} {day}",
    closedNow: "Hiện đã đóng cửa",
  },

  howItWorks: {
    title: "Từ lúc tai nạn đến khi hồi phục: quy trình như sau",
    lead: "Quý vị tập trung vào việc hồi phục. Chúng tôi lo phần khám, giấy tờ và bảo hiểm.",
    steps: [
      {
        title: "Gọi cho chúng tôi",
        text: "Gọi điện hoặc yêu cầu gọi lại. Có lịch hẹn trong ngày và ngày hôm sau, kể cả khi quý vị đã đến phòng cấp cứu.",
      },
      {
        title: "Khám kỹ và lập hồ sơ",
        text: "Khám toàn diện cột sống và chỉnh hình giúp phát hiện chấn thương tiềm ẩn, và mọi kết quả đều được ghi lại cho hồ sơ bồi thường của quý vị.",
      },
      {
        title: "Kế hoạch điều trị của quý vị",
        text: "Nắn chỉnh cột sống và điều trị giảm đau, kèm giới thiệu chụp MRI và khám chỉnh hình khi cần.",
      },
      {
        title: "Chúng tôi lo việc thanh toán",
        text: "Chúng tôi gửi hóa đơn cho bảo hiểm của tài xế có lỗi và làm việc với luật sư của quý vị, nên quý vị không phải tự trả tiền.",
      },
    ],
  },

  valueProps: [
    { title: "Hẹn khám trong ngày", text: "Gọi hôm nay và gặp bác sĩ ngay hôm nay hoặc ngày mai." },
    { title: "Không tốn tiền túi", text: "Nếu tài xế khác gây ra tai nạn, chúng tôi gửi hóa đơn cho bảo hiểm của họ và chờ thanh toán." },
    { title: "Không cần bảo hiểm sức khỏe", text: "Quý vị vẫn được điều trị dù không có bảo hiểm sức khỏe." },
    { title: "Làm việc với luật sư của quý vị", text: "Chúng tôi chấp nhận quyền lưu giữ (lien) và gửi hồ sơ, báo cáo cho luật sư của quý vị." },
    { title: "Bác sĩ nắn chỉnh cột sống và bác sĩ y khoa", text: "Nắn chỉnh cột sống, điều trị giảm đau và giới thiệu chỉnh hình tại cùng một nơi." },
    {
      title: "Tiếng Anh và tiếng Tây Ban Nha",
      text: "Bác sĩ và nhân viên của chúng tôi nói tiếng Anh và tiếng Tây Ban Nha. Quý vị có thể đi cùng người thân hoặc bạn bè để thông dịch.",
    },
  ],

  team: {
    sampleTag: "Hồ sơ mẫu",
    sampleBio: "Tiểu sử mẫu.",
    roles: {
      "Chiropractic Physician": "Bác sĩ nắn chỉnh cột sống",
      "Pain Management Physician": "Bác sĩ điều trị giảm đau",
    },
  },

  cards: {
    readArticle: "Đọc bài viết",
  },

  form: {
    title: "Yêu cầu gọi lại",
    intro: "Chưa đến một phút. Các mục không ghi “không bắt buộc” đều phải điền.",
    name: "Họ và tên",
    phone: "Số điện thoại",
    email: "Email",
    accidentDate: "Ngày xảy ra tai nạn",
    message: "Chúng tôi có thể giúp gì?",
    optional: "(không bắt buộc)",
    honeypot: "Để trống ô này",
    consent: "Tôi đồng ý được liên hệ qua điện thoại, tin nhắn hoặc email về yêu cầu của tôi.",
    submit: "Yêu cầu gọi lại",
    sending: "Đang gửi…",
    note: "Vui lòng không ghi chi tiết y tế. Chúng tôi sẽ gọi lại trong giờ làm việc, bằng tiếng Anh hoặc tiếng Tây Ban Nha.",
    sentTitle: "Cảm ơn quý vị, chúng tôi sẽ gọi lại sớm.",
    sentBefore: "Cần giúp ngay? Hãy gọi ",
    sentAfter: ".",
    errors: {
      name_short: "Nhập họ và tên của quý vị.",
      name_long: "Dùng tối đa {max} ký tự.",
      phone: "Nhập số điện thoại Mỹ gồm 10 chữ số, ví dụ (623) 555-0123.",
      email: "Nhập địa chỉ email như ten@example.com, hoặc để trống.",
      accident_date: "Ngày tai nạn không thể là một ngày trong tương lai.",
      message_long: "Dùng tối đa {max} ký tự.",
      consent: "Đánh dấu ô này để chúng tôi có thể liên hệ với quý vị.",
      bad_request: "Không gửi được yêu cầu. Vui lòng thử lại hoặc gọi cho chúng tôi theo số {phone}.",
      send_failed: "Không gửi được yêu cầu. Vui lòng gọi cho chúng tôi theo số {phone}.",
      too_many: "Quá nhiều yêu cầu. Vui lòng gọi cho chúng tôi theo số {phone}.",
      network: "Không kết nối được với máy chủ. Hãy kiểm tra kết nối và thử lại, hoặc gọi cho chúng tôi theo số {phone}.",
    },
  },

  home: {
    h1: "Nắn chỉnh cột sống cho chấn thương do tai nạn xe hơi tại Glendale, Arizona",
    intro:
      "Nếu quý vị hoặc người thân vừa gặp tai nạn xe hơi, quý vị nên được khám nắn chỉnh cột sống kỹ lưỡng để tìm ra những chấn thương tiềm ẩn có thể ảnh hưởng đến mình nhiều năm sau. Điều tệ nhất là chờ xem cơn đau có tự hết hay không. Hãy gọi hôm nay để được hẹn khám trong ngày hoặc ngày hôm sau.",
    heroPoints: ["Hẹn khám trong ngày", "Không tốn tiền túi khi tài xế khác có lỗi", "Không cần bảo hiểm sức khỏe"],
    injuriesTitle: "Các chấn thương do tai nạn xe hơi chúng tôi điều trị",
    injuriesLead:
      "Bác sĩ nắn chỉnh cột sống và bác sĩ y khoa của chúng tôi chỉ điều trị chấn thương do tai nạn xe hơi và tai nạn lao động. Chọn triệu chứng của quý vị để tìm hiểu thêm.",
    costTitle: "Không tốn tiền túi khi quý vị không có lỗi",
    costText:
      "Nếu người khác gây ra tai nạn, phòng khám sẽ gửi hóa đơn cho bảo hiểm của người có lỗi và chờ thanh toán. Phòng khám của chúng tôi có hơn 10 năm kinh nghiệm chăm sóc nạn nhân tai nạn mà họ không phải tự trả tiền.",
    costLink: "Vì sao quý vị không tốn tiền túi",
    billingPoints: [
      "Chúng tôi gửi hóa đơn cho bảo hiểm của người có lỗi và chờ thanh toán.",
      "Không cần bảo hiểm sức khỏe.",
      "Nếu quý vị có luật sư, chúng tôi làm việc theo quyền lưu giữ (lien) và chờ thanh toán.",
      "Mọi giấy tờ đều do chúng tôi lo.",
    ],
    careLabel: "Điều trị giảm đau và ngôn ngữ",
    painTitle: "Điều trị giảm đau ngay tại phòng khám",
    painText:
      "Chúng tôi điều trị giảm đau cho các chấn thương của quý vị với bác sĩ y khoa, bác sĩ chỉnh hình và bác sĩ chuyên khoa giảm đau, không tốn tiền túi khi tài xế khác có lỗi. Có lịch hẹn khẩn cấp: gọi hôm nay và gặp bác sĩ ngay hôm nay.",
    painLink: "Về điều trị giảm đau",
    teamTitle: "Bác sĩ nắn chỉnh cột sống và bác sĩ y khoa dưới một mái nhà",
    teamLead: "Bốn bác sĩ nắn chỉnh cột sống và một bác sĩ điều trị giảm đau, ngày nào cũng điều trị chấn thương do tai nạn xe hơi.",
    teamLink: "Tìm hiểu thêm về phòng khám",
    faqTitle: "Thắc mắc sau tai nạn xe hơi",
    faqLead: "Câu trả lời thẳng thắn về phòng cấp cứu, hư hại nhẹ và ai là người trả tiền.",
    faqLink: "Đọc cả {count} câu hỏi",
    areasTitle: "Khu vực chúng tôi phục vụ",
    areasLead: "Bệnh nhân tai nạn xe hơi đến với chúng tôi từ Glendale, Arrowhead Ranch và các khu dân cư lân cận sau đây.",
    blogTitle: "Từ blog",
    blogLink: "Tất cả bài viết",
  },

  page: {
    ourDoctors: "Các bác sĩ của chúng tôi",
    relatedInjuries: "Chấn thương liên quan",
    aboutTeamLead: "Các bác sĩ nắn chỉnh cột sống và một bác sĩ y khoa chuyên điều trị giảm đau cùng làm việc tại một phòng khám.",
  },

  blog: {
    title: "Bài viết về chấn thương do tai nạn xe hơi | Glendale",
    description:
      "Bài viết về chấn thương do tai nạn xe hơi, nắn chỉnh cột sống và những lầm tưởng về bảo hiểm, từ phòng khám của chúng tôi ở Glendale, Arizona.",
    crumb: "Blog",
    h1: "Bài viết về chấn thương do tai nạn xe hơi",
    lead: "Nghiên cứu và câu trả lời dễ hiểu về chấn thương do tai nạn xe hơi, nắn chỉnh cột sống và bảo hiểm.",
    published: "Đăng ngày",
    updated: "Cập nhật",
  },

  contact: {
    title: "Liên hệ | Nắn chỉnh cột sống sau tai nạn tại Glendale",
    description:
      "Gọi {phone} hoặc yêu cầu gọi lại. Hẹn khám trong ngày cho chấn thương do tai nạn xe hơi tại Glendale, AZ. Chúng tôi nói tiếng Anh và tiếng Tây Ban Nha.",
    h1: "Liên hệ",
    lead: "Gọi để được hẹn khám trong ngày, hoặc gửi biểu mẫu và chúng tôi sẽ gọi lại.",
    formTitle: "Yêu cầu gọi lại",
    required: "Các mục không ghi “không bắt buộc” đều phải điền.",
    visit: "Đến phòng khám",
    mapTitle: "Bản đồ đến {name}",
    mapPlaceholder: "Bản đồ sẽ hiển thị khi địa chỉ được xác nhận",
  },

  notFound: {
    title: "Không tìm thấy trang | {name}",
    description: "Trang quý vị tìm không tồn tại hoặc đã được chuyển đi.",
    eyebrow: "Không tìm thấy trang",
    h1: "Trang này đã rẽ nhầm đường",
    text: "Trang quý vị tìm không tồn tại hoặc đã được chuyển đi. Nếu quý vị bị thương trong tai nạn xe hơi, quý vị vẫn có thể gọi cho chúng tôi ngay hoặc bắt đầu từ trang chủ.",
    home: "Về trang chủ",
    contact: "Liên hệ",
  },
};

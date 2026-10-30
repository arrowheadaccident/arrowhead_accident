import type { Dictionary } from "./en";

// Vietnamese, addressing the reader as "quý vị". The staff speak English and Spanish only, so the copy says so
// instead of "Hablamos Español". Machine-assisted translation: have a native speaker review it before launch
// (docs/CONTENT-NOTES.md).
export const vi: Dictionary = {
  meta: {
    homeTitle: "Nắn chỉnh cột sống sau tai nạn xe hơi tại Glendale, AZ",
    homeDescription:
      "Bị thương trong tai nạn xe hơi ở Glendale hoặc Arrowhead Ranch? Khám nắn chỉnh cột sống sớm và không phải tự chi trả khi tài xế khác có lỗi.",
    ogImageAlt: "{name}, Glendale, AZ. Gọi {phone}",
  },

  common: {
    skipLink: "Chuyển đến nội dung chính",
    home: "Trang chủ",
    call: "Gọi {phone}",
    requestCallback: "Yêu cầu gọi lại",
    mainNav: "Điều hướng chính",
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
  },

  nav: {
    about: "Giới thiệu",
    treatments: "Điều trị chấn thương",
    painManagement: "Giảm đau",
    noCost: "Không phải tự chi trả",
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
    languages: "Ngôn ngữ",
    aboutTitle: "Chăm sóc chấn thương do tai nạn xe hơi",
    noCostLead: "Không phải tự chi trả.",
    noCost:
      "Nếu tai nạn do người khác gây ra, {name} sẽ gửi hóa đơn cho bảo hiểm của người có lỗi và chờ thanh toán. Quý vị không cần bảo hiểm sức khỏe. Nếu quý vị có luật sư, chúng tôi sẽ làm việc với luật sư theo thỏa thuận thanh toán từ khoản bồi thường (lien) và chờ thanh toán. Chúng tôi lo toàn bộ giấy tờ cho quý vị.",
    experience: "Phòng khám có hơn 10 năm kinh nghiệm chăm sóc nạn nhân tai nạn mà quý vị không phải tự chi trả.",
    appointments: "Có lịch hẹn sớm. Hãy gọi để đặt lịch khám trong ngày hoặc vào ngày làm việc kế tiếp của phòng khám:",
    painManagement:
      "Chúng tôi điều trị giảm đau cho chấn thương của quý vị với bác sĩ y khoa và bác sĩ chuyên về giảm đau, và giới thiệu khám chỉnh hình khi cần, mà quý vị không phải tự chi trả.",
    callUs: "Hãy gọi cho chúng tôi:",
    clinicTitle: "Nắn chỉnh cột sống sau tai nạn xe hơi tại Glendale, Arizona",
    contactTitle: "Liên hệ",
  },

  ctaBand: {
    title: "Bị thương trong tai nạn xe hơi? Đừng chần chừ, hãy đi khám sớm.",
    text: "Hẹn khám trong ngày vào các ngày phòng khám mở cửa, và không phải tự chi trả khi tài xế khác có lỗi.",
  },

  callCta: {
    label: "Đặt lịch khám",
    title: "Khám sớm cho chấn thương do tai nạn xe hơi.",
    before: "Hãy gọi ngay, hoặc ",
    link: "yêu cầu chúng tôi gọi lại",
    after: ".",
  },
  video: {
    play: "Phát video",
  },

  sidebar: {
    label: "Liên hệ phòng khám",
    title: "Bị thương trong tai nạn? Hãy đi khám sớm.",
  },

  costAndQuestions: {
    title: "Có thắc mắc về chi phí hoặc bảo hiểm?",
    noCost: "Tìm hiểu về điều trị không phải tự chi trả",
    faq: "Hỏi đáp về tai nạn xe hơi",
  },

  hours: {
    closed: "Đóng cửa",
    openUntil: "Hôm nay mở cửa đến {time}",
    openUntilReopens: "Mở cửa đến {time}, mở lại lúc {reopen}",
    opensToday: "Hôm nay mở cửa lúc {time}",
    opensTomorrow: "Hiện đã đóng cửa. Mở cửa lúc {time} ngày mai",
    opensOn: "Hiện đã đóng cửa. Mở cửa lúc {time} {day}",
    closedNow: "Hiện đã đóng cửa",
  },

  howItWorks: {
    title: "Chăm sóc từ lúc khám đến khi hồi phục",
    lead: "Quý vị tập trung hồi phục. Chúng tôi phối hợp việc khám, hồ sơ điều trị và thanh toán với bảo hiểm.",
    steps: [
      {
        title: "Gọi cho chúng tôi",
        text: "Gọi điện hoặc yêu cầu gọi lại. Có lịch hẹn trong ngày hoặc vào ngày làm việc kế tiếp của phòng khám, kể cả khi quý vị đã đến phòng cấp cứu.",
      },
      {
        title: "Khám kỹ và lập hồ sơ",
        text: "Khám kỹ cột sống và kiểm tra chỉnh hình giúp xác định chấn thương. Chúng tôi ghi nhận kết quả để hỗ trợ việc chăm sóc và hồ sơ bồi thường.",
      },
      {
        title: "Kế hoạch điều trị của quý vị",
        text: "Kế hoạch có thể gồm nắn chỉnh cột sống và điều trị giảm đau, kèm giới thiệu chụp MRI hoặc khám chỉnh hình khi cần.",
      },
      {
        title: "Chúng tôi lo việc thanh toán",
        text: "Khi tài xế khác có lỗi, chúng tôi gửi hóa đơn cho bảo hiểm của họ và phối hợp với luật sư của quý vị, nếu có. Hãy gọi để trao đổi về cách thanh toán.",
      },
    ],
  },

  team: {
    sampleTag: "Hồ sơ mẫu",
    sampleBio: "Tiểu sử mẫu.",
    roles: {
      "Founder and Chiropractic Physician": "Người sáng lập, bác sĩ nắn chỉnh cột sống",
      "Chiropractic Physician": "Bác sĩ nắn chỉnh cột sống",
      "Pain Management Physician": "Bác sĩ điều trị giảm đau",
    },
  },

  founder: {
    eyebrow: "Gặp gỡ người sáng lập",
    credentialsTitle: "Bằng cấp và chứng nhận",
    credentials: [
      "Chứng nhận của American Board of Forensic Professionals (DABFP)",
      "Chứng nhận về chấn thương học chấn thương giật cổ (whiplash) và chấn thương não",
      "Chứng nhận về phân tích rủi ro pháp y trong va chạm tốc độ thấp",
      "Hội viên (Fellow) về châm cứu y khoa (FIAMA)",
    ],
    story: [
      "Bác sĩ Vaughn Anthony Movses, D.C., là một bác sĩ nắn chỉnh cột sống được kính trọng, tận tâm mang đến sự chăm sóc xuất sắc cho bệnh nhân tại Glendale, AZ. Với nền tảng đào tạo y khoa sâu rộng và cách tiếp cận đầy cảm thông, Bác sĩ Movses mang đến các giải pháp chăm sóc sức khỏe cá nhân hóa, phù hợp với nhu cầu riêng của từng bệnh nhân. Sự tận tụy của ông đối với sức khỏe bệnh nhân vượt ra ngoài phạm vi y khoa truyền thống, vì ông ưu tiên xây dựng mối quan hệ tin cậy và khuyến khích giao tiếp cởi mở.",
      "Bệnh nhân có thể mong đợi sự chăm sóc toàn diện và tận tình từ Bác sĩ Movses, người luôn tâm huyết cập nhật những tiến bộ mới nhất trong lĩnh vực. Tọa lạc thuận tiện tại {street} ở Glendale, AZ,",
      "Bác sĩ Movses chào đón mọi người ở mọi lứa tuổi và hoàn cảnh đến với phòng khám, nơi họ nhận được sự chăm sóc y tế đạt tiêu chuẩn cao nhất trong một môi trường ấm áp và thân thiện.",
    ],
    quote:
      "Một vụ tai nạn xe có thể đảo lộn cuộc sống của quý vị chỉ trong vài giây. Mục tiêu của tôi rất đơn giản: khám kỹ lưỡng, giải thích trung thực và lập kế hoạch điều trị phù hợp với chấn thương của quý vị, để quý vị hồi phục và trở lại nhịp sống thường ngày.",
    link: "Xem hồ sơ đầy đủ",
  },

  cards: {
    readArticle: "Đọc bài viết",
  },

  form: {
    title: "Yêu cầu gọi lại",
    intro: "Điền biểu mẫu mất chưa đến một phút. Các mục đều bắt buộc, trừ mục được ghi là không bắt buộc.",
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
    sentTitle: "Cảm ơn quý vị. Chúng tôi sẽ gọi lại trong giờ làm việc.",
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
      "Nếu quý vị hoặc người thân gặp tai nạn xe hơi, khám kỹ có thể giúp xác định chấn thương và định hướng chăm sóc. Triệu chứng có thể chưa xuất hiện ngay. Hãy gọi để đặt lịch khám trong ngày hoặc vào ngày làm việc kế tiếp của phòng khám.",
    heroPoints: ["Hẹn khám trong ngày vào các ngày phòng khám mở cửa", "Không phải tự chi trả khi tài xế khác có lỗi", "Không cần bảo hiểm sức khỏe"],
    injuriesTitle: "Các chấn thương do tai nạn xe hơi chúng tôi điều trị",
    injuriesLead:
      "Bác sĩ nắn chỉnh cột sống và bác sĩ y khoa của chúng tôi tập trung vào chấn thương do tai nạn xe hơi và tai nạn lao động. Chọn triệu chứng hoặc chấn thương để tìm hiểu thêm.",
    costTitle: "Không phải tự chi trả khi quý vị không có lỗi",
    costText:
      "Nếu người khác gây ra tai nạn, phòng khám sẽ gửi hóa đơn cho bảo hiểm của người có lỗi và chờ thanh toán. Phòng khám của chúng tôi có hơn 10 năm kinh nghiệm chăm sóc nạn nhân tai nạn mà họ không phải tự trả tiền.",
    costLink: "Tìm hiểu về điều trị không phải tự chi trả",
    billingPoints: [
      "Chúng tôi gửi hóa đơn cho bảo hiểm của người có lỗi và chờ thanh toán.",
      "Không cần bảo hiểm sức khỏe.",
      "Nếu có luật sư, quý vị có thể được hoãn thanh toán theo thỏa thuận thanh toán từ khoản bồi thường (lien) đến khi hồ sơ được giải quyết.",
      "Mọi giấy tờ đều do chúng tôi lo.",
    ],
    faqTitle: "Thắc mắc sau tai nạn xe hơi",
    faqLead: "Giải đáp rõ ràng về việc đi cấp cứu, xe hư hại nhẹ và chi phí điều trị.",
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
      "Gọi {phone} hoặc yêu cầu gọi lại. Hẹn khám sớm cho chấn thương do tai nạn xe hơi tại Glendale, AZ. Chúng tôi nói tiếng Anh và tiếng Tây Ban Nha.",
    h1: "Liên hệ",
    lead: "Gọi để đặt lịch khám, hoặc gửi biểu mẫu và chúng tôi sẽ gọi lại trong giờ làm việc.",
    formTitle: "Yêu cầu gọi lại",
    required: "Các mục đều bắt buộc, trừ mục được ghi là không bắt buộc.",
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

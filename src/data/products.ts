import type { Product, ProductStatus } from "@/types";

export const productsSection = {
  id: "san-pham",
  eyebrow: "Sản phẩm",
  title: "Mấy sản phẩm mình đang làm",
  description:
    "Sau khi ngừng bán khóa học thì giờ mình dành phần lớn thời gian để tự làm sản phẩm. Phần lớn là công cụ mình làm ra để tự dùng trước, thấy ổn rồi mới chia sẻ cho các bạn, từ skill cho coding agent tới app luyện nói tiếng Anh.",
};

export const productStatusLabel: Record<ProductStatus, string> = {
  new: "Mới ra mắt",
  free: "Miễn phí",
  soon: "Sắp có",
  live: "Đang chạy",
};

export const products: Product[] = [
  {
    id: "evondev-kit",
    name: "evondevKit UI/UX",
    kind: "Skill cho coding agent",
    tagline: "Giúp AI làm UI app như một designer.",
    description:
      "Sản phẩm mới nhất của mình. Skill đọc codebase của các bạn, đưa ra 2–3 wireframe để chọn rồi mới dựng bằng component có sẵn trong dự án.",
    points: [
      "Đã qua 70 prompt test",
      "Có wireframe trước khi viết code",
      "Tự kiểm tra từ 375px tới 1920px",
    ],
    status: "new",
    image: { alt: "evondevKit UI/UX: UI dashboard không còn mùi AI" },
    commandLabel: "Cài trong Claude Code",
    command: "/plugin marketplace add evondev/evondevKit\n/plugin install evon@evondevkit",
    cta: { label: "Xem evondevKit UI/UX", href: "https://evondev-uiux.vercel.app/ui-ux" },
  },
  {
    id: "teach-template",
    name: "Teach Template",
    kind: "Skill cho coding agent",
    tagline: "Biến agent thành gia sư dạy bạn từng bài một.",
    description:
      "Skill /teach của Matt Pocock kèm 27 rule dạy học mình tự đúc kết. Gọi /teach kèm thứ muốn học là agent lên lộ trình và dạy từng bài.",
    points: [
      "27 rule dạy học đi kèm",
      "Mỗi bài học là một trang HTML",
      "Chạy với Claude Code, Codex, Antigravity",
    ],
    status: "free",
    image: { alt: "Ảnh bìa Teach Template: 27 rules, design system" },
    commandLabel: "Trong agent",
    command: "/teach dạy tôi Next.js, tôi đã biết React",
    cta: { label: "Xem chi tiết", href: "https://speaknowenglish.org/teach-template" },
  },
  {
    id: "speaknow",
    name: "SpeakNow",
    kind: "Web app",
    tagline: "Luyện nói tiếng Anh bằng shadowing và trò chuyện với AI.",
    description:
      "Chọn một video, nghe từng câu rồi nói lại, AI sẽ chỉ ra các bạn hụt ở từ nào. Quen rồi thì qua trò chuyện với AI.",
    points: [
      "133 bài cắt sẵn theo câu",
      "AI chấm theo từng từ",
      "Trò chuyện với AI 15 phút mỗi tối",
    ],
    status: "live",
    image: { alt: "Trang chủ SpeakNow: nói theo người bản xứ cho tới khi miệng quen" },
    cta: { label: "Dùng thử SpeakNow", href: "https://speaknowenglish.org" },
  },
  {
    id: "personal-tracker",
    name: "Personal Tracker",
    kind: "Chrome extension",
    tagline: "Mở tab mới là thấy việc cần làm.",
    description:
      "Extension biến tab mới thành bảng việc gồm 5 widget. Bấm Cmd+T là thấy ngay hôm nay còn gì chưa xong.",
    points: [
      "Kanban, xem được cả lịch tháng",
      "Nhắc việc lặp lại theo chu kỳ",
      "Dữ liệu nằm trong máy, không cần đăng nhập",
    ],
    status: "free",
    image: { alt: "Trang New Tab của Personal Tracker với 5 widget" },
    cta: { label: "Xem chi tiết", href: "https://speaknowenglish.org/personal-tracker" },
  },
];

import type { FaqItem } from "@/types";

export const faqSection = {
  id: "hoi-nhanh",
  eyebrow: "Hỏi nhanh",
  title: "Một vài câu các bạn hay hỏi mình",
  description:
    "Nếu không thấy câu hỏi của bạn ở đây thì cứ để lại bình luận dưới video hoặc nhắn mình trên TikTok nhé.",
};

export const faqs: FaqItem[] = [
  {
    question: "Evondev còn bán khóa học không?",
    answer:
      "Hiện tại mình đã ngừng bán tất cả các khóa học cũ rồi nhé. Mình đang chuẩn bị mấy khóa mới phù hợp hơn với thời AI, khi nào có lịch ra mắt thì mình báo trên kênh YouTube đầu tiên.",
  },
  {
    question: "evondevKit UI/UX là gì?",
    answer:
      "Đây là bộ skill cho coding agent mà mình viết, dùng được với Claude Code, Cursor, Codex, OpenCode, Antigravity và ZCode. Skill đầu tiên là evon:ui-ux, giúp agent làm UI app theo cách một designer làm: đưa brief và 2–3 wireframe cho các bạn chọn rồi mới dựng. Bộ này miễn phí và mã nguồn mở.",
  },
  {
    question: "Teach Template có mất phí không?",
    answer:
      "Không mất phí đâu các bạn. Trên trang Teach Template mình có giải thích chi tiết bộ này gồm những gì và cách cài cho từng tool, các bạn vào xem rồi nhận file ở đó nhé.",
  },
  {
    question: "Personal Tracker cài ở đâu?",
    answer:
      "Các bạn vào trang Personal Tracker trên speaknowenglish.org nhé, ở đó mình có giải thích từng widget và cách cài. Extension này miễn phí, nhận file qua email.",
  },
];

export const ctaSection = {
  eyebrow: "Theo dõi",
  title: "Cảm ơn bạn đã lăn chuột tới dưới này nha",
  description:
    "Nếu thấy mấy thứ mình chia sẻ có ích thì các bạn theo dõi mình trên YouTube, TikTok hoặc ghé blog đọc bài nhé. Có gì mới là mình đăng ở đó đầu tiên.",
};

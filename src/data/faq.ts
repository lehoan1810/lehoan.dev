import type { FaqItem, SectionMeta } from "@/types";

export const faqSection: SectionMeta = {
  id: "hoi-dap",
  index: "05",
  eyebrow: "Hỏi đáp",
  title: "Vài câu hỏi hay gặp",
  description: "Nếu bạn đang cân nhắc làm việc cùng mình, có lẽ đây là những điều bạn muốn biết.",
};

export const faqs: FaqItem[] = [
  {
    question: "Bạn mạnh nhất ở phần nào?",
    answer:
      "Frontend: dựng giao diện đúng thiết kế, responsive, dễ truy cập và tối ưu hiệu năng, SEO với React và Next.js. Chính trang này là một ví dụ: prerender tĩnh, dữ liệu GitHub được cache và JavaScript gửi xuống trình duyệt ở mức tối thiểu.",
  },
  {
    question: "Vì sao bạn chuyển sang Fullstack?",
    answer:
      "Để hiểu trọn luồng dữ liệu của sản phẩm, từ database tới giao diện. Nhờ vậy mình phối hợp với backend tốt hơn và có thể tự làm một sản phẩm hoàn chỉnh.",
  },
  {
    question: "Bạn làm việc với AI như thế nào?",
    answer:
      "AI viết code, mình chịu trách nhiệm 🤖. Mình dùng AI để tăng tốc những phần lặp lại, còn kiến trúc, review và chất lượng cuối cùng vẫn là việc của mình.",
  },
  {
    question: "Liên hệ với bạn bằng cách nào?",
    answer: "Nhắn cho mình qua GitHub hoặc các kênh ở cuối trang, mình sẽ phản hồi sớm nhất có thể.",
  },
];

export const contactSection = {
  id: "lien-he",
  title: "Cùng build gì đó nhé?",
  description:
    "Mình luôn sẵn lòng trao đổi về frontend, Next.js hay hành trình học fullstack. Một lời chào cũng được.",
};

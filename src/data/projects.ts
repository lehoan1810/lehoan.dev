import type { Project, SectionMeta } from "@/types";

export const projectsSection: SectionMeta = {
  id: "du-an",
  index: "01",
  eyebrow: "Dự án",
  title: "Sản phẩm thật, người dùng thật",
  description:
    "Hai sản phẩm mình đã tham gia làm frontend, cùng nằm trong hệ sinh thái Askany.",
};

/**
 * `features` mô tả sản phẩm (thông tin công khai).
 * TODO: điền `contributions` (phần bạn làm), `period`, `stack` và ảnh chụp màn hình.
 * Trường nào để trống sẽ tự ẩn trên giao diện. Chỉ đưa thông tin công khai được.
 */
export const projects: Project[] = [
  {
    id: "preny",
    name: "Preny.ai",
    url: "https://preny.ai",
    kind: "AI Chatbot · SaaS",
    tagline: "Chatbot AI chăm sóc khách hàng và chốt sale trên nhiều nền tảng",
    description:
      "Preny giúp doanh nghiệp tạo chatbot AI từ dữ liệu riêng như tài liệu, website hay FAQ mà không cần viết code, rồi gắn vào fanpage, website và các kênh nhắn tin để trả lời khách ngay lập tức.",
    features: [
      "Huấn luyện chatbot từ tài liệu, website và FAQ",
      "Trả lời khách hàng trên nhiều nền tảng nhắn tin",
      "Phản hồi tin nhắn từ quảng cáo để tăng chuyển đổi",
    ],
    contributions: [],
    role: "Frontend Developer",
    image: { alt: "Ảnh chụp giao diện Preny.ai" },
  },
  {
    id: "askany",
    name: "Askany",
    url: "https://askany.com",
    kind: "Marketplace · Tư vấn",
    tagline: "Nền tảng kết nối người dùng và doanh nghiệp với chuyên gia tư vấn",
    description:
      "Askany kết nối khách hàng với cộng đồng chuyên gia ở nhiều lĩnh vực, để được tư vấn nhanh, đúng người và tiết kiệm chi phí.",
    features: [
      "Danh mục chuyên gia theo từng lĩnh vực",
      "Kết nối khách hàng với chuyên gia phù hợp",
      "Cộng đồng chuyên gia, chuyên viên và doanh nghiệp",
    ],
    contributions: [],
    role: "Frontend Developer",
    image: { alt: "Ảnh chụp giao diện Askany" },
  },
];

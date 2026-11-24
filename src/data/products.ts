import type { Product, ProductStatus } from "@/types";

export const productsSection = {
  id: "du-an",
  eyebrow: "Dự án",
  title: "Sản phẩm thật, người dùng thật",
  description:
    "Các sản phẩm mình tham gia làm frontend trong hệ sinh thái Askany, cùng một dự án open-source làm với bạn bè.",
};

export const productStatusLabel: Record<ProductStatus, string> = {
  new: "Mới ra mắt",
  free: "Miễn phí",
  soon: "Sắp có",
  live: "Đang chạy",
  oss: "Mã nguồn mở",
};

/**
 * `points` mô tả sản phẩm (thông tin công khai).
 * TODO: thêm ảnh chụp màn hình (`image.src`), để trống thì hiện placeholder.
 */
export const products: Product[] = [
  {
    id: "preny",
    name: "Preny.ai",
    kind: "AI Chatbot · SaaS",
    tagline: "Chatbot AI chăm sóc khách hàng và chốt sale trên nhiều nền tảng",
    description:
      "Preny giúp doanh nghiệp tạo chatbot AI từ dữ liệu riêng như tài liệu, website hay FAQ mà không cần viết code, rồi gắn vào fanpage, website và các kênh nhắn tin để trả lời khách ngay lập tức.",
    points: [
      "Huấn luyện chatbot từ tài liệu, website và FAQ",
      "Trả lời khách hàng trên nhiều nền tảng nhắn tin",
      "Phản hồi tin nhắn từ quảng cáo để tăng chuyển đổi",
    ],
    status: "live",
    image: { alt: "Ảnh chụp giao diện Preny.ai" },
    cta: { label: "Truy cập preny.ai", href: "https://preny.ai" },
  },
  {
    id: "askany",
    name: "Askany",
    kind: "Marketplace · Tư vấn",
    tagline: "Nền tảng kết nối người dùng và doanh nghiệp với chuyên gia tư vấn",
    description:
      "Askany kết nối khách hàng với cộng đồng chuyên gia ở nhiều lĩnh vực, để được tư vấn nhanh, đúng người và tiết kiệm chi phí.",
    points: [
      "Danh mục chuyên gia theo từng lĩnh vực",
      "Kết nối khách hàng với chuyên gia phù hợp",
      "Cộng đồng chuyên gia, chuyên viên và doanh nghiệp",
    ],
    status: "live",
    image: { alt: "Ảnh chụp giao diện Askany" },
    cta: { label: "Truy cập askany.com", href: "https://askany.com" },
  },
  {
    id: "topchuyengia",
    name: "Top Chuyên Gia",
    kind: "Cộng đồng · Nội dung",
    tagline: "Tư vấn từ kinh nghiệm thực tế, kết nối người đọc với chuyên gia",
    description:
      "Trang cộng đồng chia sẻ kiến thức và kinh nghiệm thực tế của chuyên gia ở nhiều lĩnh vực như du học, luật, tài chính, marketing hay SEO. Người đọc có thể đặt lịch tư vấn 1:1 với chuyên gia qua Askany.",
    points: [
      "Bài hướng dẫn và danh sách chuyên gia theo từng lĩnh vực",
      "Kết nối tư vấn 1:1 với chuyên gia qua Askany",
      "Xếp hạng tác giả, lọc bài mới nhất và nổi bật",
    ],
    status: "live",
    image: { alt: "Ảnh chụp giao diện Top Chuyên Gia" },
    cta: { label: "Truy cập topchuyengia.vn", href: "https://topchuyengia.vn" },
  },
  {
    id: "waterbus",
    name: "Waterbus",
    kind: "Open-source · WebRTC",
    tagline: "Bộ công cụ WebRTC mã nguồn mở cho video, audio và dữ liệu thời gian thực",
    description:
      "Dự án open-source mình làm cùng bạn bè. Waterbus là một WebRTC SFU viết bằng Rust, dùng cho họp video, livestream và giám sát thời gian thực, có sẵn SDK cho Flutter và phát hành theo giấy phép Apache 2.0.",
    points: [
      "Media server viết bằng Rust, độ trễ thấp",
      "Hỗ trợ cả SFU lẫn P2P, simulcast theo băng thông",
      "Stream ra HLS, mở rộng theo chiều ngang với Redis",
    ],
    status: "oss",
    image: { alt: "Ảnh chụp trang chủ Waterbus" },
    cta: { label: "Truy cập waterbus.tech", href: "https://waterbus.tech" },
  },
];

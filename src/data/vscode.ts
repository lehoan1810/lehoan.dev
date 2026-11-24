import type { VSCodeItem } from "@/types";

export const vscodeSection = {
  id: "vscode",
  eyebrow: "VS Code",
  title: "Theme và extension cho VS Code",
  description:
    "Hồi còn cắt giao diện mỗi ngày, mình có làm một theme và mấy extension nhỏ để code nhanh hơn. Tới giờ cả bốn đã có hơn 417K lượt cài trên VS Code Marketplace, các bạn cài miễn phí nhé.",
  footnote: "Số liệu từ VS Code Marketplace, tháng 10/2026",
};

const marketplace = (id: string) =>
  `https://marketplace.visualstudio.com/items?itemName=${id}`;

export const vscodeItems: VSCodeItem[] = [
  {
    type: "Theme",
    name: "Evondev Dracula",
    description:
      "Theme mình làm dựa trên Dracula Official nhưng tăng độ tương phản lên, ngồi code lâu nhìn đỡ mỏi mắt hơn.",
    installs: "163K+",
    rating: "5.0",
    href: marketplace("evondev.dracula-high-contrast"),
    image: { alt: "Trang Evondev Dracula trong VS Code" },
  },
  {
    type: "Extension",
    name: "Indent Rainbow Palettes",
    description:
      "Tô màu từng cấp thụt lề theo bảng màu cầu vồng, code lồng nhau nhiều tầng nhìn một cái là biết đang ở cấp nào.",
    installs: "147K+",
    rating: "5.0",
    href: marketplace("evondev.indent-rainbow-palettes"),
    image: { alt: "Trang Indent Rainbow Palettes trong VS Code" },
  },
  {
    type: "Extension",
    name: "Evondev Snippets",
    description:
      "Bộ snippets HTML CSS mình hay dùng nhất khi cắt giao diện, gõ vài ký tự là ra nguyên đoạn code menu, dropdown, modal.",
    installs: "56K+",
    rating: "4.9",
    href: marketplace("evondev.evondev-snippets"),
    image: { alt: "Trang Evondev Snippets trong VS Code" },
  },
  {
    type: "Extension",
    name: "HTML to CSS Class",
    description:
      "Bôi đen đoạn HTML rồi chạy lệnh là copy ra hết class thành CSS hoặc Sass, dán vào file style là xong.",
    installs: "49K+",
    rating: "5.0",
    href: marketplace("evondev.generate-css-class"),
    image: { alt: "Trang HTML to CSS Class trong VS Code" },
  },
];

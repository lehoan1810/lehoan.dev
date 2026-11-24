import type { JourneyItem } from "@/types";

export const journeySection = {
  id: "hanh-trinh",
  eyebrow: "Hành trình",
  title: "Hành trình 10 năm làm Frontend của mình",
  description:
    "Từ lúc ra trường đi làm HTML CSS cho tới bây giờ, năm nào mình cũng có vài thay đổi khá lớn. Mình ghi lại ở đây kèm mấy tấm ảnh, vừa để sau này nhìn lại cho vui, vừa để các bạn biết mình đã đi qua những gì.",
};

export const journey: JourneyItem[] = [
  {
    year: "2016",
    title: "Khởi đầu hành trình",
    description:
      "Sau khi thực tập 4 tháng cuối năm 2015, mình nghỉ Tết rồi bắt đầu đi tìm việc. Rải CV khá nhiều nơi và cuối cùng thì mình cũng có công việc đầu tiên với vị trí HTML CSS Developer tại công ty InceptionLabs.",
    media: [{ alt: "Văn phòng InceptionLabs năm 2016", position: "center 30%" }],
  },
  {
    year: "2017",
    title: "Thay đổi công ty",
    description:
      "Sau chuyến du lịch Vịnh Hạ Long với công ty thì tới giữa năm 2017 mình nghỉ việc và chuyển qua công ty mới. Thời điểm đó mình chủ yếu làm WordPress, dùng mấy công cụ kéo thả rồi tùy biến lại giao diện.",
    media: [{ alt: "Vịnh Hạ Long năm 2017", position: "center 40%" }],
  },
  {
    year: "2018",
    title: "Bắt đầu học JavaScript",
    description:
      "Tới năm 2018 thì mình mới bắt đầu học JavaScript một cách nghiêm túc để trở thành Frontend Developer. Cũng trong năm này mình bắt đầu viết blog evondev.com, và thương hiệu Evondev ra đời từ đây.",
    links: [{ label: "evondev.com", href: "https://evondev.com" }],
    media: [{ alt: "Banner blog Evondev năm 2018" }],
  },
  {
    year: "2019",
    title: "Xây dựng nền tảng KTcity",
    description:
      "Năm này mình bắt đầu học ReactJS, rồi cùng một anh bạn mới vào công ty xây dựng nên KTcity, nền tảng học trực tuyến mà sau này các bạn học viên học khóa học của mình trên đó.",
    media: [{ alt: "Trang khóa học ReactJS trên KTcity", position: "left top" }],
  },
  {
    year: "2020",
    title: "Tạo khóa học đầu tiên",
    description:
      "KTcity ra mắt được một năm thì mình tận dụng luôn nền tảng có sẵn của công ty. Kết hợp với mấy năm đi làm và chia sẻ trên blog, mình quyết định làm khóa học đầu tiên là HTML CSS cơ bản dành cho người mới.",
    media: [{ alt: "Ảnh bìa khóa HTML CSS cơ bản" }],
  },
  {
    year: "2021–2022",
    title: "Ra mắt thêm nhiều khóa học",
    description:
      "Hai năm này mình tiếp tục ra mắt thêm khóa cắt giao diện từ Photoshop, JavaScript và React. Đồng thời mình cũng đẩy mạnh chia sẻ kiến thức dưới dạng video trên kênh YouTube và TikTok.",
    media: [{ alt: "Ảnh bìa khóa JavaScript" }],
  },
  {
    year: "2023",
    title: "Dạy học và làm nội dung nhiều hơn",
    description:
      "Năm này mình làm thêm các khóa học mới, chia sẻ nhiều hơn trên Facebook, YouTube và TikTok, vừa dạy online vừa dạy offline.",
    media: [{ alt: "Ảnh bìa khóa HTML CSS Master" }],
  },
  {
    year: "2024",
    title: "Khóa Next.js 14 và evonhub.dev",
    description:
      "Mình ra mắt khóa Next.js 14, hướng dẫn xây dựng một nền tảng học lập trình trực tuyến từ A tới Z với Next.js và MongoDB. Tháng 5 năm đó mình cũng ra mắt evonhub.dev, nền tảng học mới của mình.",
    links: [{ label: "evonhub.dev", href: "https://evonhub.dev" }],
    media: [{ alt: "Ảnh bìa khóa Next.js 14" }],
  },
  {
    year: "2026",
    title: "Ngừng bán khóa học, tập trung làm sản phẩm",
    description:
      "Năm nay mình ngừng bán toàn bộ khóa học cũ để tập trung làm sản phẩm và chuẩn bị mấy khóa mới cho thời AI. Mới nhất là evondevKit UI/UX, bộ skill giúp AI làm UI như một designer, bên cạnh SpeakNow, Teach Template và Personal Tracker.",
    links: [{ label: "evondevKit UI/UX", href: "https://evondev-uiux.vercel.app/ui-ux" }],
    media: [
      { alt: "evondevKit UI/UX", position: "left center" },
      { alt: "Trang chủ SpeakNow", position: "left top" },
    ],
  },
  {
    year: "Hiện tại",
    title: "Developer tại focus.camp",
    description:
      "Hiện tại mình đang làm Developer cho focus.camp, nền tảng cộng đồng challenge-first dành cho creator Việt thuộc The KP3. Ở đây các bạn học qua những challenge 21–90 ngày, có AI Agent đồng hành để cùng nhau làm ra sản phẩm thật.",
    links: [
      { label: "focus.camp", href: "https://focus.camp" },
      { label: "The KP3", href: "https://kp3.agency" },
    ],
    media: [{ alt: "Ảnh bìa focus.camp: work anywhere, live freely" }],
    current: true,
  },
];

export const journeyOutro = {
  title: "Còn tiếp...",
  description:
    "Hành trình vẫn còn đang viết tiếp. Mình làm tới đâu là kể lại trên kênh YouTube tới đó, các bạn theo dõi để xem chặng tiếp theo nhé.",
  cta: "Theo dõi YouTube",
};

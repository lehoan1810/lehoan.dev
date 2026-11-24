import type { Course } from "@/types";

export const coursesSection = {
  id: "khoa-hoc",
  eyebrow: "Khóa học",
  title: "Các khóa học mình đã làm",
  description:
    "Từ năm 2020 mình làm tổng cộng 8 khóa học, đi từ HTML CSS cho người mới cho tới React và Next.js. Hiện tại mình đã ngừng bán tất cả để dồn sức chuẩn bị mấy khóa học mới, phù hợp hơn với cách mọi người học và làm sản phẩm khi có AI.",
};

export const upcomingCourse = {
  eyebrow: "Sắp có",
  title: "Khóa học mới cho thời AI",
  description:
    "Mình đang chuẩn bị mấy khóa học mới, dạy cách làm sản phẩm thật khi có AI làm cùng: từ lúc lên ý tưởng, code, kiểm tra cho tới khi đưa lên cho người dùng. Khi nào có lịch ra mắt mình sẽ báo trên kênh YouTube đầu tiên nhé.",
  cta: "Theo dõi để biết ngày ra",
};

export const archivedCoursesNote = {
  title: "Các khóa đã làm · đã ngừng bán",
  description:
    "Mấy khóa này mình không bán nữa, nhưng vẫn để lại đây vì đó là phần mình bỏ nhiều tâm huyết nhất trong mấy năm qua.",
};

export const courses: Course[] = [
  {
    title: "HTML CSS cơ bản cho người mới bắt đầu",
    description:
      "Khóa đầu tiên của mình, dạy HTML CSS từ con số 0 cho các bạn mới bắt đầu học làm web.",
    students: "1.686",
    lessons: 138,
    image: { alt: "Ảnh bìa khóa HTML CSS cơ bản cho người mới bắt đầu" },
  },
  {
    title: "Cắt giao diện từ Photoshop với Gulp, Pug, Sass",
    description:
      "Code một giao diện hoàn chỉnh từ file Photoshop với Gulp, Pug, Sass, hiển thị tốt trên cả điện thoại.",
    students: "1.694",
    lessons: 110,
    image: { alt: "Ảnh bìa khóa Cắt giao diện từ Photoshop với Gulp, Pug, Sass" },
  },
  {
    title: "HTML CSS Master",
    description:
      "Thực hành code giao diện từ Figma sang HTML CSS từng bước, giải thích chi tiết từng dòng code.",
    students: "957",
    lessons: 62,
    image: { alt: "Ảnh bìa khóa HTML CSS Master" },
  },
  {
    title: "JavaScript cơ bản đến nâng cao",
    description:
      "Nền tảng JavaScript từ biến, hàm, mảng, object tới DOM, event, gọi API và thuật toán cơ bản.",
    students: "539",
    lessons: 375,
    image: { alt: "Ảnh bìa khóa JavaScript cơ bản đến nâng cao" },
  },
  {
    title: "TypeScript cơ bản",
    description:
      "Làm quen TypeScript từ đầu: khai báo kiểu, interface, type và cách áp dụng vào code JavaScript có sẵn.",
    students: "1.182",
    lessons: 55,
    image: { alt: "Ảnh bìa khóa TypeScript cơ bản" },
  },
  {
    title: "ReactJS cơ bản đến nâng cao",
    description:
      "Học React từ đầu: component, props, state, hooks, gọi API, rồi ráp lại thành một ứng dụng hoàn chỉnh.",
    students: "656",
    lessons: 377,
    image: { alt: "Ảnh bìa khóa ReactJS cơ bản đến nâng cao" },
  },
  {
    title: "ReactJS Master: nắm vững React chuyên sâu",
    description:
      "Đi sâu vào cách React chạy bên trong: key, reconciliation, re-render và các pattern hay dùng khi làm dự án thật.",
    students: "28",
    lessons: 23,
    image: { alt: "Ảnh bìa khóa ReactJS Master: nắm vững React chuyên sâu" },
  },
  {
    title: "NextJS Pro: xây dựng hệ thống E-Learning",
    description:
      "Xây một hệ thống e-learning hoàn chỉnh với Next.js: khóa học, đơn hàng, coupon, đánh giá và bình luận.",
    students: "342",
    lessons: 111,
    image: { alt: "Ảnh bìa khóa NextJS Pro: xây dựng hệ thống E-Learning" },
  },
];

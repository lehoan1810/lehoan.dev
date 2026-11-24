import type { Hobby } from "@/types";

export const hobbiesSection = {
  id: "so-thich",
  eyebrow: "Sở thích",
  title: "Mấy thứ mình thích làm",
  description: "Ngoài công việc thì đây là những thứ mình dành thời gian mỗi tuần.",
};

export const hobbies: Hobby[] = [
  {
    icon: "play",
    title: "Làm YouTube",
    description: "Quay video về Frontend, AI và mấy sản phẩm mình tự làm.",
  },
  {
    icon: "pen",
    title: "Viết blog",
    description: "Viết lại những gì mình học được, từ React cho tới LLM.",
  },
  {
    icon: "languages",
    title: "Học tiếng Anh",
    description: "Mỗi ngày tập nói một chút, có quay lại thành series trên YouTube.",
  },
  {
    icon: "badminton",
    title: "Đánh cầu lông",
    description: "Môn mình chơi để vận động sau những ngày ngồi code nhiều.",
  },
  {
    icon: "code",
    title: "Coding",
    description: "Vừa là công việc vừa là sở thích, giờ thì code cùng AI nhiều hơn.",
  },
];

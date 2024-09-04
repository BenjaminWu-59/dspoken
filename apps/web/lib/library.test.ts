export type Sentence = {
  id: string;
  number: number;
  userId: string;
  hint: string;
  sentence: string;
  audioUrl: string; // 本地文件地址
  review: "0" | "1" | "2" | "3" | "4" | "5" | "7" | "15";
  status: "pre" | "ing" | "end",
  classId: string;
  createdAt: Date;
  updatedAt: Date;
}


export const testLibraryData: Sentence[] = [
  {
    id: "1",
    number: 1,
    userId: "1",
    hint: "我认为工资差异主要有两个原因",
    sentence: "I believe there are two main reasons for salary differences",
    audioUrl: "",
    review: "0",
    status: "pre",
    classId: "default",
    createdAt: new Date("2024-08-30T07:26:07.539Z"),
    updatedAt: new Date("2024-08-30T07:26:07.539Z")
  },
  {
    id: "2",
    number: 2,
    userId: "1",
    hint: "它是我们日常生活的重要组成部分",
    sentence: "it’s a big part of our routine",
    audioUrl: "",
    review: "0",
    status: "pre",
    classId: "default",
    createdAt: new Date("2024-08-30T07:26:07.539Z"),
    updatedAt: new Date("2024-08-30T07:26:07.539Z")
  },
  {
    id: "3",
    number: 3,
    userId: "1",
    hint: "我特别想说的是，我非常喜欢香蕉",
    sentence: "One thing I especially want to mention is that I really like bananas",
    audioUrl: "",
    review: "0",
    status: "pre",
    classId: "default",
    createdAt: new Date("2024-08-30T07:26:07.539Z"),
    updatedAt: new Date("2024-08-30T07:26:07.539Z")
  },
  {
    id: "4",
    number: 4,
    userId: "1",
    hint: "你会面对不同的口音，有些语音会使你难以理解",
    sentence: "You'll hear different accents, and some of them might be hard to understand.",
    audioUrl: "",
    review: "0",
    status: "pre",
    classId: "default",
    createdAt: new Date("2024-08-30T07:26:07.539Z"),
    updatedAt: new Date("2024-08-30T07:26:07.539Z")
  },
  {
    id: "5",
    number: 5,
    userId: "1",
    hint: "每个月都要付电费",
    sentence: "Pay the electricity bill every month.",
    audioUrl: "",
    review: "0",
    status: "pre",
    classId: "default",
    createdAt: new Date("2024-08-30T07:26:07.539Z"),
    updatedAt: new Date("2024-08-30T07:26:07.539Z")
  }
]
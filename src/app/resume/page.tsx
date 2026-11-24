import type { Metadata } from "next";
import ResumeView from "./resume-view";

export const metadata: Metadata = {
  title: "在线简历 | 朱星宇 · UX 交互设计师",
  description: "朱星宇 UX 交互设计师在线简历，支持一键打印或导出 A4 PDF。",
};

export default function ResumePage() {
  return <ResumeView />;
}

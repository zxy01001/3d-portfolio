"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect } from "react";
import NyanCat from "./nyan-cat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%c👋 你好！欢迎来到朱星宇的交互设计控制台 ✨\n" +
          "专注复杂 B 端业务建模 · 信息架构重构 · AI 产品体验设计\n" +
          "小彩蛋：回到页面按下键盘 %c'n'%c 键试试看 🐱🌈",
        "color: #38bdf8; font-size: 14px; font-weight: bold; background-color: #0f172a; padding: 10px; border-radius: 10px;",
        "color: #2dd4bf; font-size: 14px; font-weight: bold; background-color: #0f172a; padding: 10px; border-radius: 10px;",
        "color: #38bdf8; font-size: 14px; font-weight: bold; background-color: #0f172a; padding: 10px; border-radius: 10px;"
      );
    }
  }, [isDevToolsOpen]);

  return <NyanCat />;
};

export default EasterEggs;

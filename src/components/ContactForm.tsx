"use client";
import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { config } from "@/data/config";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, "请填写您的姓名或所属团队"),
  email: z.string().email("请输入有效的联系邮箱"),
  message: z.string().min(4, "请简要说明沟通事项（不少于 4 个字符）"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({ fullName, email, message });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, message }),
      });
      if (!res.ok) {
        throw new Error("fallback-to-mailto");
      }
      toast({
        title: "信息已提交",
        description: "感谢您的联系，我将尽快通过邮件与您取得沟通。",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setFullName("");
      setEmail("");
      setMessage("");
    } catch {
      const subject = encodeURIComponent(`作品集联系咨询：${fullName}`);
      const body = encodeURIComponent(
        `姓名/团队：${fullName}\n联系邮箱：${email}\n\n沟通事项：\n${message}`
      );
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
      toast({
        title: "已调起邮件客户端",
        description: `您亦可直接发送邮件至 ${config.email}`,
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-w-7xl mx-auto sm:mt-2" onSubmit={handleSubmit} aria-busy={loading}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">姓名 / 所属机构</Label>
          <Input
            id="fullname"
            placeholder="例如：所属企业或设计团队名称"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors((p) => ({ ...p, fullName: undefined }));
            }}
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">联系邮箱</Label>
          <Input
            id="email"
            placeholder="name@company.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">沟通事项</Label>
        <Textarea
          placeholder="请简要说明岗位职责方向、业务场景或交流意向..."
          id="content"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: undefined }));
          }}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>提交中...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            提交信息 <ChevronRight className="w-4 h-4 ml-2" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

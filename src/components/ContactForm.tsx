"use client";
import { ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
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
  fullName: z.string().min(1, "请填写您的姓名或所属机构"),
  email: z.string().email("请输入有效的联系邮箱"),
  message: z.string().min(4, "请简要说明沟通事项（不少于 4 个字符）"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sentSuccess, setSentSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSentSuccess(false);

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
      // Direct serverless email delivery via FormSubmit AJAX endpoint (zero backend / zero cost)
      const res = await fetch(`https://formsubmit.co/ajax/${config.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          message,
          _subject: `【作品集联系】来自 ${fullName} 的沟通信息`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "send-failed");
      }

      // FormSubmit returns { success: "false", message: "...Activation..." } on the very first run before inbox activation
      if (data && (data.success === "false" || data.success === false)) {
        const msg = String(data.message || "");
        if (/activat/i.test(msg)) {
          toast({
            title: "已触发首次收件激活邮件",
            description: `请前往 ${config.email} 收件箱（或垃圾箱）点击一次 FormSubmit 的 Activate 按钮，激活后所有留言将直接送达。`,
            variant: "default",
            className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4 z-[10000]"),
          });
        } else {
          throw new Error(msg);
        }
      } else {
        setSentSuccess(true);
        toast({
          title: "邮件已直接发送成功",
          description: `您的信息已投递至 ${config.email}，我将尽快与您联系。`,
          variant: "default",
          className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4 z-[10000]"),
        });
        setFullName("");
        setEmail("");
        setMessage("");
      }
    } catch {
      const subject = encodeURIComponent(`【作品集联系】${fullName}`);
      const body = encodeURIComponent(
        `姓名/机构：${fullName}\n联系邮箱：${email}\n\n沟通事项：\n${message}`
      );
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
      toast({
        title: "网络受限，已为您唤起系统邮件客户端",
        description: `您亦可直接复制邮箱 ${config.email} 发送联系信息。`,
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4 z-[10000]"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} aria-busy={loading}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
        <LabelInputContainer>
          <Label htmlFor="fullname">姓名 / 所属机构</Label>
          <Input
            id="fullname"
            placeholder="例如：某科技公司 / 产品研发团队"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors((p) => ({ ...p, fullName: undefined }));
            }}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">您的联系邮箱</Label>
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
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </LabelInputContainer>
      </div>

      <div className="grid w-full gap-2 mb-4">
        <Label htmlFor="content">沟通事项</Label>
        <Textarea
          placeholder="请简要说明岗位方向（UX / 产品经理 / FDE）、业务场景或合作意向，点击下方按钮将直接投递至我的邮箱..."
          id="content"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: undefined }));
          }}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff20_inset] border border-white/10"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>正在发送至邮箱...</span>
          </div>
        ) : sentSuccess ? (
          <div className="flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            <span>已发送至 {config.email}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span>直接发送邮件给我</span>
            <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
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

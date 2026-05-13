"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { useToast } from "@/components/ui/toast";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ tone: "warning", title: "Enter your email" });
      return;
    }
    toast({ title: "Reset link sent", description: `Check ${email} for instructions.` });
    setEmail("");
  };

  return (
    <div className="w-full max-w-md">
      <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900">
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to sign in
      </Link>
      <h1 className="mt-6 text-2xl font-medium text-ink-900">Reset your password</h1>
      <p className="mt-1 text-sm text-ink-500">
        Enter the email associated with your account and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <TextInput
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={14} strokeWidth={1.5} />}
          className="w-full"
        />
        <button
          type="submit"
          className="mt-2 h-10 px-4 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium inline-flex items-center justify-center w-full gap-2 hover:brightness-110"
        >
          Send reset link
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}

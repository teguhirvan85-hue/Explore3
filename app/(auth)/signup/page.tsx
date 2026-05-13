"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { useToast } from "@/components/ui/toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ tone: "warning", title: "Fill in all fields" });
      return;
    }
    toast({ title: "Welcome aboard!", description: "Let's set up your workspace." });
    setTimeout(() => router.push("/onboarding"), 600);
  };

  const handleSocial = (provider: string) => {
    toast({ tone: "info", title: `Continuing with ${provider}…` });
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-medium text-ink-900">Create your account</h1>
      <p className="mt-1 text-sm text-ink-500">Free to start. No credit card required.</p>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() => handleSocial("Google")}
          className="w-full h-10 rounded-pill bg-white border border-line-200 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-900 hover:bg-surface-50"
        >
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocial("GitHub")}
          className="w-full h-10 rounded-pill bg-white border border-line-200 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-900 hover:bg-surface-50"
        >
          Continue with GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-500">
        <div className="flex-1 h-px bg-line-200" />
        or
        <div className="flex-1 h-px bg-line-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={14} strokeWidth={1.5} />}
          className="w-full"
        />
        <TextInput
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={14} strokeWidth={1.5} />}
          className="w-full"
        />
        <TextInput
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={14} strokeWidth={1.5} />}
          className="w-full"
        />
        <p className="text-xs text-ink-500 leading-relaxed">
          By signing up you agree to the <Link href="#" className="text-brand-500 hover:underline">Terms</Link> and{" "}
          <Link href="#" className="text-brand-500 hover:underline">Privacy Policy</Link>.
        </p>
        <button
          type="submit"
          className="mt-2 h-10 px-4 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium inline-flex items-center justify-center w-full gap-2 hover:brightness-110"
        >
          Create account
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </form>

      <p className="mt-6 text-sm text-ink-500 text-center">
        Already have an account? <Link href="/signin" className="text-brand-500 font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { useToast } from "@/components/ui/toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ tone: "warning", title: "Fill in both fields" });
      return;
    }
    toast({ title: "Signing you in…" });
    setTimeout(() => router.push("/"), 600);
  };

  const handleSocial = (provider: string) => {
    toast({ tone: "info", title: `Continuing with ${provider}…`, description: "Redirecting to authorization." });
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-medium text-ink-900">Welcome back</h1>
      <p className="mt-1 text-sm text-ink-500">Sign in to continue to your workspace.</p>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() => handleSocial("Google")}
          className="w-full h-10 rounded-pill bg-white border border-line-200 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-900 hover:bg-surface-50"
        >
          <GoogleIcon /> Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocial("GitHub")}
          className="w-full h-10 rounded-pill bg-white border border-line-200 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-900 hover:bg-surface-50"
        >
          <GitHubIcon /> Continue with GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-500">
        <div className="flex-1 h-px bg-line-200" />
        or
        <div className="flex-1 h-px bg-line-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={14} strokeWidth={1.5} />}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-ink-500">
            <input type="checkbox" className="w-4 h-4 rounded border-line-300 accent-brand-500" />
            Remember me
          </label>
          <Link href="/forgot" className="text-brand-500 hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit"
          className="mt-2 h-10 px-4 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium inline-flex items-center justify-center w-full gap-2 hover:brightness-110"
        >
          Sign in
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </form>

      <p className="mt-6 text-sm text-ink-500 text-center">
        Don't have an account? <Link href="/signup" className="text-brand-500 font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 48 48" fill="none">
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

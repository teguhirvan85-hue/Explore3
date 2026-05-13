"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, Palette, Users } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { cn } from "@/lib/cn";

const steps = [
  { id: 1, label: "About you" },
  { id: 2, label: "Workspace" },
  { id: 3, label: "First project" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      {/* Header */}
      <div className="px-5 sm:px-10 py-5 sm:py-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient btn-glass-brand grid place-items-center">
            <div className="w-4 h-4 rounded-sm bg-white/95 grid place-items-center">
              <div className="w-2 h-2 rounded-sm bg-brand-500" />
            </div>
          </div>
          <span className="text-md font-medium text-ink-900">UX Pilot</span>
        </div>
        <button onClick={() => (window.location.href = "/")} className="text-sm text-ink-500 hover:text-ink-900">
          Skip for now
        </button>
      </div>

      {/* Stepper */}
      <div className="max-w-2xl w-full mx-auto px-5 sm:px-6 mt-2 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[420px] sm:min-w-0">
          {steps.map((s, i) => {
            const isDone = step > s.id;
            const isActive = step === s.id;
            return (
              <div key={s.id} className="flex-1 flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-pill grid place-items-center text-xs font-medium transition flex-shrink-0",
                      isDone && "bg-brand-500 text-white",
                      isActive && "bg-brand-gradient text-white btn-glass-brand",
                      !isDone && !isActive && "bg-white border border-line-300 text-ink-500"
                    )}
                  >
                    {s.id}
                  </div>
                  <span className={cn("text-sm font-medium whitespace-nowrap", isActive ? "text-ink-900" : "text-ink-500")}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && <div className={cn("flex-1 h-px mx-3", step > s.id ? "bg-brand-500" : "bg-line-200")} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 grid place-items-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-xl">
          {step === 1 && <StepAbout />}
          {step === 2 && <StepWorkspace />}
          {step === 3 && <StepProject />}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className={cn(
                "h-10 px-4 inline-flex items-center gap-2 rounded-pill text-sm font-medium transition",
                step === 1 ? "text-ink-500/50 cursor-not-allowed" : "text-ink-900 hover:bg-surface-100"
              )}
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="h-10 px-5 inline-flex items-center gap-2 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium hover:brightness-110"
              >
                Continue
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            ) : (
              <Link
                href="/"
                className="h-10 px-5 inline-flex items-center gap-2 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium hover:brightness-110"
              >
                Enter workspace
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepAbout() {
  const [role, setRole] = useState("designer");
  const roles = [
    { id: "designer", label: "Designer" },
    { id: "developer", label: "Developer" },
    { id: "pm", label: "Product Manager" },
    { id: "founder", label: "Founder" },
    { id: "other", label: "Other" },
  ];
  return (
    <div className="bg-white rounded-3xl border border-line-200 shadow-edge p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-500/10 text-brand-500 text-xs font-medium">
        <Sparkles size={12} strokeWidth={2} />
        Welcome to UX Pilot
      </div>
      <h1 className="mt-4 text-lg font-medium text-ink-900">Tell us about yourself</h1>
      <p className="mt-1 text-sm text-ink-500">We'll personalize suggestions and templates for your role.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-ink-900">What's your name?</label>
          <TextInput defaultValue="" placeholder="Jane Doe" className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-900">What's your role?</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={cn(
                  "h-9 px-3 rounded-pill text-sm font-medium border transition",
                  role === r.id
                    ? "bg-brand-500/10 border-brand-500 text-brand-500"
                    : "bg-white border-line-200 text-ink-900 hover:bg-surface-50"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepWorkspace() {
  const [color, setColor] = useState("#0099FF");
  const swatches = ["#0099FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444", "#111111"];
  return (
    <div className="bg-white rounded-3xl border border-line-200 shadow-edge p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-500/10 text-brand-500 text-xs font-medium">
        <Palette size={12} strokeWidth={2} />
        Workspace
      </div>
      <h1 className="mt-4 text-lg font-medium text-ink-900">Set up your workspace</h1>
      <p className="mt-1 text-sm text-ink-500">This is where your team will collaborate.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-ink-900">Workspace name</label>
          <TextInput placeholder="Acme Inc." className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-900">Brand accent color</label>
          <div className="mt-2 flex items-center gap-2">
            {swatches.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn("w-9 h-9 rounded-pill transition", color === c && "ring-2 ring-offset-2 ring-ink-900")}
                style={{ backgroundColor: c }}
                aria-label={c}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-ink-900">Team size</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Just me", "2–5", "6–20", "20+"].map((s) => (
              <button
                key={s}
                className="h-9 px-3 rounded-pill text-sm font-medium border border-line-200 bg-white text-ink-900 hover:bg-surface-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepProject() {
  const options = [
    { id: "dashboard", title: "Dashboard", description: "Charts, tables, and data widgets", color: "bg-[#0099FF]/10 text-[#0099FF]" },
    { id: "landing", title: "Landing page", description: "Marketing site with CTA flow", color: "bg-[#7C3AED]/10 text-[#7C3AED]" },
    { id: "mobile", title: "Mobile app", description: "iOS or Android screens", color: "bg-[#10B981]/10 text-[#10B981]" },
    { id: "ecom", title: "E-commerce", description: "Product pages and checkout", color: "bg-[#F59E0B]/10 text-[#F59E0B]" },
    { id: "blank", title: "Blank canvas", description: "Start from scratch", color: "bg-surface-200 text-ink-700" },
  ];
  const [pick, setPick] = useState("dashboard");
  return (
    <div className="bg-white rounded-3xl border border-line-200 shadow-edge p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-500/10 text-brand-500 text-xs font-medium">
        <Users size={12} strokeWidth={2} />
        Get started
      </div>
      <h1 className="mt-4 text-lg font-medium text-ink-900">What do you want to design first?</h1>
      <p className="mt-1 text-sm text-ink-500">Pick a starting point — you can change anything later.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setPick(o.id)}
            className={cn(
              "text-left p-4 rounded-2xl border transition",
              pick === o.id ? "border-brand-500 bg-brand-500/5" : "border-line-200 hover:border-line-300 bg-white"
            )}
          >
            <div className={cn("w-9 h-9 rounded-xl grid place-items-center text-sm font-medium", o.color)}>
              {o.title[0]}
            </div>
            <div className="mt-3 text-sm font-medium text-ink-900">{o.title}</div>
            <div className="text-xs text-ink-500 mt-0.5">{o.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

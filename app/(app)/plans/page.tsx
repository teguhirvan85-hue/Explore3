"use client";
import { useState } from "react";
import { Check, Sparkles, Crown, Building2 } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  featured?: boolean;
  currentTier?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Try the basics — perfect for hobby projects.",
    priceMonthly: 0,
    priceYearly: 0,
    icon: <Sparkles size={16} strokeWidth={1.5} />,
    features: [
      "50 generations / month",
      "3 active projects",
      "Public templates",
      "Export to PNG",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For designers shipping real products.",
    priceMonthly: 29,
    priceYearly: 24,
    icon: <Crown size={16} strokeWidth={1.5} />,
    featured: true,
    currentTier: true,
    features: [
      "Unlimited generations",
      "Unlimited projects",
      "All 200+ Pro templates",
      "Export to React, HTML, Figma",
      "Brand-aware AI",
      "Priority generation queue",
      "Email support",
    ],
    cta: "Current plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams that need control & scale.",
    priceMonthly: 99,
    priceYearly: 79,
    icon: <Building2 size={16} strokeWidth={1.5} />,
    features: [
      "Everything in Pro",
      "Team seats with roles",
      "SSO & SAML",
      "Custom design-system training",
      "Dedicated success manager",
      "SOC2 & DPA",
      "Custom contracts",
    ],
    cta: "Contact sales",
  },
];

export default function PlansPage() {
  const [billing, setBilling] = useState("yearly");

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#1A243A] leading-[1.2]">
            Plans that <span className="text-[#0099FF]">scale</span> with you
          </h1>
          <p className="mt-3 text-base sm:text-lg lg:text-[20px] text-[#757E91] leading-[1.2]">
            Cancel anytime. All plans include access to the latest AI models.
          </p>

          <div className="mt-8 inline-flex">
            <SegmentedTabs
              tabs={[
                { id: "monthly", label: "Monthly" },
                { id: "yearly", label: "Yearly · save 17%" },
              ]}
              value={billing}
              onChange={setBilling}
            />
          </div>
        </header>

        <section className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing as "monthly" | "yearly"} />
          ))}
        </section>

        <section className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <h2 className="text-lg font-medium text-[#1A243A] text-center">Compare features</h2>
          <FeatureComparison />
        </section>

        <section className="mt-12 lg:mt-16 max-w-3xl mx-auto">
          <h2 className="text-lg font-medium text-[#1A243A] text-center">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: "monthly" | "yearly" }) {
  const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
  const { toast } = useToast();
  const handleClick = () => {
    if (plan.currentTier) return;
    if (plan.id === "enterprise") {
      toast({ tone: "info", title: "Contact sales", description: "Our team will reach out within 24 hours." });
    } else if (plan.id === "free") {
      toast({ title: "Welcome to Free!", description: "Start designing right away." });
    } else {
      toast({ tone: "info", title: `Upgrading to ${plan.name}…`, description: "Redirecting to secure checkout." });
    }
  };
  return (
    <div
      className={cn(
        "relative bg-white rounded-3xl border p-6 flex flex-col",
        plan.featured ? "border-brand-500 shadow-lifted-md" : "border-line-200"
      )}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-gradient btn-glass-brand rounded-pill text-white text-xs font-medium">
          Most popular
        </div>
      )}
      <div className="flex items-center gap-2 text-ink-500">
        {plan.icon}
        <span className="text-sm font-medium">{plan.name}</span>
      </div>
      <div className="mt-2 text-sm text-ink-500">{plan.description}</div>

      <div className="mt-6 flex items-end gap-1">
        <span className="text-2xl font-medium text-ink-900">${price}</span>
        <span className="text-sm text-ink-500 mb-1">/ month</span>
      </div>
      {billing === "yearly" && price > 0 && (
        <div className="text-xs text-ink-500">Billed annually at ${price * 12}</div>
      )}

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-900">
            <Check size={14} strokeWidth={2} className="mt-0.5 text-brand-500 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        disabled={plan.currentTier}
        className={cn(
          "mt-6 h-10 rounded-pill text-sm font-medium transition",
          plan.currentTier && "bg-surface-100 text-ink-500 cursor-default",
          !plan.currentTier && plan.featured && "bg-brand-gradient btn-glass-brand text-white hover:brightness-110",
          !plan.currentTier && !plan.featured && "bg-white border border-line-300 text-ink-900 hover:bg-surface-50"
        )}
      >
        {plan.cta}
      </button>
    </div>
  );
}

const features = [
  { label: "Generations / month", free: "50", pro: "Unlimited", ent: "Unlimited" },
  { label: "Active projects", free: "3", pro: "Unlimited", ent: "Unlimited" },
  { label: "Pro templates", free: "—", pro: "All", ent: "All + custom" },
  { label: "Export to React / HTML", free: "—", pro: "✓", ent: "✓" },
  { label: "Export to Figma", free: "—", pro: "✓", ent: "✓" },
  { label: "Team seats", free: "1", pro: "1", ent: "Unlimited" },
  { label: "SSO / SAML", free: "—", pro: "—", ent: "✓" },
  { label: "Support", free: "Community", pro: "Email", ent: "Dedicated CSM" },
];

function FeatureComparison() {
  return (
    <div className="mt-6 bg-white rounded-2xl border border-line-200 overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-4 px-4 sm:px-6 py-3 text-sm font-medium text-ink-500 border-b border-line-200">
          <div>Feature</div>
          <div className="text-center">Free</div>
          <div className="text-center">Pro</div>
          <div className="text-center">Enterprise</div>
        </div>
        {features.map((row) => (
          <div key={row.label} className="grid grid-cols-4 px-4 sm:px-6 py-3 text-sm border-b border-line-100 last:border-0">
            <div className="text-ink-900">{row.label}</div>
            <div className="text-center text-ink-500">{row.free}</div>
            <div className="text-center text-ink-900 font-medium">{row.pro}</div>
            <div className="text-center text-ink-900 font-medium">{row.ent}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel from Settings → Plan & Billing — your account stays on Pro until the end of the billing period." },
  { q: "What happens to my projects if I downgrade?", a: "Your projects stay accessible, but you'll be limited to 3 active projects on Free. Older ones become read-only." },
  { q: "Do you offer student discounts?", a: "Yes — students get 50% off Pro. Contact us with your .edu email." },
  { q: "Is my data used to train AI?", a: "Never. Your designs are private and never used for training. Enterprise plans include a DPA." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full text-left bg-white rounded-2xl border border-line-200 px-5 py-4 hover:border-line-300 transition"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-ink-900">{q}</span>
        <span className="text-ink-500 text-lg">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-2 text-sm text-ink-500">{a}</div>}
    </button>
  );
}

import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="py-32 text-center">
      <div className="mx-auto w-16 h-16 rounded-3xl bg-brand-gradient btn-glass-brand grid place-items-center text-white">
        {icon ?? <Sparkles size={24} strokeWidth={1.5} />}
      </div>
      <h2 className="mt-6 text-2xl font-medium text-ink-900">{title}</h2>
      {description && <p className="mt-2 text-sm text-ink-500 max-w-md mx-auto">{description}</p>}
      <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-500/10 text-brand-500 text-xs font-medium">
        <Sparkles size={12} strokeWidth={2} />
        Coming soon
      </div>
    </div>
  );
}

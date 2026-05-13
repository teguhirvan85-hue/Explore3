import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Form column */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 sm:px-10 py-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient btn-glass-brand grid place-items-center">
              <div className="w-4 h-4 rounded-sm bg-white/95 grid place-items-center">
                <div className="w-2 h-2 rounded-sm bg-brand-500" />
              </div>
            </div>
            <span className="text-md font-medium text-ink-900">UX Pilot</span>
          </Link>
        </div>
        <div className="flex-1 grid place-items-center px-6 pb-12">
          {children}
        </div>
        <div className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-ink-500">
          <div>© 2026 UX Pilot</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-ink-900">Privacy</Link>
            <Link href="#" className="hover:text-ink-900">Terms</Link>
            <Link href="#" className="hover:text-ink-900">Support</Link>
          </div>
        </div>
      </div>

      {/* Showcase column */}
      <div className="hidden lg:flex flex-1 bg-brand-gradient relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="relative max-w-md text-white">
          <div className="text-3xl font-medium leading-tight">
            Idea to design in lightspeed.
          </div>
          <p className="mt-3 text-white/90">
            Generate full screens, flows, and exportable code from a single prompt. Trusted by 600,000+ designers.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-pill bg-white/30 border-2 border-white" />
              <div className="w-9 h-9 rounded-pill bg-white/50 border-2 border-white" />
              <div className="w-9 h-9 rounded-pill bg-white/70 border-2 border-white" />
            </div>
            <div className="text-sm text-white/90">+600k designers shipping faster</div>
          </div>
        </div>
      </div>
    </div>
  );
}

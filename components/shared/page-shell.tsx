import { cn } from "@/lib/cn";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive page shell.
 * - Mobile: full bleed, no rounded border (cleaner on small screens)
 * - lg+: rounded 24px card with #E1E1E1 border and 8px gap to viewport edges
 */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className="flex-1 min-w-0 h-screen lg:py-2 lg:pr-2">
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-white lg:border lg:border-[#E1E1E1] lg:rounded-3xl",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}

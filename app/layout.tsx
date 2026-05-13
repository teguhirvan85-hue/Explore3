import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eblek Workspace — UX Pilot Redesign",
  description: "Superfast UX/UI Design with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{ ["--font-display" as string]: "var(--font-geist-sans)" }}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

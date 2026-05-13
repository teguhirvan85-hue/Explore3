"use client";
import { useState } from "react";
import {
  User,
  CreditCard,
  Boxes,
  Key,
  Bell,
  Lock,
  Upload,
  Check,
  Copy,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { TextInput } from "@/components/ui/text-input";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Plan & Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Boxes },
  { id: "api", label: "API Keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header>
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Settings</h1>
          <p className="mt-2 text-sm text-[#757E91]">Manage your account, integrations, and preferences.</p>
        </header>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
          {/* Side nav — horizontal scroll on mobile, vertical on desktop */}
          <nav className="flex lg:flex-col gap-2 lg:gap-1 -mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto lg:overflow-visible">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "flex-shrink-0 lg:w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition",
                    isActive
                      ? "bg-white text-ink-900 font-medium shadow-edge border border-line-200"
                      : "text-ink-500 hover:text-ink-900 hover:bg-surface-100"
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div>
            {active === "profile" && <ProfileSection />}
            {active === "billing" && <BillingSection />}
            {active === "integrations" && <IntegrationsSection />}
            {active === "api" && <ApiKeysSection />}
            {active === "notifications" && <NotificationsSection />}
            {active === "security" && <SecuritySection />}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function SettingsCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-line-200 overflow-hidden">
      <div className="px-6 pt-5 pb-3 border-b border-line-200">
        <div className="text-md font-medium text-ink-900">{title}</div>
        {description && <div className="text-sm text-ink-500 mt-0.5">{description}</div>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-2 sm:gap-6 py-4 border-b border-line-100 last:border-0">
      <div className="sm:pt-2">
        <div className="text-sm font-medium text-ink-900">{label}</div>
        {hint && <div className="text-xs text-ink-500 mt-1">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ProfileSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      <SettingsCard title="Profile" description="Your personal information visible to collaborators.">
        <Field label="Avatar" hint="PNG or JPG, max 2MB">
          <div className="flex items-center gap-4">
            <Avatar name="Jimmy Sullivan" tone="blue" size={56} />
            <button
              onClick={() => toast({ tone: "info", title: "Choose a new avatar", description: "Drag-and-drop PNG/JPG up to 2MB." })}
              className="h-9 px-3 inline-flex items-center gap-2 rounded-pill bg-white border border-line-200 text-sm font-medium text-ink-900 hover:bg-surface-50"
            >
              <Upload size={14} strokeWidth={1.5} />
              Upload
            </button>
            <button
              onClick={() => toast({ title: "Avatar removed" })}
              className="text-sm text-ink-500 hover:text-danger-500"
            >
              Remove
            </button>
          </div>
        </Field>
        <Field label="Full name">
          <TextInput defaultValue="Jimmy Sullivan" className="w-full max-w-md" />
        </Field>
        <Field label="Email">
          <TextInput defaultValue="jimmy@zoromi.com" className="w-full max-w-md" />
        </Field>
        <Field label="Role" hint="Used to personalize template suggestions">
          <TextInput defaultValue="Product Designer" className="w-full max-w-md" />
        </Field>
        <Field label="Timezone">
          <TextInput defaultValue="GMT+7 — Jakarta" className="w-full max-w-md" />
        </Field>
      </SettingsCard>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast({ title: "Changes discarded" })}
          className="h-9 px-4 rounded-pill text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          Cancel
        </button>
        <button
          onClick={() => toast({ title: "Profile saved", description: "Your changes are live." })}
          className="h-9 px-4 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium hover:brightness-110"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

function BillingSection() {
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      <SettingsCard title="Current plan">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-ink-900">Pro</div>
              <div className="px-2 py-0.5 rounded-pill bg-brand-500/10 text-brand-500 text-xs font-medium">Active</div>
            </div>
            <div className="text-sm text-ink-500 mt-1">$29/month · Renews on June 12, 2026</div>
          </div>
          <a href="/plans" className="h-9 px-4 inline-flex items-center gap-1 rounded-pill bg-white border border-line-200 text-sm font-medium text-ink-900 hover:bg-surface-50">
            Change plan
            <ChevronRight size={14} strokeWidth={1.5} />
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <UsageStat label="Generations this month" value="248" total="500" />
          <UsageStat label="Projects" value="12" total="Unlimited" />
          <UsageStat label="Storage" value="1.2 GB" total="50 GB" />
        </div>
      </SettingsCard>

      <SettingsCard title="Payment method">
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-line-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-ink-900 grid place-items-center text-[10px] text-white font-bold">VISA</div>
            <div>
              <div className="text-sm font-medium text-ink-900">•••• 4242</div>
              <div className="text-xs text-ink-500">Expires 03/29</div>
            </div>
          </div>
          <button
            onClick={() => toast({ tone: "info", title: "Update payment method", description: "We'll redirect you to our secure billing portal." })}
            className="text-sm font-medium text-brand-500 hover:underline"
          >
            Update
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Invoices">
        <ul className="divide-y divide-line-100 -mx-2">
          {[
            { date: "May 12, 2026", invoice: "84291", amount: "$29.00", status: "Paid" },
            { date: "Apr 12, 2026", invoice: "82014", amount: "$29.00", status: "Paid" },
            { date: "Mar 12, 2026", invoice: "79835", amount: "$29.00", status: "Paid" },
          ].map((inv) => (
            <li key={inv.date} className="px-2 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink-900">{inv.date}</div>
                <div className="text-xs text-ink-500">Invoice #{inv.invoice}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-ink-900">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-pill bg-emerald-500/10 text-emerald-700">{inv.status}</span>
                <button
                  onClick={() => toast({ tone: "info", title: `Downloading invoice #${inv.invoice}`, description: "PDF will appear in your downloads." })}
                  className="text-sm text-brand-500 hover:underline"
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </SettingsCard>
    </div>
  );
}

function UsageStat({ label, value, total }: { label: string; value: string; total: string }) {
  return (
    <div className="p-4 rounded-xl bg-surface-50 border border-line-200">
      <div className="text-xs text-ink-500">{label}</div>
      <div className="mt-1 text-lg font-medium text-ink-900">
        {value} <span className="text-sm font-normal text-ink-500">/ {total}</span>
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const { toast } = useToast();
  const integrations = [
    { name: "Figma", description: "Sync designs back to Figma files.", connected: true, color: "#F24E1E" },
    { name: "GitHub", description: "Export code commits and PRs.", connected: true, color: "#181717" },
    { name: "Slack", description: "Get notified when generations finish.", connected: false, color: "#4A154B" },
    { name: "Linear", description: "Attach designs to issues automatically.", connected: false, color: "#5E6AD2" },
    { name: "Notion", description: "Embed designs in documentation pages.", connected: false, color: "#000" },
  ];
  return (
    <SettingsCard title="Connected apps" description="Connect tools your team uses to keep things in sync.">
      <ul className="-mx-2 divide-y divide-line-100">
        {integrations.map((i) => (
          <li key={i.name} className="px-2 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl grid place-items-center text-white font-medium" style={{ backgroundColor: i.color }}>
                {i.name[0]}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink-900">{i.name}</div>
                <div className="text-xs text-ink-500 truncate">{i.description}</div>
              </div>
            </div>
            {i.connected ? (
              <button
                onClick={() => toast({ tone: "warning", title: `${i.name} disconnected`, description: "You can re-connect anytime." })}
                className="h-9 px-3 inline-flex items-center gap-1.5 rounded-pill bg-surface-100 text-sm font-medium text-ink-900 hover:bg-surface-200"
              >
                <Check size={12} strokeWidth={2} className="text-emerald-600" />
                Connected
              </button>
            ) : (
              <button
                onClick={() => toast({ tone: "info", title: `Connecting to ${i.name}…`, description: "We'll redirect you to authorize the integration." })}
                className="h-9 px-3 rounded-pill bg-white border border-line-200 text-sm font-medium text-ink-900 hover:bg-surface-50"
              >
                Connect
              </button>
            )}
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}

function ApiKeysSection() {
  const { toast } = useToast();
  const copyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({ title: "API key copied" });
    } catch {
      toast({ tone: "error", title: "Couldn't copy" });
    }
  };
  return (
    <div className="space-y-6">
      <SettingsCard title="API Keys" description="Use these to integrate UX Pilot programmatically.">
        <div className="mt-2 space-y-3">
          {[
            { name: "Production", key: "uxp_live_a8f9...c2d4", created: "Mar 5, 2026" },
            { name: "Staging", key: "uxp_test_4b3e...91a0", created: "Feb 18, 2026" },
          ].map((k) => (
            <div key={k.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-line-200">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink-900">{k.name}</div>
                <div className="mt-0.5 font-mono text-xs text-ink-500">{k.key}</div>
              </div>
              <div className="text-xs text-ink-500">Created {k.created}</div>
              <button
                onClick={() => copyKey(k.key)}
                className="w-8 h-8 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-white"
                aria-label="Copy"
              >
                <Copy size={14} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => toast({ tone: "warning", title: `${k.name} key revoked`, description: "Apps using this key will lose access." })}
                className="w-8 h-8 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-white hover:text-danger-500"
                aria-label="Delete"
              >
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => toast({ tone: "success", title: "New API key created", description: "Copy it now — it won't be shown again." })}
          className="mt-4 h-9 px-4 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium"
        >
          + Create new key
        </button>
      </SettingsCard>
    </div>
  );
}

function NotificationsSection() {
  return (
    <SettingsCard title="Email & in-app">
      <Field label="Generation complete" hint="When AI finishes generating a design">
        <Toggle defaultChecked />
      </Field>
      <Field label="Weekly summary" hint="Recap of your activity every Monday">
        <Toggle />
      </Field>
      <Field label="Mentions & comments" hint="When teammates @mention you">
        <Toggle defaultChecked />
      </Field>
      <Field label="Product updates" hint="New features and tips">
        <Toggle defaultChecked />
      </Field>
    </SettingsCard>
  );
}

function SecuritySection() {
  const { toast } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <div className="space-y-6">
      <SettingsCard title="Password">
        <Field label="Change password">
          <div className="flex items-center gap-2">
            <TextInput type="password" defaultValue="••••••••" className="w-full max-w-md" />
            <button
              onClick={() => toast({ title: "Password updated", description: "You'll receive a confirmation email." })}
              className="h-9 px-3 rounded-pill bg-white border border-line-200 text-sm font-medium text-ink-900 hover:bg-surface-50"
            >
              Update
            </button>
          </div>
        </Field>
      </SettingsCard>
      <SettingsCard title="Two-factor authentication" description="Add an extra layer of security.">
        <div className="flex items-center justify-between">
          <div className="text-sm text-ink-500">Currently disabled.</div>
          <button
            onClick={() => toast({ tone: "info", title: "Set up 2FA", description: "Scan a QR with your authenticator app." })}
            className="h-9 px-4 rounded-pill bg-ink-900 text-white text-sm font-medium hover:brightness-110"
          >
            Enable 2FA
          </button>
        </div>
      </SettingsCard>
      <SettingsCard title="Danger zone">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-ink-900">Delete account</div>
            <div className="text-xs text-ink-500 mt-0.5">All projects and data will be permanently removed.</div>
          </div>
          <button
            onClick={() => setDeleteOpen(true)}
            className="h-9 px-4 rounded-pill bg-white border border-danger-500/30 text-danger-500 text-sm font-medium hover:bg-danger-500/5 flex-shrink-0"
          >
            Delete account
          </button>
        </div>
      </SettingsCard>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete your account?"
        description="This action is permanent. All projects, designs, and billing history will be erased."
        size="sm"
        footer={
          <>
            <button
              onClick={() => setDeleteOpen(false)}
              className="h-9 px-4 rounded-pill text-sm font-medium text-ink-500 hover:text-ink-900"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDeleteOpen(false);
                toast({ tone: "warning", title: "Account scheduled for deletion", description: "You have 7 days to undo." });
              }}
              className="h-9 px-4 rounded-pill bg-danger-500 text-white text-sm font-medium hover:brightness-110"
            >
              Yes, delete
            </button>
          </>
        }
      >
        <p className="text-sm text-[#1A243A]">Type <span className="font-medium">DELETE</span> to confirm — for safety, this dialog won't enforce it, but in production it would.</p>
      </Dialog>
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative w-11 h-6 rounded-pill transition",
        on ? "bg-brand-gradient" : "bg-surface-200 border border-line-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-pill bg-white shadow-edge transition",
          on && "translate-x-5"
        )}
      />
    </button>
  );
}

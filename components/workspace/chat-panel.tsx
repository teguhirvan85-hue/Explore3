import { ChatMessage } from "./chat-message";
import { CompactPrompt } from "./compact-prompt";
import type { Project } from "@/lib/mock-data";

interface ChatPanelProps {
  project: Project;
}

function buildMessages(project: Project) {
  const isMobile = project.imageFit === "center";
  if (isMobile) {
    return [
      {
        role: "user" as const,
        content: `Design a mobile app flow for ${project.title}. 3 screens: home with hero, list view, and detail screen.`,
      },
      {
        role: "ai" as const,
        content:
          "Generated 3 mobile screens with a consistent header pattern, primary CTA at the bottom, and a clean detail view. Tap any screen to iterate.",
        thumbnail: project.thumbnail,
        imageBg: project.imageBg,
        imageFit: project.imageFit,
      },
      {
        role: "user" as const,
        content: "Make the booking detail screen feel more premium — add traveler info and a download button.",
      },
      {
        role: "ai" as const,
        content:
          "Added traveler info card, expanded flight details with passenger name, and a primary download button at the bottom. Layout stays balanced with a clear vertical rhythm.",
        thumbnail: project.thumbnail,
        imageBg: project.imageBg,
        imageFit: project.imageFit,
      },
    ];
  }
  return [
    {
      role: "user" as const,
      content: `Make a SaaS landing page for ${project.title} — include hero, features, pricing, and FAQ.`,
    },
    {
      role: "ai" as const,
      content:
        "Generated a landing page with 4 sections: a hero with primary CTA, a 3-column features grid, a pricing table (Free / Pro / Enterprise), and an FAQ accordion. Used your brand colors and a clean SaaS layout. Click to iterate.",
      thumbnail: project.thumbnail,
      imageBg: project.imageBg,
      imageFit: project.imageFit,
    },
    {
      role: "user" as const,
      content: "Make the hero more bold — add a product screenshot on the right and a testimonial bar below.",
    },
    {
      role: "ai" as const,
      content:
        "Rebuilt the hero with a 60/40 split — copy on the left, product screenshot on the right with floating chart cards. Added a logo testimonial strip with 6 brands underneath. Want me to add motion?",
      thumbnail: project.thumbnail,
      imageBg: project.imageBg,
      imageFit: project.imageFit,
    },
  ];
}

export function ChatPanel({ project }: ChatPanelProps) {
  const messages = buildMessages(project);

  return (
    <div className="w-full lg:w-[380px] flex-shrink-0 h-full flex flex-col bg-white/60 rounded-3xl border border-line-200 shadow-edge">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line-200">
        <div className="text-sm font-medium text-ink-900">Conversation</div>
        <div className="text-xs text-ink-500">{messages.length} messages</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-line-200">
        <CompactPrompt />
      </div>
    </div>
  );
}

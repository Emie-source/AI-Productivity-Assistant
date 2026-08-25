import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  CalendarClock,
  Crown,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageContent } from "@/components/blade-queens/MessageContent";
import { MODE_META, type AssistantMode } from "@/lib/blade-queens-prompts";
import crest from "@/assets/blade-queens-crest.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blade Queens Assistant | Where Women Master the Blade" },
      {
        name: "description",
        content:
          "AI productivity assistant for Blade Queens barbershop: client messages, task plans and growth research for the women-led team.",
      },
      {
        property: "og:title",
        content: "Blade Queens Assistant | Where Women Master the Blade",
      },
      {
        property: "og:description",
        content:
          "Draft client messages, build weekly plans and research growth ideas for Blade Queens barbershop.",
      },
    ],
  }),
  component: Index,
});

const MODES: { id: AssistantMode; icon: typeof Crown }[] = [
  { id: "chat", icon: MessageSquare },
  { id: "communication", icon: Sparkles },
  { id: "planner", icon: CalendarClock },
  { id: "research", icon: Lightbulb },
];

function Index() {
  const [mode, setMode] = useState<AssistantMode>("chat");
  const [input, setInput] = useState("");
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: { ...body, messages, mode: modeRef.current },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, stop, error, setMessages } = useChat({
    transport,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  const busy = status === "submitted" || status === "streaming";
  const meta = MODE_META[mode];

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <main className="min-h-screen bg-gradient-royal">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-6 pt-6 md:px-6">
        <header className="flex flex-col gap-4 border-b border-border/70 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={crest}
              alt="Blade Queens crest: a straight razor crossed with a crown"
              width={816}
              height={816}
              className="h-14 w-14 object-contain drop-shadow-[0_4px_14px_oklch(0.82_0.148_85/0.35)]"
            />
            <div>
              <h1 className="text-2xl leading-none md:text-3xl">
                <span className="text-gold-gradient">BLADE QUEENS</span>
              </h1>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Where Women Master the Blade
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-4 py-2 text-xs text-muted-foreground">
            <Crown className="h-4 w-4 text-primary" />
            Business Productivity Assistant
          </div>
        </header>

        <nav className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          {MODES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors",
                mode === id
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {MODE_META[id].label}
            </button>
          ))}
        </nav>

        <p className="mt-3 text-xs text-muted-foreground">{meta.blurb}</p>

        <section
          ref={scrollRef}
          className="mt-4 flex-1 overflow-y-auto rounded-2xl border border-border bg-card/45 p-4 shadow-blade md:p-6"
        >
          {messages.length === 0 ? (
            <div className="flex h-full flex-col justify-center gap-5 py-8">
              <div>
                <h2 className="text-xl text-foreground">
                  Ready when you are, Queen.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Ask for client messages, a weekly plan, or growth and academy
                  research. I&apos;ll ask for anything I&apos;m missing and flag
                  whatever needs your review.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {meta.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-border bg-secondary/50 p-3 text-left text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m) => {
                const text = m.parts
                  .filter((p) => p.type === "text")
                  .map((p) => (p as { text: string }).text)
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={cn("flex", isUser ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] rounded-2xl px-4 py-3 md:max-w-[80%]",
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-secondary/60 text-foreground",
                      )}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm font-medium">{text}</p>
                      ) : text ? (
                        <MessageContent text={text} />
                      ) : (
                        <p className="text-sm text-muted-foreground">Thinking…</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {status === "submitted" && (
                <p className="text-xs text-muted-foreground">Sharpening the blade…</p>
              )}
            </div>
          )}
        </section>

        {error && (
          <p className="mt-3 rounded-xl border border-destructive/50 bg-destructive/15 px-4 py-3 text-sm text-foreground">
            {error.message || "The assistant could not respond. Please try again."}
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-4 rounded-2xl border border-border bg-card/70 p-3"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={`Ask the ${meta.label.toLowerCase()} assistant…`}
            rows={2}
            className="resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground">
              AI drafts need a human check before sending or committing.
            </span>
            <div className="flex items-center gap-2">
              {messages.length > 0 && !busy && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setMessages([])}
                >
                  New chat
                </Button>
              )}
              {busy ? (
                <Button type="button" variant="secondary" size="sm" onClick={() => stop()}>
                  <Square className="h-4 w-4" /> Stop
                </Button>
              ) : (
                <Button type="submit" size="sm" disabled={!input.trim()}>
                  Send <ArrowUp className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

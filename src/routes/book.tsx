import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarCheck, Check, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SERVICES,
  TIME_SLOTS,
  formatRand,
  getService,
} from "@/lib/blade-queens-services";
import crest from "@/assets/blade-queens-crest.png";
import { cn } from "@/lib/utils";

type BookSearch = { service?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an Appointment | Blade Queens Barbershop" },
      {
        name: "description",
        content:
          "Choose a Blade Queens service, see the price and duration, then request your appointment date and time.",
      },
      { property: "og:title", content: "Book an Appointment | Blade Queens" },
      {
        property: "og:description",
        content:
          "Pick your cut, shave or beard service, see the price in Rand and request a booking slot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { service: serviceSlug } = Route.useSearch();
  const navigate = useNavigate({ from: "/book" });
  const selected = getService(serviceSlug);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const chooseService = (slug: string) => {
    setConfirmed(false);
    navigate({ search: { service: slug } });
  };

  const ready = Boolean(selected && name.trim() && phone.trim() && date && time);

  if (confirmed && selected) {
    return (
      <main className="min-h-screen bg-gradient-royal px-4 py-10">
        <div className="mx-auto max-w-lg rounded-2xl border border-primary/40 bg-card/60 p-6 text-center shadow-blade">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 text-xl text-foreground">Booking request sent</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you, {name.split(" ")[0]}. We&apos;ll confirm your slot by
            phone or WhatsApp on {phone}.
          </p>
          <dl className="mt-5 flex flex-col gap-2 rounded-xl border border-border bg-secondary/40 p-4 text-left text-sm">
            <Row label="Service" value={selected.name} />
            <Row label="Price" value={formatRand(selected.priceValue)} />
            <Row label="Duration" value={selected.duration} />
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
          </dl>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setConfirmed(false);
                setName("");
                setPhone("");
                setDate("");
                setTime("");
                setNotes("");
              }}
            >
              Book another
            </Button>
            <Button asChild size="sm">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-royal px-4 py-6 md:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="flex items-center gap-3 border-b border-border/70 pb-5">
          <img
            src={crest}
            alt="Blade Queens crest: a straight razor crossed with a crown"
            width={816}
            height={816}
            className="h-11 w-11 object-contain"
          />
          <div>
            <h1 className="text-xl leading-none md:text-2xl">
              <span className="text-gold-gradient">BOOK AN APPOINTMENT</span>
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Where Women Master the Blade
            </p>
          </div>
        </header>

        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to services
        </Link>

        <section className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade">
          <h2 className="text-base font-semibold text-foreground">
            1. Choose your service
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const active = s.slug === serviceSlug;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => chooseService(s.slug)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      active
                        ? "border-primary/70 bg-primary/15"
                        : "border-border bg-secondary/40 hover:border-primary/40",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {s.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {s.duration}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-primary">
                      {s.price}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade">
          <h2 className="text-base font-semibold text-foreground">
            2. Your details
          </h2>

          {selected ? (
            <p className="mt-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
              <span className="font-semibold">{selected.name}</span> —{" "}
              {formatRand(selected.priceValue)} · {selected.duration}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Select a service above to see its price and continue.
            </p>
          )}

          <form
            className="mt-4 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setConfirmed(true);
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Thandi Mokoena"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="072 000 0000"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="date">Preferred date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="time">Preferred time</Label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred barber, style reference, anything we should know."
                className="resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-muted-foreground">
                Requests are confirmed by the shop — slots are not held until we
                reply.
              </p>
              <Button type="submit" disabled={!ready}>
                <CalendarCheck className="h-4 w-4" />
                {selected
                  ? `Request booking · ${selected.price}`
                  : "Request booking"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}

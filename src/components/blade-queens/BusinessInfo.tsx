import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Clock,
  GraduationCap,
  Info,
  MapPin,
  Phone,
  Scissors,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SERVICES, type Service, formatRand } from "@/lib/blade-queens-services";


const HOURS = [
  { day: "Monday – Friday", time: "08:30 – 18:00" },
  { day: "Saturday", time: "08:00 – 17:00" },
  { day: "Sunday", time: "09:00 – 14:00" },
  { day: "Public holidays", time: "By appointment" },
];

export function BusinessInfo() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <section
        id="about"
        className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade md:p-6"
      >
        <h2 className="text-lg text-foreground md:text-xl">
          <span className="text-gold-gradient">About Blade Queens</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Blade Queens is a modern barbershop built to open doors for women in a
          traditionally male-dominated craft. We deliver sharp, high-quality
          barbering and grooming while creating real employment and career paths
          for skilled female barbers. Talent and skill define success here — not
          gender. Everyone is welcome in the chair.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          {["Professionalism", "Empowerment", "Excellence", "Confidence", "Innovation", "Inclusivity"].map(
            (value) => (
              <li
                key={value}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary"
              >
                {value}
              </li>
            ),
          )}
        </ul>
      </section>

      <section
        id="services"
        className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            <h2 className="text-lg text-foreground md:text-xl">Services & Prices</h2>
          </div>
          <Link
            to="/book"
            className="rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/25"
          >
            Book an appointment
          </Link>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => setActive(s)}
                className="flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-secondary/60"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {s.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {s.detail}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {s.duration} · Tap for details
                  </span>
                </span>
                <span className="shrink-0 text-sm font-bold text-primary">{s.price}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Prices are indicative starting rates and may vary with hair length and
          service time. Confirm on booking.
        </p>

      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade md:p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg text-foreground">Opening Hours</h2>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {HOURS.map((h) => (
              <li
                key={h.day}
                className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0"
              >
                <span className="text-muted-foreground">{h.day}</span>
                <span className="font-semibold text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          className="rounded-2xl border border-border bg-card/45 p-5 shadow-blade md:p-6"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-lg text-foreground">Visit & Contact</h2>
          </div>
          <address className="mt-4 flex flex-col gap-3 text-sm not-italic text-muted-foreground">
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Blade Queens Barbershop, Cape Town, South Africa
            </span>
            <span className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Call or WhatsApp: 000 000 0000
            </span>
          </address>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Update the address, number and socials with your real details.
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-primary/30 bg-primary/10 p-5 shadow-blade md:p-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="text-lg text-foreground">Blade Queens Barbering Academy</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Coming soon: hands-on training, practical shop experience and
          mentorship for women entering the barbering industry — from first
          clipper hold to building a career behind the chair.
        </p>
      </section>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md border-border bg-card text-foreground">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-gold-gradient">
                  <Info className="h-4 w-4 text-primary" />
                  {active.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Service details for {active.name}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-semibold text-primary">
                    {active.price}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" /> {active.duration}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {active.fullDescription}
                </p>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What's included
                  </h3>
                  <ul className="mt-2 grid gap-1.5">
                    {active.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild size="sm" className="flex-1">
                    <Link to="/book" search={{ service: active.slug }}>
                      Book this · {formatRand(active.priceValue)}
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setActive(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

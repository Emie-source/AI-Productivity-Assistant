import { Clock, GraduationCap, MapPin, Phone, Scissors } from "lucide-react";

type Service = { name: string; detail: string; price: string };

const SERVICES: Service[] = [
  { name: "Queens Cut", detail: "Classic scissor & clipper cut with styling", price: "R150" },
  { name: "Skin Fade", detail: "Precision fade, razor-finished edges", price: "R180" },
  { name: "Beard Trim & Shape", detail: "Line-up, trim and beard oil finish", price: "R80" },
  { name: "Hot Towel Shave", detail: "Traditional straight-razor shave", price: "R160" },
  { name: "Cut & Beard Combo", detail: "Queens Cut plus full beard sculpt", price: "R210" },
  { name: "Kids Cut (under 12)", detail: "Gentle, quick cut for young clients", price: "R100" },
  { name: "Head Shave", detail: "Full razor head shave with aftercare", price: "R130" },
  { name: "Line-Up / Edge-Up", detail: "Sharp hairline clean-up", price: "R60" },
];

const HOURS = [
  { day: "Monday – Friday", time: "08:30 – 18:00" },
  { day: "Saturday", time: "08:00 – 17:00" },
  { day: "Sunday", time: "09:00 – 14:00" },
  { day: "Public holidays", time: "By appointment" },
];

export function BusinessInfo() {
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
        <div className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          <h2 className="text-lg text-foreground md:text-xl">Services &amp; Prices</h2>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li
              key={s.name}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.detail}</p>
              </div>
              <span className="shrink-0 text-sm font-bold text-primary">{s.price}</span>
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
            <h2 className="text-lg text-foreground">Visit &amp; Contact</h2>
          </div>
          <address className="mt-4 flex flex-col gap-3 text-sm not-italic text-muted-foreground">
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Blade Queens Barbershop, Johannesburg, South Africa
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
    </div>
  );
}

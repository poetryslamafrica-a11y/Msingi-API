import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      {/* subtle burnt-red glow, no imagery dependency */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-burnt/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="container-content relative py-28 md:py-36">
        <p className="eyebrow text-gold">The Alkebulan Poetry Institute</p>
        <h1 className="mt-5 max-w-3xl font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ivory md:text-[64px]">
          The foundation for
          <br />
          <span className="text-gold">Africa&rsquo;s poetry economy.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory/70">
          Msingi is not a course platform. It is a professional institute —
          where African poets build a verified career: credentials, portfolio,
          mentorship, income, and standing across the continent and its diaspora.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/apply" className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
            Apply for Membership
          </Link>
          <Link href="/schools" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-ivory/20 text-ivory hover:bg-ivory hover:text-ink")}>
            Explore the Schools
          </Link>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-ivory/10 pt-10 md:grid-cols-4">
          {[
            ["10", "Professional Schools"],
            ["8", "Membership Ranks"],
            ["54", "African Nations"],
            ["1", "Shared Institute"],
          ].map(([num, label]) => (
            <div key={label}>
              <dt className="font-display text-3xl font-semibold text-gold">{num}</dt>
              <dd className="mt-1 text-[12px] uppercase tracking-wide text-ivory/50">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

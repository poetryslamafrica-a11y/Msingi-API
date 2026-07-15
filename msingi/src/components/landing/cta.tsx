import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="bg-ink">
      <div className="container-content flex flex-col items-start gap-6 py-24 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-gold">Applications Open</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold text-ivory">
            Your craft deserves an institute behind it.
          </h2>
        </div>
        <Link href="/apply" className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          Begin Your Application
        </Link>
      </div>
    </section>
  );
}

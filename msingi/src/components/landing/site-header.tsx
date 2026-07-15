import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Schools", href: "/schools" },
  { label: "Membership", href: "/membership" },
  { label: "Faculty", href: "/faculty" },
  { label: "Community", href: "/community" },
  { label: "Career Center", href: "/careers" },
  { label: "Research", href: "/research" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-ink/10 bg-ivory/90 backdrop-blur">
      <div className="container-content flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Msingi
          </span>
          <span className="hidden text-[10px] uppercase tracking-widest2 text-ink/40 md:inline">
            Alkebulan Poetry Institute
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-[13px] font-medium text-ink/70 hover:text-ink sm:inline"
          >
            Sign In
          </Link>
          <Link href="/apply" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
}

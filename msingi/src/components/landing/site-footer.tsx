import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Institute",
    links: [
      { label: "About Msingi", href: "/about" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Schools", href: "/schools" },
      { label: "Faculty", href: "/faculty" },
      { label: "Research Library", href: "/research" },
    ],
  },
  {
    title: "Membership",
    links: [
      { label: "Pathways", href: "/membership" },
      { label: "Recognition of Prior Learning", href: "/membership/rpl" },
      { label: "Fellowship", href: "/membership/fellowship" },
      { label: "Apply", href: "/apply" },
    ],
  },
  {
    title: "Community & Career",
    links: [
      { label: "Regional Chapters", href: "/community/chapters" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Career Center", href: "/careers" },
      { label: "Rights & Publishing", href: "/rights" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-ivory">
      <div className="container-content grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl font-semibold">Msingi</span>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ivory/60">
            The foundation for Africa&rsquo;s poetry economy — a professional institute
            for poets, spoken word artists, and creative practitioners across the continent.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-ivory/70 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-content flex flex-col gap-2 py-6 text-[11px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} The Alkebulan Poetry Institute. Msingi.</span>
          <span>Nairobi &middot; Lagos &middot; Accra &middot; Kigali &middot; Diaspora</span>
        </div>
      </div>
    </footer>
  );
}

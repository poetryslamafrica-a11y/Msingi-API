import { RankBadge, type MemberRank } from "@/components/ui/rank-badge";

const RANKS: { rank: MemberRank; desc: string }[] = [
  { rank: "guest", desc: "Browsing the Institute — public content, no account." },
  { rank: "applicant", desc: "Application submitted — pathway, country, and goals selected." },
  { rank: "member", desc: "Onboarded. Access to community, library, and first modules." },
  { rank: "apprentice", desc: "Actively learning inside a School. Portfolio building begins." },
  { rank: "practitioner", desc: "First credential earned. Verified professional profile." },
  { rank: "professional", desc: "Multi-School completion. Career Center full access." },
  { rank: "associate_fellow", desc: "Mentorship and assessment privileges unlocked." },
  { rank: "fellow", desc: "Highest standing. Faculty eligibility, governance voice." },
];

export function Pathway() {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="container-content py-24">
        <p className="eyebrow">Institute Pathway</p>
        <h2 className="mt-3 max-w-xl text-2xl font-semibold md:text-3xl">
          Eight ranks. One professional journey.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70">
          Every member progresses through a defined professional pathway — each
          rank unlocking new privileges, responsibilities, and recognition.
        </p>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 md:grid-cols-4">
          {RANKS.map((r, i) => (
            <li key={r.rank} className="flex flex-col gap-3 bg-ivory p-6">
              <span className="font-mono text-[11px] text-ink/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <RankBadge rank={r.rank} />
              <p className="text-[13px] leading-relaxed text-ink/60">{r.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

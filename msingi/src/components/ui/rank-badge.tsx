import { cn } from "@/lib/utils";

// Member progression: Guest -> Applicant -> Member -> Apprentice ->
// Practitioner -> Professional -> Associate Fellow -> Fellow
export type MemberRank =
  | "guest"
  | "applicant"
  | "member"
  | "apprentice"
  | "practitioner"
  | "professional"
  | "associate_fellow"
  | "fellow";

const RANK_LABEL: Record<MemberRank, string> = {
  guest: "Guest",
  applicant: "Applicant",
  member: "Member",
  apprentice: "Apprentice",
  practitioner: "Practitioner",
  professional: "Professional",
  associate_fellow: "Associate Fellow",
  fellow: "Fellow",
};

// Post-nominal shown once a member reaches Practitioner+
const RANK_POSTNOMINAL: Partial<Record<MemberRank, string>> = {
  practitioner: "PMsI",
  professional: "ProfMsI",
  associate_fellow: "AFMsI",
  fellow: "FMsI",
};

export function RankBadge({
  rank,
  showPostnominal = false,
  className,
}: {
  rank: MemberRank;
  showPostnominal?: boolean;
  className?: string;
}) {
  const isElevated = ["professional", "associate_fellow", "fellow"].includes(rank);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        isElevated
          ? "border-gold/50 bg-gold/10 text-gold-600"
          : "border-ink/15 bg-ink/5 text-ink/70",
        className
      )}
    >
      {RANK_LABEL[rank]}
      {showPostnominal && RANK_POSTNOMINAL[rank] && (
        <span className="text-ink/40">· {RANK_POSTNOMINAL[rank]}</span>
      )}
    </span>
  );
}

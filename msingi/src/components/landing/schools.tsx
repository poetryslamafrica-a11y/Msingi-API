const SCHOOLS = [
  { code: "MsI-101", name: "School of Craft", desc: "Foundations of African Poetry. Form, voice, tradition." },
  { code: "MsI-201", name: "School of Performance", desc: "Spoken word delivery, slam competition, stage presence." },
  { code: "MsI-301", name: "School of Publishing", desc: "Manuscript development, ISBN, distribution, editing." },
  { code: "MsI-401", name: "School of Rights", desc: "Copyright, licensing, royalty collection, CMOs." },
  { code: "MsI-501", name: "School of Business", desc: "Grant writing, pricing your work, creative entrepreneurship." },
  { code: "MsI-601", name: "School of Media", desc: "Video, audio production, digital presence, EPKs." },
  { code: "MsI-701", name: "School of Teaching", desc: "Facilitation, workshop design, mentorship practice." },
  { code: "MsI-801", name: "School of Translation", desc: "Multilingual poetry, translation ethics and craft." },
  { code: "MsI-901", name: "School of Research", desc: "Poetry scholarship, archiving, oral history methods." },
  { code: "MsI-951", name: "School of Leadership", desc: "Festival direction, institutional and cultural leadership." },
];

export function Schools() {
  return (
    <section id="schools" className="border-b border-ink/10 bg-ivory">
      <div className="container-content py-24">
        <p className="eyebrow">Learning Architecture</p>
        <h2 className="mt-3 max-w-xl text-2xl font-semibold md:text-3xl">
          Ten Schools. Not courses — disciplines.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {SCHOOLS.map((s) => (
            <div key={s.code} className="flex flex-col gap-2 bg-white p-6">
              <span className="font-mono text-[11px] text-burnt">{s.code}</span>
              <h3 className="text-[15px] font-semibold text-ink">{s.name}</h3>
              <p className="text-[12.5px] leading-relaxed text-ink/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

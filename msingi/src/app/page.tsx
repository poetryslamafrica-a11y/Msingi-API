import { Hero } from "@/components/landing/hero";
import { Mission } from "@/components/landing/mission";
import { Pathway } from "@/components/landing/pathway";
import { Schools } from "@/components/landing/schools";
import { FinalCta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Pathway />
      <Schools />
      <FinalCta />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(56,189,248,.13), transparent)",
        margin: "0 5%",
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Services />
        <Divider />
        <WhyUs />
        <Divider />
        <Process />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

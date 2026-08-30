import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/planprint/Header";
import { Hero } from "@/components/planprint/Hero";
import { Features } from "@/components/planprint/Features";
import { HowItWorks } from "@/components/planprint/HowItWorks";
import { Footer } from "@/components/planprint/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlanPrint — Printable Calendar & Planner Generator" },
      {
        name: "description",
        content:
          "Create a custom printable calendar: choose a month, theme and font, add events and notes, then print or download as PDF or PNG on A4.",
      },
      { property: "og:title", content: "PlanPrint — Printable Calendar Generator" },
      {
        property: "og:description",
        content:
          "Customize your calendar, add important events, and print it instantly — every sheet true to A4.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

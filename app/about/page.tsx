import Link from "next/link";
import { Icon } from "@/components/Icon";

const pillars = [
  {
    icon: "menu_book",
    title: "Shamail",
    text: "Character and conduct of the Prophet ﷺ, grounded in Imam Tirmidhi's Ash-Shama'il Al-Muhammadiyah.",
  },
  {
    icon: "history",
    title: "Timeline",
    text: "A chronological narrative of the Seerah, from the Early Meccan period to the Madinan state.",
  },
  {
    icon: "verified",
    title: "Verified Corpus",
    text: "Answers are limited to an approved, curated corpus — never invented or extrapolated.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 pt-16 w-full max-w-max mx-auto px-gutter py-stack-lg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-sm text-label-sm border border-outline-variant/30 mb-4">
            <Icon name="auto_awesome" size={18} filled />
            About the Project
          </span>
          <h1 className="font-display text-display-lg text-primary mb-3">
            Heritage & Wisdom
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A scholarly yet accessible space to explore the Seerah — built for
            students, researchers, and families.
          </p>
        </div>

        <section className="bg-surface-container-low rounded-2xl border border-outline-variant p-8 shadow-organic mb-10">
          <h2 className="font-display text-headline-lg text-primary mb-4">
            What is this?
          </h2>
          <div className="space-y-4 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            <p>
              Seerah Q&A is a question-answering assistant focused exclusively
              on the approved Shamail and Seerah Timeline corpus. Every answer
              cites the source it draws from, so you always know where the
              information comes from.
            </p>
            <p>
              The interface follows a design language of{" "}
              <strong className="text-on-surface">Quiet Authority</strong> —
              Premium Minimalism rooted in organic colors, generous whitespace,
              and the pairing of Playfair Display with Inter for a calm,
              intellectual reading experience.
            </p>
            <p>
              This assistant does not provide religious rulings or fatwas. For
              religious guidance, please consult a qualified alim.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-headline-lg text-primary text-center mb-8">
            What we build on
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-organic hover:shadow-organic-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <Icon name={pillar.icon} size={22} />
                </div>
                <h3 className="font-display font-semibold text-headline-md text-on-surface mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary-container rounded-2xl p-8 text-center shadow-organic">
          <h2 className="font-display text-headline-lg text-on-primary-container mb-3">
            Ready to explore the Seerah?
          </h2>
          <p className="font-body-md text-body-md text-on-primary-container/80 mb-6 max-w-xl mx-auto">
            Ask a question and receive an answer grounded in approved sources.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary-container transition-colors duration-200"
          >
            Ask a Question
            <Icon name="arrow_forward" size={20} />
          </Link>
        </section>
      </div>
    </main>
  );
}

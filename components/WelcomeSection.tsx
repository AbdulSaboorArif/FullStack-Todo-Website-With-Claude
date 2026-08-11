import { Icon } from "./Icon";

const suggestions = [
  "What does the Shamail say about the Prophet ﷺ?",
  "What does the Seerah Timeline say about Madinah?",
  "Tell me about this topic from the approved sources.",
  "What information is available in the Seerah corpus?",
];

type WelcomeSectionProps = {
  onSelect: (question: string) => void;
};

export function WelcomeSection({ onSelect }: WelcomeSectionProps) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-display text-display-lg text-primary mb-4">
          Ask about the Seerah
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Explore answers grounded in approved Shamail and Seerah Timeline
          sources.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-surface-container-low rounded-xl p-6 border border-outline-variant mb-12 shadow-organic">
        <div className="flex items-start gap-4">
          <Icon name="info" className="text-primary mt-1" size={22} />
          <p className="font-body-md text-body-md text-on-surface-variant">
            Answers are based only on the approved Seerah corpus. This
            assistant does not provide religious rulings or fatwas. For
            religious guidance, please consult a qualified alim.
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="font-display text-headline-lg text-center mb-2">
          What would you like to learn about?
        </h2>
        <p className="font-body-md text-body-md text-center text-on-surface-variant mb-8">
          Ask a question about the Seerah and receive an answer grounded in
          approved sources.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelect(suggestion)}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-left hover:shadow-organic-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span className="font-body-md text-body-md text-on-surface">
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

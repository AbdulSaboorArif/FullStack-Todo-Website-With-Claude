import { Icon } from "./Icon";

export function TypingIndicator() {
  return (
    <div className="flex flex-col items-start w-full" aria-label="Assistant is typing">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm border border-primary-container/20">
          <Icon name="auto_awesome" filled size={20} />
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl rounded-tl-none px-6 py-5 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" />
          <span
            className="w-2 h-2 rounded-full bg-secondary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-secondary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

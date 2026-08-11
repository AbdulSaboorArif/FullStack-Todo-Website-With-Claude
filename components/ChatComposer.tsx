"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

type ChatComposerProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function ChatComposer({
  onSend,
  disabled = false,
  placeholder = "Ask about the Seerah...",
}: ChatComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  return (
    <div className="bg-gradient-to-t from-surface-bright via-surface-bright to-transparent pt-stack-md pb-stack-sm px-gutter md:px-margin-desktop z-20">
      <div className="max-w-3xl mx-auto">
        <form
          className="relative flex items-end bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-organic focus-within:border-primary focus-within:shadow-organic-focus transition-all duration-300 overflow-hidden group"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <button
            type="button"
            className="p-3 m-1 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container shrink-0 self-end"
            aria-label="Attach file"
          >
            <Icon name="attach_file" />
          </button>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-4 px-2 font-body-md text-body-md text-on-surface placeholder:text-outline min-h-[56px] max-h-32 scrollbar-hide focus:outline-none disabled:opacity-60"
          />
          <div className="flex items-center p-2 self-end shrink-0 gap-1">
            <button
              type="submit"
              disabled={disabled || !value.trim()}
              aria-label="Send message"
              className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="arrow_upward" filled size={20} />
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <span className="font-label-sm text-label-sm text-outline-variant text-[10px]">
            Answers are generated based on verified sources.
          </span>
        </div>
      </div>
    </div>
  );
}

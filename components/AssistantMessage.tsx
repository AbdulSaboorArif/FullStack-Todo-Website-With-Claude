"use client";

import { useState } from "react";
import { formatTime, parseContent, renderInline } from "@/lib/format";
import type { Message } from "@/lib/types";
import { Icon } from "./Icon";

type AssistantMessageProps = {
  message: Message;
};

export function AssistantMessage({ message }: AssistantMessageProps) {
  const blocks = parseContent(message.content);
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col items-start w-full group">
      <div className="flex gap-4 w-full">
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-1 shadow-sm border border-primary-container/20">
          <Icon name="auto_awesome" filled size={20} />
        </div>
        <div className="flex flex-col gap-3 w-full min-w-0">
          <div className="bg-surface-container-lowest border border-outline-variant border-l-4 border-l-secondary rounded-2xl rounded-tl-none px-6 py-5 shadow-sm">
            {message.tag ? (
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full font-label-sm text-label-sm border border-outline-variant/30">
                  {message.tag}
                </span>
              </div>
            ) : null}

            <div className="space-y-4 text-on-surface-variant leading-relaxed font-body-md text-body-md">
              {blocks.map((block, i) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={i}>
                      {renderInline(block.text, `p-${i}`)}
                    </p>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <p key={i} className="italic">
                      {renderInline(block.text, `q-${i}`)}
                    </p>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="space-y-3 list-none pl-1">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Icon
                            name="check_circle"
                            size={20}
                            className="text-secondary mt-1 shrink-0"
                          />
                          <span className="text-on-surface-variant">
                            {renderInline(item.text, `li-${i}-${j}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <ol
                    key={i}
                    className="list-decimal pl-5 space-y-2 text-on-surface"
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{renderInline(item, `ol-${i}-${j}`)}</li>
                    ))}
                  </ol>
                );
              })}
            </div>
          </div>

          {message.citations && message.citations.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3 bg-secondary-container/30 px-4 py-2 rounded-lg w-fit border border-secondary-container/50">
              <Icon name="menu_book" size={18} className="text-secondary" />
              <span className="font-label-sm text-label-sm text-on-secondary-container">
                Sources: {message.citations.map((c) => c.title).join(", ")}
              </span>
              <button
                type="button"
                onClick={() => setShowSources((s) => !s)}
                className="flex items-center gap-1 ml-2 text-primary hover:text-primary-container transition-colors duration-200 group/btn"
              >
                <span className="font-label-sm text-label-sm underline decoration-primary/30 group-hover/btn:decoration-primary">
                  View Source
                </span>
                <Icon name="arrow_forward" size={16} />
              </button>
            </div>
          ) : null}

          {showSources && message.citations ? (
            <div className="flex flex-col gap-2 w-full max-w-[90%]">
              {message.citations.map((citation, i) => (
                <div
                  key={i}
                  className="bg-surface p-3 rounded-lg border border-outline-variant/50 flex items-start gap-3 hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 text-tertiary">
                    <Icon name={citation.icon ?? "menu_book"} size={16} />
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">
                      {citation.title}
                    </h4>
                    {citation.detail ? (
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                        {citation.detail}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-3 justify-between w-full">
            <span className="font-label-sm text-label-sm text-outline">
              Seerah Q&A • {formatTime(message.createdAt)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                title={copied ? "Copied" : "Copy response"}
                className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant"
              >
                <Icon name={copied ? "check" : "content_copy"} size={20} />
              </button>
              <button
                type="button"
                title="Helpful"
                className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant"
              >
                <Icon name="thumb_up" size={20} />
              </button>
              <button
                type="button"
                title="Not helpful"
                className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant"
              >
                <Icon name="thumb_down" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

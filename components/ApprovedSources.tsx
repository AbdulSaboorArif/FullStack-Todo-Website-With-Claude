"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sources } from "@/lib/data";
import type { Source } from "@/lib/data";
import { Icon } from "./Icon";

type Category = "Shamail" | "Timeline" | "Seerah";

const tabs: { label: Category; icon: string }[] = [
  { label: "Shamail", icon: "menu_book" },
  { label: "Timeline", icon: "history" },
  { label: "Seerah", icon: "book" },
];

export function ApprovedSources() {
  const [activeTab, setActiveTab] = useState<Category>("Shamail");
  const [expandedId, setExpandedId] = useState<string | null>("shamail");

  const visibleSources = useMemo(
    () => sources.filter((source) => source.category === activeTab),
    [activeTab],
  );

  return (
    <aside className="hidden lg:flex flex-col w-80 bg-surface-container-low border-l border-outline-variant z-40 shrink-0 h-full">
      <div className="p-gutter border-b border-outline-variant">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <Icon name="library_books" />
          </div>
          <div>
            <h2 className="font-display font-bold text-primary leading-tight">
              Approved Sources
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Verified Corpus
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setActiveTab(tab.label);
                  const first = sources.find(
                    (s) => s.category === tab.label,
                  );
                  setExpandedId(first?.id ?? null);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="font-label-sm text-label-sm">
                  {tab.label}
                </span>
                {active ? (
                  <span className="ml-auto text-[11px] font-semibold">
                    {sources.filter((s) => s.category === tab.label).length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll p-gutter flex flex-col gap-3">
        {visibleSources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            expanded={expandedId === source.id}
            onToggle={() =>
              setExpandedId((current) =>
                current === source.id ? null : source.id,
              )
            }
          />
        ))}
      </div>

      <div className="p-gutter border-t border-outline-variant bg-surface-container-low">
        <Link
          href="/sources"
          className="w-full py-2 px-4 rounded-full border border-primary text-primary font-label-sm text-label-sm hover:bg-primary/5 transition-colors duration-200 text-center block"
        >
          View All Sources
        </Link>
        <div className="mt-4 flex justify-between px-2">
          <Link
            href="/account"
            className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Icon name="settings" size={20} />
            <span className="font-label-sm text-[10px]">Settings</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Icon name="help" size={20} />
            <span className="font-label-sm text-[10px]">Help</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SourceCard({
  source,
  expanded,
  onToggle,
}: {
  source: Source;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full text-left bg-surface-container-lowest rounded-xl p-4 border border-outline-variant shadow-sm hover:shadow-organic transition-shadow ${
        expanded ? "ring-1 ring-primary/30" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`font-label-sm text-[10px] px-2 py-1 rounded-full uppercase tracking-wider ${
            source.active
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-surface-variant text-on-surface-variant"
          }`}
        >
          {source.active ? "Active Source" : source.category}
        </span>
        <Icon
          name={expanded ? "expand_less" : "expand_more"}
          size={18}
          className="text-outline shrink-0"
        />
      </div>
      <div className="flex items-start gap-2 mb-1">
        <Icon
          name={source.icon}
          size={18}
          className="text-secondary shrink-0 mt-0.5"
        />
        <h3 className="font-label-md text-label-md font-semibold text-on-surface">
          {source.title}
        </h3>
      </div>
      <p className="text-[13px] leading-relaxed text-on-surface-variant">
        {source.description}
      </p>
      {expanded ? (
        <div className="mt-3 pt-3 border-t border-outline-variant/60">
          <p className="font-label-sm text-label-sm text-on-secondary-container mb-1">
            {source.author}
          </p>
          <p className="text-[13px] leading-relaxed text-on-surface-variant">
            {source.details}
          </p>
        </div>
      ) : null}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { sources } from "@/lib/data";
import type { Source } from "@/lib/data";

const filters = ["All", "Shamail", "Timeline", "Seerah"] as const;

function SourceCard({ source }: { source: Source }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-organic hover:shadow-organic-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
          <Icon name={source.icon} size={22} />
        </div>
        {source.active ? (
          <span className="bg-surface-variant text-on-surface-variant font-label-sm text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">
            Active
          </span>
        ) : (
          <span className="bg-gold/10 text-gold font-label-sm text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">
            Supplemental
          </span>
        )}
      </div>
      <h3 className="font-display font-semibold text-headline-md text-on-surface mb-1">
        {source.title}
      </h3>
      <p className="font-label-sm text-label-sm text-on-surface-variant mb-3">
        {source.author}
      </p>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
        {source.description}
      </p>
      <div className="border-t border-outline-variant/50 pt-4">
        <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
          {source.details}
        </p>
      </div>
    </div>
  );
}

export default function SourcesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sources.filter((source) => {
      const matchesFilter = filter === "All" || source.category === filter;
      const matchesQuery =
        q === "" ||
        source.title.toLowerCase().includes(q) ||
        source.author.toLowerCase().includes(q) ||
        source.description.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <main className="flex-1 pt-16 w-full max-w-max mx-auto px-gutter py-stack-lg">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-sm text-label-sm border border-outline-variant/30 mb-4">
          <Icon name="library_books" size={18} />
          Verified Corpus
        </span>
        <h1 className="font-display text-display-lg text-primary mb-3">
          Approved Sources
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Every answer is grounded in this approved corpus of Shamail and
          Seerah literature.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
            <Icon name="search" size={22} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sources by title or author..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-12 pr-6 font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm focus:outline-none"
          />
        </div>

        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-label-sm text-label-sm border transition-colors duration-200 ${
                filter === f
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16">
          <Icon
            name="search_off"
            size={48}
            className="text-outline mx-auto mb-4"
          />
          <p className="font-body-md text-body-md text-on-surface-variant">
            No sources match your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </main>
  );
}

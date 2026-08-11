"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApprovedSources } from "@/components/ApprovedSources";
import { AssistantMessage } from "@/components/AssistantMessage";
import { ChatComposer } from "@/components/ChatComposer";
import { Icon } from "@/components/Icon";
import { TypingIndicator } from "@/components/TypingIndicator";
import { UserMessage } from "@/components/UserMessage";
import { WelcomeSection } from "@/components/WelcomeSection";
import { askQuestion } from "@/lib/api";
import { generateId } from "@/lib/format";
import type { Message } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const send = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const history = [...messagesRef.current, userMessage];
      const result = await askQuestion(content, history);
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: result.answer,
        citations: result.citations,
        tag: result.tag,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content:
          "I'm having trouble reaching the answer service. Please make sure the FastAPI backend is running, then try again.",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(
        "Could not reach the backend. Start your FastAPI server and retry.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen px-6 py-24">
      <div className="max-w-4xl w-full text-center">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            A Beautiful, Simple Homepage
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clean starter layout for a Next.js app — responsive, accessible,
            and minimal so you can focus on building.
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-95"
          >
            {messages.length === 0 ? (
              <WelcomeSection onSelect={send} />
            ) : (
              <>
                <div className="text-center my-stack-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                    Today
                  </span>
                </div>

                {messages.map((message) =>
                  message.role === "user" ? (
                    <UserMessage key={message.id} message={message} />
                  ) : (
                    <AssistantMessage key={message.id} message={message} />
                  ),
                )}

                {isLoading ? <TypingIndicator /> : null}

                {error ? (
                  <div className="flex items-center gap-2 bg-error-container/40 text-on-error-container px-4 py-2 rounded-lg w-fit border border-error/20 mx-auto">
                    <Icon name="error_outline" size={18} />
                    <span className="font-label-sm text-label-sm">
                      {error}
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <ChatComposer onSend={send} disabled={isLoading} />
        </main>

        <ApprovedSources />
      </div>
    </div>
  );
}

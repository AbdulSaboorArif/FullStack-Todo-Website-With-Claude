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
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex pt-16 overflow-hidden h-[calc(100vh-64px)] relative w-full max-w-max mx-auto">
        <main className="flex-1 flex flex-col h-full bg-surface-bright w-full relative min-w-0">
          {messages.length > 0 ? (
            <div className="bg-surface-container py-3 px-gutter border-b border-outline-variant flex items-center justify-center gap-2 z-10 shrink-0 shadow-sm">
              <Icon name="info" size={18} className="text-outline" />
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Disclaimer: AI-generated content; no-fatwa policy applies.
                Verify critical information.
              </p>
            </div>
          ) : null}
=======
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
>>>>>>> 0d7174fa005da9334e07786fd35e414b4be98edf

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto chat-scroll px-gutter md:px-margin-desktop py-stack-md flex flex-col gap-stack-md scroll-smooth pb-32"
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

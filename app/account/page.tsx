"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";
import { getUser, login, logout, register } from "@/lib/auth";
import type { User } from "@/lib/auth";

type Mode = "login" | "register";

function Field({
  label,
  type = "text",
  value,
  onChange,
  icon,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-label-md text-label-md text-on-surface-variant mb-1.5 block">
        {label}
      </span>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
          <Icon name={icon} size={20} />
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm focus:outline-none"
        />
      </div>
    </label>
  );
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(() => getUser());
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in your email and password.");
      return;
    }

    try {
      if (mode === "register") {
        if (!name.trim()) {
          setError("Please enter your full name.");
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          return;
        }
        if (password !== confirm) {
          setError("Passwords do not match.");
          return;
        }
        const newUser = register(name.trim(), email.trim().toLowerCase(), password);
        setUser(newUser);
        setSuccess("Account created successfully. Welcome!");
      } else {
        const loggedIn = login(email.trim().toLowerCase(), password);
        setUser(loggedIn);
        setSuccess("Signed in successfully.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleLogout() {
    logout();
    setUser(null);
    setEmail("");
    setPassword("");
    setSuccess(null);
  }

  if (user) {
    return (
      <main className="flex-1 pt-16 w-full max-w-max mx-auto px-gutter py-stack-lg">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-primary-container/20 shadow-organic mb-4">
              <Icon name="person" size={40} filled />
            </div>
            <h1 className="font-display text-headline-lg text-primary">
              Your Account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              {user.name} • {user.email}
            </p>
          </div>

          {success ? (
            <div className="flex items-center gap-2 bg-secondary-container/40 text-on-secondary-container px-4 py-3 rounded-xl border border-secondary-container/50 mb-6">
              <Icon name="check_circle" size={20} />
              <span className="font-label-md text-label-md">{success}</span>
            </div>
          ) : null}

          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-organic flex flex-col gap-4">
            <LinkRow icon="chat_bubble" label="Ask a Question" href="/" />
            <LinkRow icon="menu_book" label="Browse Approved Sources" href="/sources" />
            <LinkRow icon="info" label="About this Project" href="/about" />
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-error text-error font-label-md text-label-md hover:bg-error/5 transition-colors duration-200"
            >
              <Icon name="logout" size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-16 w-full max-w-max mx-auto px-gutter py-stack-lg">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-primary-container/20 shadow-organic mb-4">
            <Icon name="person" size={32} filled />
          </div>
          <h1 className="font-display text-headline-lg text-primary">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            {mode === "login"
              ? "Sign in to continue your Seerah journey."
              : "Join to ask questions and save your conversations."}
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-organic">
          <div className="flex bg-surface-container rounded-full p-1 mb-6">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setSuccess(null);
                }}
                className={`flex-1 py-2 rounded-full font-label-md text-label-md transition-colors duration-200 ${
                  mode === m
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {error ? (
            <div className="flex items-center gap-2 bg-error-container/50 text-on-error-container px-4 py-3 rounded-xl border border-error/20 mb-5">
              <Icon name="error_outline" size={20} />
              <span className="font-label-md text-label-md">{error}</span>
            </div>
          ) : null}

          {success ? (
            <div className="flex items-center gap-2 bg-secondary-container/40 text-on-secondary-container px-4 py-3 rounded-xl border border-secondary-container/50 mb-5">
              <Icon name="check_circle" size={20} />
              <span className="font-label-md text-label-md">{success}</span>
            </div>
          ) : null}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <Field
                label="Full Name"
                value={name}
                onChange={setName}
                icon="badge"
                placeholder="Your name"
              />
            ) : null}
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              icon="mail"
              placeholder="you@example.com"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              icon="lock"
              placeholder="••••••••"
            />
            {mode === "register" ? (
              <Field
                label="Confirm Password"
                type="password"
                value={confirm}
                onChange={setConfirm}
                icon="lock"
                placeholder="••••••••"
              />
            ) : null}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors duration-200 mt-2"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>

        {mode === "login" ? (
          <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-6">
            Demo account: <strong className="text-on-surface">demo@seerah.app</strong> /{" "}
            <strong className="text-on-surface">demo1234</strong>
          </p>
        ) : null}
      </div>
    </main>
  );
}

function LinkRow({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors duration-200"
    >
      <Icon name={icon} size={22} />
      <span className="font-label-md text-label-md">{label}</span>
      <Icon name="chevron_right" size={20} className="ml-auto text-outline" />
    </Link>
  );
}

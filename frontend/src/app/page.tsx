
"use client";

import { useState } from "react";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkBackend() {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/health`
      );

      const data = await response.json();

      setConnected(data.status === "ok");
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              HireFlow AI
            </h1>

            <p className="mt-2 text-slate-400">
              Your autonomous AI career assistant
            </p>
          </div>

          <div className="rounded-full border border-slate-700 px-4 py-2 text-sm">
            Development
          </div>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Career Intelligence Dashboard
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Discover opportunities, analyze your resume,
            and build your career with AI-powered automation.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Jobs Discovered",
              value: "0",
              description: "Relevant opportunities",
            },
            {
              title: "Resume Match",
              value: "—",
              description: "Average compatibility",
            },
            {
              title: "Applications",
              value: "0",
              description: "Tracked applications",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <p className="mt-4 text-3xl font-bold">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">
            System Status
          </h3>

          <p className="mt-3 text-slate-400">
            Backend:
            {" "}
            {connected ? "Connected" : "Not connected"}
          </p>

          <button
            onClick={checkBackend}
            disabled={loading}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Backend"}
          </button>
        </section>
      </div>
    </main>
  );
}

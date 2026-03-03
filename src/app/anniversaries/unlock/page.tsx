"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UnlockForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/anniversaries";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/anniversaries-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid password");
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm rounded-2xl border border-pink-200 bg-white p-8 shadow-lg">
        <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
         Ai đó? Vui lòng nhập mật khẩu mới cho vào!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Ngày Tuấn tỏ tình Huệ là ngày nào nèk 
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20"
            autoFocus
            autoComplete="current-password"
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-pink-500 px-4 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AnniversariesUnlockPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading…</div>}>
      <UnlockForm />
    </Suspense>
  );
}

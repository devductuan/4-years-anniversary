"use server";

import type {
  PortfolioData,
} from "@/app/portfolio/portfolio.type";

function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL;
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    if (vercel.includes("://")) return vercel;
    return `https://${vercel}`;
  }
  return "http://localhost:3000";
}

export async function getPortfolio(): Promise<PortfolioData> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/portfolio`, { cache: "no-store" });
  console.log(base)
  console.log(res)
  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  const data = await res.json();
  if (!data || typeof data !== "object") {
    return {
      about: "",
      education: [],
      experience: [],
      volunteering: [],
      certifications: [],
      skills: [],
    };
  }

  return {
    about: typeof data.about === "string" ? data.about : "",
    education: Array.isArray(data.education) ? data.education : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    volunteering: Array.isArray(data.volunteering) ? data.volunteering : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
  };
}

export async function savePortfolio(portfolio: PortfolioData) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/portfolio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(portfolio),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Failed to save portfolio"
    );
  }
  return { success: true };
}

"use server";

import type { RoadMapItem } from "@/modules/anniversaries/Roadmap/roadmap.type";

function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function getRoadmap(): Promise<RoadMapItem[]> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/roadmap`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch roadmap");
  }
  const data = await res.json();
  const content = data?.content;
  return Array.isArray(content) ? content : [];
}

export async function saveRoadmap(roadmap: RoadMapItem[]) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roadmap),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Failed to save roadmap"
    );
  }
  return { success: true };
}

"use server";

import { Song } from "@/modules/anniversaries/SongPlayer/songs.type";

function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL;
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    if (vercel.includes("://")) return vercel;
    return `https://${vercel}`;
  }
  return "http://localhost:3000";
}

export async function updateSongsList(songs: Song[]) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/songs-list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(songs),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Failed to update songs");
  }
  return { success: true };
}

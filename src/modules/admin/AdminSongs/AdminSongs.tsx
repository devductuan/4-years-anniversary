import { Song } from "@/modules/anniversaries/SongPlayer/songs.type";
import { AdminSongsTable } from "./AdminSongsTable";

const getBaseUrl = (): string => {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const AdminSongs = async () => {
  const base = getBaseUrl();
  const songs: Song[] = await fetch(`${base}/api/songs-list`)
    .then((res) => res.json())
    .then((data) => data?.content ?? [])
    .catch(() => []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Songs</h2>
        <AdminSongsTable songs={songs} />
      </div>
    </section>
  );
};

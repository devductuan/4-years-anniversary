import { AnniversariesHero } from "@/modules/anniversaries/AnniversariesHero/AnniversariesHero";
import { Countdown } from "@/modules/anniversaries/Countdown/Countdown";
import { FloatingAudioPlayer } from "@/modules/anniversaries/FloatingAudioPlayer/FloatingAudioPlayer";
import { Roadmap } from "@/modules/anniversaries/Roadmap/Roadmap";
import { RoadMapItem } from "@/modules/anniversaries/Roadmap/roadmap.type";
import { SongPlayer } from "@/modules/anniversaries/SongPlayer/SongPlayer";
import { Song } from "@/modules/anniversaries/SongPlayer/songs.type";
import { OurStory } from "@/modules/anniversaries/OurStory/OurStory";

export const metadata = {
  title: "Happy Anniversary",
};

// Opt out of static prerender: this page fetches from our own API routes,
// which are not available at build time (no server running → ECONNREFUSED).
export const dynamic = "force-dynamic";

function getBaseUrl() {
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    if (vercel.includes("://")) return vercel;
    return `https://${vercel}`;
  }
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

const AnniversariesPage = async () => {
  const base = getBaseUrl();
  const [songsRes, roadmapRes, backgroundSongRes] = await Promise.all([
    fetch(`${base}/api/songs-list`),
    fetch(`${base}/api/roadmap`),
    fetch(`${base}/api/song?key=promise-of-the-world.mp3`),
  ]);
  const songs: Song[] = (await songsRes.json())?.content ?? [];
  const roadmap: RoadMapItem[] = (await roadmapRes.json())?.content ?? [];
  const backgroundSong = (await backgroundSongRes.json())?.url ?? null;
  
  return (
    <div>
      <AnniversariesHero />
      <Countdown />
      <SongPlayer songs={songs} />
      <Roadmap roadmap={roadmap} />
      <OurStory />
      <FloatingAudioPlayer songUrl={backgroundSong} />
    </div>
  );
};

export default AnniversariesPage;

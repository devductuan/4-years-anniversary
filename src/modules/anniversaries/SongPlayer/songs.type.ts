export type Song = {
  id: string;
  name: string;
  position: string;
  thumbnail: string;
  description: string;
  songUrl: string;
  liveLink?: string;
  lyricsString?: string;
  order: number;
};

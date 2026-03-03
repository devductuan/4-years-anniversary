"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

type FloatingAudioPlayerProps = {
  songUrl: string | null;
};

export const FloatingAudioPlayer = ({ songUrl }: FloatingAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasTriedAutoplay, setHasTriedAutoplay] = useState(false);

  useEffect(() => {
    if (!songUrl || !audioRef.current) return;
    const audio = audioRef.current;

    const tryAutoplay = () => {
      if (hasTriedAutoplay) return;
      setHasTriedAutoplay(true);
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    tryAutoplay();
  }, [songUrl, hasTriedAutoplay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [songUrl]);

  if (!songUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={songUrl} loop preload="auto" />
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gray-900/95 px-4 py-3 shadow-lg backdrop-blur-sm"
        role="region"
        aria-label="Background music player"
      >
        <span className="text-sm font-medium text-white/90">Promise of the World</span>
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FaPause className="h-4 w-4" />
          ) : (
            <FaPlay className="h-4 w-4 ml-0.5" />
          )}
        </button>
      </div>
    </>
  );
};

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import type { Song } from "./songs.type";

function getLyricsLines(lyricsString: string | undefined): string[] {
  if (!lyricsString?.trim()) return [];
  return lyricsString
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export const SongPlayer = ({ songs }: { songs: Song[] }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(songs[0]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoplayNextRef = useRef(false);

  const sortedSongs = useMemo(
    () => [...songs].sort((a, b) => a.order - b.order),
    [songs],
  );

  // Reset state when no song selected (deferred to avoid sync setState in effect)
  useEffect(() => {
    if (!selectedSong) {
      const t = setTimeout(() => {
        setAudioUrl(null);
        setCurrentTime(0);
        setDuration(0);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [selectedSong]);

  // Fetch signed audio URL when song is selected
  useEffect(() => {
    if (!selectedSong) return;
    const songUrl = selectedSong.songUrl;
    let cancelled = false;
    const loadingTimer = setTimeout(() => {
      if (!cancelled) {
        setIsLoading(true);
        setCurrentTime(0);
        setDuration(0);
      }
    }, 0);
    fetch(`/api/song?key=${encodeURIComponent(songUrl)}`)
      .then((res) => res.json())
      .then((data: { url?: string }) => {
        if (!cancelled) setAudioUrl(data.url ?? null);
      })
      .catch(() => {
        if (!cancelled) setAudioUrl(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
      clearTimeout(loadingTimer);
    };
  }, [selectedSong]);

  const lines = useMemo(
    () => getLyricsLines(selectedSong?.lyricsString),
    [selectedSong?.lyricsString],
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);

  const handleCanPlay = useCallback(() => {
    if (!shouldAutoplayNextRef.current) return;
    const audio = audioRef.current;
    if (audio) {
      shouldAutoplayNextRef.current = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setSelectedSong((current) => {
      if (!current || sortedSongs.length === 0) return current;
      const idx = sortedSongs.findIndex((s) => s.id === current.id);
      if (idx < 0 || idx >= sortedSongs.length - 1) {
        return sortedSongs[0] ?? null;
      }
      return sortedSongs[idx + 1] ?? sortedSongs[0];
    });
    shouldAutoplayNextRef.current = true;
  }, [sortedSongs]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio && !Number.isNaN(value)) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-8">Trạm nhạc</h2>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          {/* Song list */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50/50 p-2">
            {sortedSongs.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">
                Chưa có bài hát.
              </p>
            ) : (
              sortedSongs.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => setSelectedSong(song)}
                  className={`w-full flex items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                    selectedSong?.id === song.id
                      ? "bg-pink-100 text-pink-800 ring-1 ring-pink-200"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}>
                  <FaMusic />
                  <span className="truncate font-medium text-sm">
                    {song.name}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Player + lyrics */}
          <div className="flex flex-col min-h-[320px]">
            {selectedSong && (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <FaMusic />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {selectedSong.name}
                    </h3>
                    {selectedSong.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {selectedSong.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Audio element */}
                {audioUrl && (
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onCanPlay={handleCanPlay}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={handleEnded}
                    className="hidden"
                  />
                )}

                {/* Controls */}
                <div className="space-y-2 mb-6">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-pink-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      disabled={!audioUrl || isLoading}
                      className="px-4 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                      {isPlaying ? "Tạm dừng" : "Phát"}
                    </button>
                  </div>
                </div>

                {/* Lyrics */}
                <div className="flex-1 min-h-0 rounded-lg border border-gray-200 bg-gray-50/30 overflow-y-auto p-4 max-h-[360px]">
                  {lines.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Chưa có lời bài hát.
                    </p>
                  ) : (
                    <div className="space-y-1 text-gray-600">
                      {lines.map((line, i) => (
                        <p key={`${i}-${line.slice(0, 20)}`}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
import { Song } from "@/modules/anniversaries/SongPlayer/songs.type";
import { updateSongsList } from "./actions";

type AdminSongDetailFormProps = {
  song: Song;
  songs: Song[];
  onClose: () => void;
  onSuccess?: () => void;
};

export const AdminSongDetailForm = ({
  song,
  songs,
  onClose,
  onSuccess,
}: AdminSongDetailFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedSong: Song = {
      id: song.id,
      name: (formData.get("name") as string) ?? song.name,
      position: (formData.get("position") as string) ?? song.position,
      thumbnail: (formData.get("thumbnail") as string) ?? song.thumbnail,
      description: (formData.get("description") as string) ?? song.description,
      songUrl: (formData.get("songUrl") as string) ?? song.songUrl,
      liveLink: (formData.get("liveLink") as string) || undefined,
      lyricsString: (formData.get("lyricsString") as string) || undefined,
      order: Number(formData.get("order")) ?? song.order,
    };

    try {
      const newList = songs.map((s) =>
        s.id === song.id ? updatedSong : s
      );
      await updateSongsList(newList);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update songs");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-xl font-bold">
            Edit: {song.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <label htmlFor="id" className="font-medium text-gray-500">
              ID (read-only)
            </label>
            <span id="id" className="font-mono text-gray-600">
              {song.id}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-500">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={song.name}
              className="rounded border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="order" className="font-medium text-gray-500">
              Order
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={song.order}
              className="rounded border border-gray-300 px-3 py-2 w-20"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="position" className="font-medium text-gray-500">
              Position
            </label>
            <input
              id="position"
              name="position"
              type="text"
              defaultValue={song.position}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="thumbnail" className="font-medium text-gray-500">
              Thumbnail
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="text"
              defaultValue={song.thumbnail}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium text-gray-500">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={song.description}
              className="rounded border border-gray-300 px-3 py-2 resize-y"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="songUrl" className="font-medium text-gray-500">
              Song URL
            </label>
            <input
              id="songUrl"
              name="songUrl"
              type="text"
              defaultValue={song.songUrl}
              className="rounded border border-gray-300 px-3 py-2 font-mono text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="liveLink" className="font-medium text-gray-500">
              Live link
            </label>
            <input
              id="liveLink"
              name="liveLink"
              type="url"
              defaultValue={song.liveLink ?? ""}
              className="rounded border border-gray-300 px-3 py-2 font-mono text-xs"
              placeholder="Optional"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lyricsString" className="font-medium text-gray-500">
              Lyrics
            </label>
            <textarea
              id="lyricsString"
              name="lyricsString"
              rows={6}
              defaultValue={song.lyricsString ?? ""}
              className="rounded border border-gray-300 px-3 py-2 text-xs resize-y font-mono"
              placeholder="Optional"
            />
          </div>

          {error && (
            <p className="rounded bg-red-50 p-2 text-red-700 text-sm">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

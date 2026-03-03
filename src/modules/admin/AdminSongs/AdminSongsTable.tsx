"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Song } from "@/modules/anniversaries/SongPlayer/songs.type";
import { AdminSongDetailForm } from "./AdminSongDetailForm";

type AdminSongsTableProps = {
  songs: Song[];
};

export function AdminSongsTable({ songs }: AdminSongsTableProps) {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">
                Song name
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(songs ?? []).map((song) => (
              <tr key={song.id}>
                <td className="border border-gray-300 px-3 py-2 font-medium">
                  {song.name}
                </td>
                <td
                  className="border border-gray-300 px-3 py-2 max-w-xs truncate"
                  title={song.description}
                >
                  {song.description}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSong(song)}
                    className="rounded bg-gray-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSong && (
        <AdminSongDetailForm
          song={selectedSong}
          songs={songs}
          onClose={() => setSelectedSong(null)}
          onSuccess={() => router.refresh()}
        />
      )}
    </>
  );
}

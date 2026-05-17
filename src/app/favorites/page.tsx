"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("favorites") || "[]");

    setFavorites(stored);

  }, []);

  function removeFavorite(id: number) {

    const updated = favorites.filter(
      (anime) => anime.mal_id !== id
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    setFavorites(updated);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-purple-500 mb-10">
          My Favorites
        </h1>

        {favorites.length === 0 ? (

          <div className="text-gray-400 text-xl">
            No favorites yet.
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {favorites.map((anime: any, index: number) => (

              <div
                key={`${anime.mal_id}-${index}`}
                className="bg-gray-900 rounded-2xl overflow-hidden"
              >

                <Link href={`/anime/${anime.mal_id}`}>

                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-80 object-cover hover:scale-105 transition"
                  />

                </Link>

                <div className="p-4">

                  <h2 className="font-bold text-lg">
                    {anime.title}
                  </h2>

                  <button
                    onClick={() =>
                      removeFavorite(anime.mal_id)
                    }
                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
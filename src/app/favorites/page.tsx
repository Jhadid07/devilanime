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

          <div className="flex flex-col items-center justify-center py-20">

  <h2 className="text-3xl font-bold text-gray-400">
    No Favorites Yet
  </h2>

  <p className="mt-4 text-gray-500">
    Add anime to build your collection.
  </p>

  <Link
    href="/"
    className="mt-8 bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700"
  >
    Explore Anime
  </Link>

</div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {favorites.map((anime: any, index: number) => (

              <div
  key={`${anime.mal_id}-${index}`}
  className="relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 hover:-translate-y-1 transition duration-300 border border-gray-800 hover:border-purple-500"
>

                <Link href={`/anime/${anime.mal_id}`}>

                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-80 object-cover hover:scale-105 transition"
                  />

                  <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-full text-sm">
  ⭐ {anime.score}
</div>

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
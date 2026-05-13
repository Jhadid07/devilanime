"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [animeList, setAnimeList] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    async function fetchAnime() {

      const res = await fetch(
        "https://api.jikan.moe/v4/top/anime"
      );

      const data = await res.json();

      setAnimeList(data.data);
    }

    fetchAnime();

  }, []);

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between border-b border-gray-800 pb-4">

        <h1 className="text-3xl font-bold text-purple-500">
          DEVILANIME
        </h1>

        <div className="flex gap-6 text-gray-300">
          <a href="#">Home</a>
          <a href="#">Trending</a>
          <a href="#">Popular</a>
        </div>

      </nav>

      {/* HERO */}
      <section
        className="relative h-[500px] rounded-3xl overflow-hidden flex items-center justify-center text-center mb-12 mt-8"
      >

        <img
          src="https://images6.alphacoders.com/135/1353380.png"
          alt="anime banner"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 px-6">

          <h2 className="text-6xl font-extrabold text-purple-500">
            DEVILANIME
          </h2>

          <p className="text-gray-300 mt-6 text-xl max-w-2xl">
            Explore trending anime and legendary classics.
          </p>

          <button className="mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg transition">
            Explore Anime
          </button>

        </div>

      </section>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">

        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 outline-none"
        />

      </div>

      {/* GENRES */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">

        <button className="bg-purple-600 px-5 py-2 rounded-xl">
          All
        </button>

        <button className="bg-gray-900 px-5 py-2 rounded-xl">
          Action
        </button>

        <button className="bg-gray-900 px-5 py-2 rounded-xl">
          Romance
        </button>

        <button className="bg-gray-900 px-5 py-2 rounded-xl">
          Fantasy
        </button>

        <button className="bg-gray-900 px-5 py-2 rounded-xl">
          Comedy
        </button>

      </div>

      {/* TOP ANIME */}
      <section>

        <h2 className="text-3xl font-bold mb-6 text-purple-500">
          Top Rated Anime
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredAnime.slice(0, 12).map((anime: any) => (

            <Link
              key={anime.mal_id}
              href={`/anime/${anime.mal_id}`}
              className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 hover:shadow-purple-500/40 hover:shadow-2xl transition duration-300"
            >

              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {anime.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  Score: {anime.score}
                </p>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {anime.synopsis}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}
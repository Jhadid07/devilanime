"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
const banners = [
  "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
  "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
  "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
  "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
];

export default function Home() {

  const [randomBanner, setRandomBanner] = useState("");

  useEffect(() => {
    const random =
      banners[Math.floor(Math.random() * banners.length)];

    setRandomBanner(random);
  }, []);

  const [animeList, setAnimeList] = useState<any[]>([]);
  const [search, setSearch] = useState("");


  useEffect(() => {

  async function fetchAnime() {

    const url = search
      ? `https://api.jikan.moe/v4/anime?q=${search}`
      : "https://api.jikan.moe/v4/top/anime";

    const res = await fetch(url);

    const data = await res.json();

    setAnimeList(data.data || []);
  }

  fetchAnime();

}, [search]);

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
      <section className="relative h-[500px] flex items-center justify-center text-center">

{randomBanner && (
  <img
    src={randomBanner}
    alt="anime banner"
    className="absolute w-full h-full object-cover opacity-40"
  />
)}

  <div className="relative z-10">
    <h1 className="text-6xl font-extrabold text-purple-500">
      DEVILANIME
    </h1>

    <p className="mt-4 text-xl text-gray-300">
      Explore trending anime and legendary classics.
    </p>

    <button className="mt-6 px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition">
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

  {(animeList || []).slice(0, 24).map((anime: any, index: number) => (

    <Link
      key={`${anime.mal_id}-${index}`}
      href={`/anime/${anime.mal_id}`}
      className="relative group bg-gray-900/80 backdrop-blur rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500"
    >

      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
        ⭐ {anime.score}
      </div>

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {anime.title}
        </h2>

        <p className="text-gray-400 mt-2">
          ⭐ Score: {anime.score}
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
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

  const changeBanner = () => {

    const random =
      banners[Math.floor(Math.random() * banners.length)];

    setRandomBanner(random);
  };

  changeBanner();

  const interval = setInterval(changeBanner, 5000);

  return () => clearInterval(interval);

}, []);

  const [animeList, setAnimeList] = useState<any[]>([]);
  const [airingAnime, setAiringAnime] = useState<any[]>([]);
const [upcomingAnime, setUpcomingAnime] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);


  useEffect(() => {

  async function fetchAnime() {

    const url = debouncedSearch
  ? `https://api.jikan.moe/v4/anime?q=${debouncedSearch}&page=${page}`
  : genre
  ? `https://api.jikan.moe/v4/anime?genres=${genre}&page=${page}`
  : `https://api.jikan.moe/v4/top/anime?page=${page}`;

    const res = await fetch(url);

    const data = await res.json();

    if (page === 1) {
  setAnimeList(data.data || []);
} else {
  setAnimeList((prev) => [
    ...prev,
    ...(data.data || [])
  ]);
}

    const airingRes = await fetch(
  "https://api.jikan.moe/v4/top/anime?filter=airing"
);

const airingData = await airingRes.json();

setAiringAnime(airingData.data || []);

const upcomingRes = await fetch(
  "https://api.jikan.moe/v4/seasons/upcoming"
);

const upcomingData = await upcomingRes.json();

setUpcomingAnime(upcomingData.data || []);
  }

  fetchAnime();

}, [debouncedSearch, genre, page]);

useEffect(() => {

  const timer = setTimeout(() => {

    setDebouncedSearch(search);

  }, 500);

  return () => clearTimeout(timer);

}, [search]);

useEffect(() => {
  setPage(1);
}, [debouncedSearch, genre]);

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between border-b border-gray-800 pb-4">

  <h1 className="text-3xl font-bold text-purple-500">
    DEVILANIME
  </h1>

  <div className="hidden md:flex gap-6 text-gray-300 items-center">

    <Link href="/">
      Home
    </Link>

    <a href="#trending">
      Trending
    </a>

    <a href="#toprated">
      Top Rated
    </a>

    <Link href="/favorites">
      Favorites
    </Link>

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

        <button
  onClick={() => setGenre("")}
  className="bg-purple-600 px-5 py-2 rounded-xl"
>
  All
</button>

        <button
  onClick={() => setGenre("1")}
  className="bg-gray-900 px-5 py-2 rounded-xl"
>
  Action
</button>

        <button
  onClick={() => setGenre("22")}
  className="bg-gray-900 px-5 py-2 rounded-xl"
>
  Romance
</button>

        <button
  onClick={() => setGenre("10")}
  className="bg-gray-900 px-5 py-2 rounded-xl"
>
  Fantasy
</button>

        <button
  onClick={() => setGenre("4")}
  className="bg-gray-900 px-5 py-2 rounded-xl"
>
  Comedy
</button>

      </div>

      {/* TOP ANIME */}
      <section>

        <section id="trending" className="mb-16">

  <h2 className="text-4xl font-bold text-purple-500 mb-6">
    Trending Now
  </h2>

  <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">

    {animeList.slice(0, 10).map((anime: any, index: number) => (

      <Link
        key={`trending-${anime.mal_id}-${index}`}
        href={`/anime/${anime.mal_id}`}
        className="min-w-[300px] relative rounded-2xl overflow-hidden group"
      >

        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-[300px] h-[420px] object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-0 p-4">

          <h3 className="text-2xl font-bold">
            {anime.title}
          </h3>

          <p className="text-gray-300 mt-2">
            ⭐ {anime.score}
          </p>

        </div>

      </Link>

    ))}

  </div>

</section>

<section id="toprated" className="mb-16">

<h2 className="text-3xl font-bold mb-6 text-purple-500">
          Top Rated Anime
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  {animeList.map((anime: any, index: number) => (

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

        <div className="flex justify-center mt-10">

  <button
    onClick={() => setPage(page + 1)}
    className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition"
  >
    Load More
  </button>

</div>

      </section>

      <section className="mt-20">

  <h2 className="text-3xl font-bold mb-6 text-purple-500">
    Top Airing Anime
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    {airingAnime.slice(0, 8).map((anime: any, index: number) => (

      <Link
        key={`${anime.mal_id}-${index}`}
        href={`/anime/${anime.mal_id}`}
        className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition"
      >

        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">

          <h3 className="font-bold">
            {anime.title}
          </h3>

        </div>

      </Link>

    ))}

  </div>

</section>

<section className="mt-20">

  <h2 className="text-3xl font-bold mb-6 text-purple-500">
    Upcoming Anime
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    {upcomingAnime.slice(0, 8).map((anime: any, index: number) => (

      <Link
        key={`${anime.mal_id}-${index}`}
        href={`/anime/${anime.mal_id}`}
        className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition"
      >

        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">

          <h3 className="font-bold">
            {anime.title}
          </h3>

        </div>

      </Link>

    ))}

  </div>

</section>

</section>

    </main>
  );
}
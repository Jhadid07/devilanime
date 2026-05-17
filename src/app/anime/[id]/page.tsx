"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AnimePage() {

  const params = useParams();

  const [anime, setAnime] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {

    async function fetchAnime() {

      const animeRes = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}`
      );

      const animeData = await animeRes.json();

      setAnime(animeData.data);

      const recRes = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}/recommendations`
      );

      const recData = await recRes.json();

      setRecommendations(recData.data || []);

      const epRes = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}/episodes`
      );

      const epData = await epRes.json();

      setEpisodes(epData.data || []);

      const favorites =
        JSON.parse(localStorage.getItem("favorites") || "[]");

      const exists = favorites.find(
        (fav: any) => fav.mal_id === animeData.data.mal_id
      );

      setFavorite(!!exists);
    }

    fetchAnime();

  }, [params.id]);

  function toggleFavorite() {

    const favorites =
      JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorite) {

      const updated = favorites.filter(
        (fav: any) => fav.mal_id !== anime.mal_id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      setFavorite(false);

    } else {

      favorites.push(anime);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      setFavorite(true);
    }
  }

  if (!anime) {
  return (
    <main className="min-h-screen bg-black text-white p-10 animate-pulse">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <div className="bg-gray-800 h-[600px] rounded-2xl"></div>

        <div className="space-y-6">

          <div className="bg-gray-800 h-14 rounded w-3/4"></div>

          <div className="bg-gray-800 h-10 rounded w-1/3"></div>

          <div className="bg-gray-800 h-40 rounded"></div>

          <div className="bg-gray-800 h-8 rounded w-1/2"></div>

          <div className="bg-gray-800 h-8 rounded w-2/3"></div>

        </div>

      </div>

    </main>
  );
}

  return (

    <main className="min-h-screen bg-black text-white">

  <div className="relative h-[500px]">

    <img
      src={anime.images.jpg.large_image_url}
      alt={anime.title}
      className="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

    <div className="absolute bottom-10 left-10">

      <h1 className="text-6xl font-bold text-purple-500">
        {anime.title}
      </h1>

      <p className="mt-4 text-xl text-gray-300">
        ⭐ {anime.score} • {anime.year}
      </p>

    </div>

  </div>

  <div className="p-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-2xl shadow-2xl border border-purple-500"
        />

        <div>

          <button
  onClick={toggleFavorite}
  className={`mt-6 px-6 py-3 rounded-xl font-bold transition ${
    favorite
      ? "bg-red-600 hover:bg-red-700"
      : "bg-purple-600 hover:bg-purple-700"
  }`}
>
  {favorite ? "❤️ Added to Favorites" : "🤍 Add to Favorites"}
</button>

          <p className="text-gray-400 mt-4">
            {anime.synopsis}
          </p>

          <div className="mt-6 space-y-4 text-lg">

  <p>⭐ Score: {anime.score}</p>

  <p>🎬 Episodes: {anime.episodes}</p>

  <p>📺 Status: {anime.status}</p>

  <p>🏆 Rank: #{anime.rank}</p>

  <p>❤️ Favorites: {anime.favorites}</p>

  <p>📅 Year: {anime.year}</p>

  <p>
    🎨 Genres:
    {" "}
    {anime.genres.map((genre: any) => genre.name).join(", ")}
  </p>

  <p>
    🏢 Studio:
    {" "}
    {anime.studios.map((studio: any) => studio.name).join(", ")}
  </p>

</div>

          {anime.trailer?.embed_url && (
  <div className="mt-10">

    <h2 className="text-3xl font-bold mb-4 text-purple-500">
      Trailer
    </h2>

    <iframe
  src={anime.trailer.embed_url}
  width="100%"
  height="500"
  allowFullScreen
  className="rounded-2xl border border-purple-500"
></iframe>

  </div>
)}

        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-20">

  <h2 className="text-4xl font-bold text-purple-500 mb-8">
    Episodes
  </h2>

  <div className="grid gap-4">

    {episodes.slice(0, 12).map((ep: any) => (

      <div
  key={ep.mal_id}
  className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-purple-500 transition flex items-center justify-between"
>

        <h3 className="text-xl font-bold">
          Episode {ep.mal_id}
        </h3>

        <p className="text-gray-400 mt-2">
          {ep.title}
        </p>

  <a
  href={`https://www.youtube.com/results?search_query=${anime.title}+episode+${ep.mal_id}`}
  target="_blank"
  className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700 transition"
>
  Watch Now
</a>

      </div>

    ))}

  </div>

</div>

      <div className="max-w-6xl mx-auto mt-20">

  <h2 className="text-4xl font-bold text-purple-500 mb-8">
    Recommended Anime
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {recommendations.slice(0, 6).map((rec: any, index: number) => (

      <Link
        key={`${rec.entry.mal_id}-${index}`}
        href={`/anime/${rec.entry.mal_id}`}
        className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition"
      >

        <img
          src={rec.entry.images.jpg.image_url}
          alt={rec.entry.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">

          <h3 className="font-bold text-lg">
            {rec.entry.title}
          </h3>

        </div>

      </Link>

    ))}

  </div>

</div>

</div>

    </main>
  );
}
async function getAnime(id: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/full`
  );

  const data = await res.json();

  return data.data;
}

export default async function AnimePage({
  params,
}: {
  params: { id: string };
}) {

  const anime = await getAnime(params.id);

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* BACK BUTTON */}
      <a
        href="/"
        className="text-purple-500 hover:text-purple-400"
      >
        ← Back
      </a>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 mt-8">

        {/* IMAGE */}
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-2xl"
        />

        {/* INFO */}
        <div>

          <h1 className="text-5xl font-bold text-purple-500">
            {anime.title}
          </h1>

          <p className="mt-6 text-gray-300 leading-8">
            {anime.synopsis}
          </p>

          {/* STATS */}
          <div className="mt-8 space-y-3 text-lg">

            <p>
              ⭐ Score: {anime.score}
            </p>

            <p>
              🎬 Episodes: {anime.episodes}
            </p>

            <p>
              📺 Status: {anime.status}
            </p>

            <p>
              🏆 Rank: #{anime.rank}
            </p>

            <p>
              ❤️ Favorites: {anime.favorites}
            </p>

          </div>

          {/* TRAILER BUTTON */}
          {anime.trailer?.url && (
            <a
              href={anime.trailer.url}
              target="_blank"
              className="inline-block mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl transition"
            >
              ▶ Watch Trailer
            </a>
          )}

        </div>

      </div>

    </main>
  );
}
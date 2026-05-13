type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getAnime(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

  const data = await res.json();
  return data.data;
}

export default async function AnimePage({ params }: Props) {
  const { id } = await params;

  const anime = await getAnime(id);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-5xl font-bold text-purple-500">
            {anime.title}
          </h1>

          <p className="text-gray-400 mt-4">
            {anime.synopsis}
          </p>

          <div className="mt-6 space-y-3 text-lg">

            <p>⭐ Score: {anime.score}</p>

            <p>🎬 Episodes: {anime.episodes}</p>

            <p>📺 Status: {anime.status}</p>

            <p>🏆 Rank: #{anime.rank}</p>

            <p>❤️ Favorites: {anime.favorites}</p>

          </div>

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
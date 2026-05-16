import Link from "next/link";

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

async function getRecommendations(id: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`
  );

  const data = await res.json();

  return data.data;
}

export default async function AnimePage({ params }: Props) {
  const { id } = await params;

  const anime = await getAnime(id);
  const recommendations = await getRecommendations(id);

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

    </main>
  );
}
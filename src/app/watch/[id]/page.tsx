type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getAnime(id: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );

  const data = await res.json();

  return data.data;
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;

  const anime = await getAnime(id);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-purple-500 mb-8">
          Watch {anime.title}
        </h1>

        {anime.trailer?.embed_url ? (

          <iframe
            src={anime.trailer.embed_url}
            width="100%"
            height="700"
            allowFullScreen
            className="rounded-2xl border border-purple-500"
          ></iframe>

        ) : (

          <div className="bg-gray-900 p-10 rounded-2xl text-center text-gray-400">
            No video available.
          </div>

        )}

      </div>

    </main>
  );
}
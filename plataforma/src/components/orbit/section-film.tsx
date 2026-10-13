export function FieldVideo({ src, className }: { src: string; className?: string }) {
  const poster = src.replace(/\.mp4$/, ".jpg");
  return (
    <video className={className} autoPlay muted loop playsInline poster={poster}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function SectionFilm({
  src,
  poster,
  kicker,
  title,
}: {
  src: string;
  poster: string;
  kicker?: string;
  title: string;
}) {
  return (
    <header className="section-film" style={{ background: `#0c0e0d url("${poster}") center / cover no-repeat` }}>
      <video autoPlay muted loop playsInline poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="section-film-copy">
        {kicker ? <p>{kicker}</p> : null}
        <h1>{title}</h1>
      </div>
    </header>
  );
}

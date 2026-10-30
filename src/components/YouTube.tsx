import Image from "next/image";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { getI18n } from "@/i18n/server";

/** MDX: <YouTube id="WrqDOxZmRug" title="…" />. A 16:9 video that loads from YouTube only when played. */
export async function YouTube({ id, title }: { id: string; title: string }) {
  const { t } = await getI18n();
  return (
    <figure className="not-prose relative my-10 aspect-video overflow-hidden rounded-card bg-navy-900">
      <YouTubePlayer id={id} title={title} playLabel={t.video.play}>
        <Image
          src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 768px) 42rem, 100vw"
          className="object-cover"
        />
      </YouTubePlayer>
    </figure>
  );
}

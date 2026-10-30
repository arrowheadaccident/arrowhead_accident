"use client";

import { useState, type ReactNode } from "react";
import { Play } from "lucide-react";

type Props = {
  id: string;
  /** The video's title in the page's language: iframe title and part of the play link's name. */
  title: string;
  /** Dictionary["video"]["play"] of the page's language. */
  playLabel: string;
  /** The thumbnail, rendered on the server. */
  children: ReactNode;
};

/**
 * Thumbnail first, YouTube player on click, so the page loads nothing from YouTube until then. Without
 * JavaScript the link opens the video on youtube.com.
 */
export function YouTubePlayer({ id, title, playLabel, children }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    );
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      aria-label={`${playLabel}: ${title}`}
      onClick={(event) => {
        event.preventDefault();
        setPlaying(true);
      }}
      className="group absolute inset-0 flex items-center justify-center focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-lane"
    >
      {children}
      <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-navy-900/85 text-white shadow-lg ring-4 ring-white/80 transition-colors duration-150 ease-out group-hover:bg-navy-900 md:size-20">
        <Play aria-hidden="true" className="ml-1 size-7 fill-current md:size-8" />
      </span>
    </a>
  );
}

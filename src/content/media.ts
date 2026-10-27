/* Product media for the homepage, one entry per slot.
 *
 * Each slot shows `poster` until it scrolls near the viewport. If `video` is set,
 * the slot then loads the clip and plays it muted on a loop while visible. Every
 * slot also opens in the lightbox, where the clip keeps playing.
 *
 * The clips are scripted recordings of the platform's sandbox build (the same
 * bundle /demo serves, seed 20261026, Northwind Commerce), so every number in
 * them matches what a visitor sees when they try it. They're captured at 2x
 * (2560×1600) so they stay sharp full width and in the lightbox, run 15 to 22
 * seconds, hold about a second after the last click, then fade back into their
 * first frame. H.264 MP4 and VP9 WebM, about 1 to 2.3 MB each. Posters are the
 * first frame as WebP. */

export type Media = {
  poster: string;
  width: number;
  height: number;
  alt: string;
  video?: { webm?: string; mp4?: string };
};

const clip = (name: string, alt: string): Media => ({
  poster: `/media/${name}.webp`,
  width: 2560,
  height: 1600,
  alt,
  video: { webm: `/media/${name}.webm`, mp4: `/media/${name}.mp4` },
});

export const MEDIA: Record<"hero" | "discover" | "optimize" | "converse" | "agents", Media> = {
  hero: clip(
    "hero",
    "The Overview page for Northwind Commerce: opening a finding that needs a person, approving the idle developer environments, then starting a scan",
  ),
  discover: clip(
    "discover",
    "The Infrastructure map filtered to cloud, then data center, then opening the storefront web fleet to see its live CPU, memory and cost",
  ),
  optimize: clip(
    "optimize",
    "Approving the cold data finding from Overview, then filtering the Agents page to changes and opening the run that applies it",
  ),
  converse: clip(
    "converse",
    "Quick Chat answering where the money is going, then which servers are idle and what stopping them would save",
  ),
  agents: clip(
    "agents",
    "The Agents page filtered to scheduled runs, then one run opened: the map of integrations it touched and a summary from the run's chat",
  ),
};

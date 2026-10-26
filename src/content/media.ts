/* Product media for the homepage, one entry per slot.
 *
 * Each slot shows `poster` until it scrolls near the viewport. If `video` is set,
 * the slot then loads the clip and plays it muted on a loop while visible. Phase B
 * drops real recordings of the platform into public/media/ and fills in `video`.
 * Every slot also opens in the lightbox, where a recording keeps playing.
 *
 * Recordings: 1600×1000 (16:10), H.264 MP4 + VP9 WebM, under ~2.5 MB each,
 * 8 to 14 seconds, with the last frame matching the first so the loop has no
 * jump. Posters: the first frame as WebP, same size. */

export type Media = {
  poster: string;
  width: number;
  height: number;
  alt: string;
  video?: { webm?: string; mp4?: string };
};

export const MEDIA: Record<"hero" | "discover" | "optimize" | "converse" | "agents", Media | null> = {
  hero: {
    poster: "/home/dashboard.webp",
    width: 2000,
    height: 1250,
    alt: "Martian's overview page, with $47K of identified waste at the top and the findings behind it ranked by savings",
  },
  discover: {
    poster: "/home/topology.webp",
    width: 2000,
    height: 1250,
    alt: "Topology view that groups resources by where they run, with a monthly cost on each group",
  },
  optimize: {
    poster: "/home/optimizations.webp",
    width: 1920,
    height: 1104,
    alt: "Findings list led by idle EC2 instances, with each finding's monthly savings and how long the fix takes",
  },
  converse: {
    poster: "/home/chat.webp",
    width: 1920,
    height: 1527,
    alt: "A chat with Martian running a performance check, with a side panel listing each agent step and what it found",
  },
  // No screenshot yet: the homepage shows an HTML preview until Phase B records it.
  agents: null,
};

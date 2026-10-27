import { lazy } from "react";

/* Route chunks. Importers are kept separately so links can prefetch a page on
 * hover and the transition can wait for the chunk before swapping pages. */
export const importers = {
  "/demo": () => import("./pages/Demo"),
  notFound: () => import("./pages/NotFound"),
} as const;

export const DemoPage = lazy(importers["/demo"]);
export const NotFoundPage = lazy(importers.notFound);

/** Start loading the code for a path. Safe to call many times. */
export function preloadRoute(path: string) {
  const key = path.split(/[?#]/)[0] as keyof typeof importers;
  const load = importers[key];
  return load ? load().then(() => undefined, () => undefined) : Promise.resolve();
}

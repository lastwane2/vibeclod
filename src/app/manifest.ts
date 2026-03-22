import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "vibeclod — Learn to ship software with AI",
    short_name: "vibeclod",
    description:
      "Learn to build real software products with AI. 23 hands-on levels. Real repos. Ship or don't level up.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#E8A445",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

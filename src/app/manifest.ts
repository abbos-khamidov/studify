import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studify — обучение за рубежом",
    short_name: "Studify",
    description: "Поступление в университеты за рубежом после школы из Узбекистана.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FF8225",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/studify-logo-1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

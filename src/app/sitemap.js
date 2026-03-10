import { getCake } from "@/actions/server/cake";

export default async function sitemap() {
  const baseUrl = "https://cream-and-co.vercel.app";

  // Static routes
  const routes = ["", "/shop", "/about", "/contact", "/custom", "/payment"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Dynamic products (cakes)
  try {
    const { cakes } = await getCake({ limit: 100 });
    const cakeRoutes = (cakes || []).map((cake) => ({
      url: `${baseUrl}/shop/${cake._id}`,
      lastModified: cake.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...routes, ...cakeRoutes];
  } catch (error) {
    return routes;
  }
}

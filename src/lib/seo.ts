export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_NAME = "TrolleyRoast";
const SITE_URL = "https://trolleyroast.co.uk";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function applySeo({ title, description, path, ogType = "website", jsonLd }: SeoConfig) {
  if (typeof document === "undefined") return;

  const canonicalUrl = new URL(path, SITE_URL).toString();

  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:image", DEFAULT_OG_IMAGE);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
  setCanonical(canonicalUrl);

  if (jsonLd) setJsonLd(jsonLd);
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  let tag = document.head.querySelector<HTMLScriptElement>('script[data-schema="route"]');

  if (!tag) {
    tag = document.createElement("script");
    tag.setAttribute("type", "application/ld+json");
    tag.setAttribute("data-schema", "route");
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data);
}

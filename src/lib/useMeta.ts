import { useEffect } from 'react';
import { site, type PageMeta } from '../config/site';

function setMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/** Keeps the document title and sharing tags in step with the current page. */
export function useMeta({ path, title, description }: PageMeta) {
  useEffect(() => {
    const pageUrl = `${site.url}${path === '/' ? '' : path}`;
    document.title = title;
    setMetaContent('name', 'description', description);
    setMetaContent('property', 'og:title', title);
    setMetaContent('property', 'og:description', description);
    setMetaContent('property', 'og:url', pageUrl);
    setMetaContent('property', 'og:image', `${site.url}/og-image.png`);
    setMetaContent('name', 'twitter:title', title);
    setMetaContent('name', 'twitter:description', description);
    setCanonicalLink(pageUrl);
  }, [path, title, description]);
}

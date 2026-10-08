import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function isPublished(post: Post) {
  return !post.data.draft && post.data.pubDate.getTime() <= Date.now();
}

export async function getPosts(includeUnpublished = import.meta.env.DEV) {
  const posts = await getCollection('blog');
  return posts
    .filter(post => includeUnpublished || isPublished(post))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function postUrl(post: Post) {
  return `/blog/${post.id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function formatDate(date: Date, lang = 'en') {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

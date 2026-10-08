import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { sitePath } from '../lib/urls';

export async function GET(context: APIContext) {
  const posts = await getPosts(false);
  return rss({
    title: 'Veronika Volokitina — Blog',
    description: 'Articles and notes by Veronika Volokitina.',
    site: new URL(sitePath(), context.site!),
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
    })),
  });
}

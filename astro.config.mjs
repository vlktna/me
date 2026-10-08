import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const base = `/${(process.env.BASE_PATH || '').split('/').filter(Boolean).join('/')}`;

function prefixMarkdownUrl(node, context) {
  if (base !== '/' && /^\/(?!\/)/.test(node.url)) {
    context.setProperty(node, 'url', base + node.url);
  }
}

export default defineConfig({
  site: process.env.SITE_URL || 'https://vlktna.com',
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: 'github-light' },
    processor: satteri({
      mdastPlugins: [{
        name: 'deployment-base-path',
        link: prefixMarkdownUrl,
        image: prefixMarkdownUrl,
        definition: prefixMarkdownUrl,
      }],
    }),
  },
});

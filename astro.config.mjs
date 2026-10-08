import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const base = `/${(process.env.BASE_PATH || '').split('/').filter(Boolean).join('/')}`;

// Keep root-relative Markdown links and images working under a project subpath.
function prefixMarkdownUrl(node, context) {
  if (base !== '/' && /^\/(?!\/)/.test(node.url)) {
    context.setProperty(node, 'url', base + node.url);
  }
}

export default defineConfig({
  site: process.env.SITE_URL || 'https://vlktna.v-volokitinaa.chatgpt.site',
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

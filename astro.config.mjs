import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vlktna.v-volokitinaa.chatgpt.site',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-light' } },
});

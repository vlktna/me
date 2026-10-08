import { mkdir, readFile, writeFile } from 'node:fs/promises';

const [slug, ...titleParts] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new-post -- my-post "My post title"');
  console.error('Use lowercase English letters, numbers and hyphens for the URL.');
  process.exit(1);
}

const directory = new URL('../src/content/blog/', import.meta.url);
const path = new URL(`${slug}.md`, directory);
const template = await readFile(new URL('../templates/post.md', import.meta.url), 'utf8');
const title = titleParts.join(' ') || slug.replaceAll('-', ' ');
const content = template
  .replace('"Your first post"', JSON.stringify(title))
  .replace('2000-01-01', new Date().toISOString().slice(0, 10));

await mkdir(directory, { recursive: true });
try {
  await writeFile(path, content, { flag: 'wx' });
} catch (error) {
  if (error.code === 'EEXIST') {
    console.error(`src/content/blog/${slug}.md already exists; it was not changed.`);
    process.exit(1);
  }
  throw error;
}
console.log(`Created src/content/blog/${slug}.md (draft).`);
console.log(`Preview with npm run dev, then open /blog/${slug}/.`);

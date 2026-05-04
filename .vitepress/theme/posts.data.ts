import { createContentLoader } from 'vitepress';

const stripTags = (value = '') => value.replace(/<[^>]*>/g, '').trim();
const getFallbackTitle = (url: string) => {
    const slug = url.split('/').filter(Boolean).pop() ?? 'post';
    return slug.replace(/[-_]/g, ' ');
};

export default createContentLoader('posts/**/*.md', {
    excerpt: true,
    transform(raw) {
        return raw
            .map(({ url, frontmatter, excerpt }) => ({
                title: frontmatter.title ?? getFallbackTitle(url),
                url,
                thumb: frontmatter.thumb,
                date: frontmatter.date,
                description: frontmatter.description ?? stripTags(excerpt),
            }))
            .sort((a, b) => {
                const aTime = a.date ? new Date(a.date).getTime() : 0;
                const bTime = b.date ? new Date(b.date).getTime() : 0;
                return bTime - aTime;
            });
    },
});

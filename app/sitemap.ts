import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { locales, Locale } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `https://blog.onetapalert.com/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    const posts = getAllPosts(locale as Locale);
    for (const post of posts) {
      const postDate = new Date(post.date);
      entries.push({
        url: `https://blog.onetapalert.com/${locale}/blog/${post.slug}`,
        lastModified: isNaN(postDate.getTime()) ? new Date() : postDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}

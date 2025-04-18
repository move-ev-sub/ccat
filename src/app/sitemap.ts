import type { MetadataRoute } from 'next';

const baseUrl = 'https://your-domain.com'; // replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/auth/login`, lastModified: new Date() },
    { url: `${baseUrl}/auth/register`, lastModified: new Date() },
  ];
}

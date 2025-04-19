import type { MetadataRoute } from 'next';

const baseUrl = 'https://app.consultingcontact.de';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/auth/login`, lastModified: new Date() },
    { url: `${baseUrl}/auth/register`, lastModified: new Date() },
  ];
}

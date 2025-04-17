import { getAllEvents } from '@/server/services/event';
import { Event } from '@prisma/client';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllEvents();

  if (!events.ok) {
    return [
      {
        url: 'https://consulting-contact.de',
        lastModified: new Date().toISOString(),
      },
    ];
  }

  return [
    {
      url: 'https://consulting-contact.de',
      lastModified: new Date().toISOString(),
    },
    ...events.data.map((event: Event) => ({
      url: `https://consulting-contact.de/event/${event.id}`,
      lastModified: new Date().toISOString(),
    })),
  ];
}

import { getAllEvents } from '@/server/services/event';
import { Event } from '@prisma/client';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllEvents();

  if (!events.ok) {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        lastModified: new Date().toISOString(),
      },
    ];
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date().toISOString(),
    },
    ...events.data.map((event: Event) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${event.id}`,
      lastModified: new Date().toISOString(),
    })),
  ];
}

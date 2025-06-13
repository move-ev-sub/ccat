import prisma from '@/lib/api/prisma';
import { withAuth } from '@/lib/helpers/withAuth';
import { ApplicationPreview } from '../types';

export const getOwnApplications = withAuth<[], ApplicationPreview[]>(
  async ({ session }) => {
    const applications: ApplicationPreview[] =
      await prisma.application.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
          event: {
            select: {
              name: true,
            },
          },
        },
      });

    return {
      ok: true,
      data: applications,
    };
  },
  {
    permissions: {
      application: ['fetchOwn'],
    },
  }
);

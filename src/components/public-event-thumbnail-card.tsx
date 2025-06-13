import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Event, Phase } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import {
  ArrowUpRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import Link from 'next/link';

interface PublicEventThumbnailCardProps
  extends React.ComponentProps<typeof Card> {
  event: Event & {
    phases: Phase[];
  };
}

export function PublicEventThumbnailCard({
  event,
  ...props
}: PublicEventThumbnailCardProps) {
  const { name, description, id, phases } = event;
  const applicationPhase = phases.find((phase) => phase.type === 'APPLICATION');

  const isApplicationPhaseActive =
    applicationPhase?.startDate &&
    applicationPhase.startDate < new Date() &&
    applicationPhase.endDate &&
    applicationPhase.endDate > new Date();

  return (
    <Card {...props}>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        {description && (
          <p className="text-secondary mt-1 line-clamp-2 max-w-prose text-sm">
            {description}
          </p>
        )}
        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <p className="text-secondary mt-1 text-sm">Bewerbungstart</p>
            <p className="text-foreground mt-1 text-sm font-medium">
              {applicationPhase?.startDate &&
                format(applicationPhase.startDate, 'dd.MM.yyyy')}
            </p>
          </div>
          <div>
            <p className="text-secondary mt-1 text-sm">Bewerbungende</p>
            <p className="text-foreground mt-1 text-sm font-medium">
              {applicationPhase?.endDate &&
                format(applicationPhase.endDate, 'dd.MM.yyyy')}
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Button
            variant="outline"
            className="[&_svg]:text-secondary/70 w-full"
            asChild
          >
            <Link href={`/user/${id}`}>
              Mehr Informationen
              <InformationCircleIcon />
            </Link>
          </Button>
          <Button asChild disabled={!isApplicationPhaseActive}>
            <Link
              href={`/user/${id}`}
              aria-disabled={!isApplicationPhaseActive}
              tabIndex={!isApplicationPhaseActive ? -1 : undefined}
              className={cn(
                !isApplicationPhaseActive && 'pointer-events-none opacity-70'
              )}
            >
              Jetzt bewerben <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { cn } from '@/utils';
import Image from 'next/image';
import { SidebarHeader } from '../ui/sidebar';

export function DefaultSidebarHeader({
  className,
  ...props
}: React.ComponentProps<typeof SidebarHeader>) {
  return (
    <SidebarHeader
      className={cn('border-border border-b', className)}
      {...props}
    >
      <div className="px-(--sidebar-item-padding)">
        <Image
          src={'/move-logo.svg'}
          alt="move-logo"
          width={496}
          height={116}
          className="h-fit w-full"
        />
      </div>
    </SidebarHeader>
  );
}

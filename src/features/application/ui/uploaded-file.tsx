import { cn, formatBytes } from '@/utils';
import React from 'react';

/**
 * Renders a card that displays the name and size of a file. This can be used
 * to display a file uploaded by the user in the application process. When the
 * user has to review their application, this component can be used to display
 * an uploaded file.
 *
 * @example
 * ```tsx
 * <UploadedFileCard file={file} />
 * ```
 *
 * @param props - The props of the component.
 * @param props.file - The file to display.
 *
 * @returns The component.
 */
export function UploadedFileCard({
  className,
  file,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * The file to display information about.
   */
  file: File;
}) {
  return (
    <div
      role="group"
      aria-labelledby={`file-name-${file.name}`}
      aria-describedby={`file-size-${file.name}`}
      data-slot="uploaded-file-card"
      className={cn(
        'border-border relative flex items-center gap-2.5 rounded-lg border px-4 py-3',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 gap-2.5">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p
              id={`file-name-${file.name}`}
              className="text-foreground/80 line-clamp-1 text-sm font-medium"
            >
              {file.name}
            </p>
            <p
              id={`file-size-${file.name}`}
              className="text-muted-foreground text-xs"
            >
              {formatBytes(file.size)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

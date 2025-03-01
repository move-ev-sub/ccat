/**
 * Credits: This component was created by sadmann7 on GitHub.
 *
 * @see https://github.com/sadmann7/file-uploader/tree/main
 */

'use client';

import * as React from 'react';
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useControllableState } from '@/hooks/use-controllable-state';
import { cn, formatBytes } from '@/utils';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface FileUploadProps extends React.ComponentProps<'div'> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type (files: File[]) => void
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps['accept'];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps['maxSize'];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFileCount={4}
   */
  maxFileCount?: DropzoneProps['maxFiles'];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

export function FileUploader({
  value: valueProp,
  onValueChange,
  onUpload,
  progresses,
  accept = {
    'image/*': [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFileCount = 1,
  multiple = false,
  disabled = false,
  className,
  ...dropzoneProps
}: FileUploadProps) {
  //   const {
  //     value: valueProp,
  //     onValueChange,
  //     onUpload,
  //     progresses,
  //     accept = {
  //       'image/*': [],
  //     },
  //     maxSize = 1024 * 1024 * 2,
  //     maxFileCount = 1,
  //     multiple = false,
  //     disabled = false,
  //     className,
  //     ...dropzoneProps
  //   } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error('Es kann nur eine Datei hochgeladen werden.');
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(
          `Es können nicht mehr als ${maxFileCount} Dateien hochgeladen werden.`
        );
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(
            `Die Datei "${file.name}" kann nicht hochgeladen werden. Eventuell wird die Datei nicht unterstützt oder sie ist zu groß.`
          );
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFileCount
      ) {
        const target =
          updatedFiles.length > 0 ? `${updatedFiles.length} Dateien` : `Datei`;

        toast.promise(onUpload(updatedFiles), {
          loading: `Lädt ${target} hoch...`,
          success: () => {
            setFiles([]);
            return `${target} hochgeladen.`;
          },
          error: `${target} konnte nicht hochgeladen werden.`,
        });
      }
    },

    [files, maxFileCount, multiple, onUpload, setFiles]
  );

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.click();
    }
  };

  return (
    <div className="relative flex flex-col gap-6">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFileCount}
        multiple={maxFileCount > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            role="button"
            className={cn(
              'group border-border-secondary relative grid h-52 w-full cursor-pointer place-items-center rounded-xl border border-dashed px-5 py-2.5 text-center transition',
              'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              isDragActive && 'border-accent bg-accent-50 dark:bg-accent-950',
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            onKeyDown={handleKeyDown}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <ArrowUpTrayIcon
                  className="text-accent size-6"
                  aria-hidden="true"
                />
                <p className="text-foreground text-sm font-medium">
                  Dateien hier ablegen
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <ArrowUpTrayIcon
                  className="text-secondary size-6"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-px">
                  <p className="text-foreground text-sm font-medium">
                    Datei{maxFileCount > 1 ? 'en' : ''} per{' '}
                    <span className="font-semibold">Klick</span> oder{' '}
                    <span className="font-semibold">Drag & Drop</span> hochladen
                  </p>
                  <p className="text-secondary mt-1 text-xs">
                    Du kannst
                    {maxFileCount > 1
                      ? ` ${maxFileCount === Infinity ? 'multiple' : maxFileCount}
                      Dateien (bis zu jeweils ${formatBytes(maxSize)})`
                      : ` eine Datei mit bis zu ${formatBytes(maxSize)}`}{' '}
                    hochladen
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length && files.length > 0 ? (
        <div className="flex flex-col gap-4">
          {files.map((file, index) => (
            <FileCard
              key={index}
              file={file}
              onRemove={() => onRemove(index)}
              progress={progresses?.[file.name]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="border-border relative flex items-center gap-2.5 rounded-lg border px-4 py-3">
      <div className="flex flex-1 gap-2.5">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="text-foreground/80 line-clamp-1 text-sm font-medium">
              {file.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {formatBytes(file.size)}
            </p>
          </div>
          {/* {progress ? <Progress value={progress} /> : null} */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="size-6"
        >
          <XMarkIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof file.preview === 'string';
}

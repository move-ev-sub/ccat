/**
 * Credits: This original component was created by sadmann7 on GitHub. This
 * is a modified version by chris23lngr which improves keyboard navigation and
 * accessibility and integrates it with the `react-hook-form` library.
 *
 * @author sadmann7, chris23lngr
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

/**
 * The FileUpload Component is a file uploader that allows users to upload files
 * by clicking on the dropzone or dragging and dropping files into the dropzone.
 * It supports multiple file uploads, (file previews,) file validation, and file
 * upload progress.
 *
 * The component is built on top of the `react-dropzone` library and uses the
 * `sonner` library for toast notifications. The component is fully accessible
 * and supports keyboard navigation. it is designed to be used in forms with
 * react-hook-form.
 *
 * @example
 * ```tsx
 * <FormField
 *  control={form.control}
 *  name="logo"
 *  render={({ field }) => (
 *    <div className="space-y-6">
 *      <FormItem className="w-full">
 *        <FormLabel>Logo</FormLabel>
 *        <FormControl>
 *          <FileUpload
 *            value={field.value}
 *            onValueChange={field.onChange}
 *            maxFileCount={4}
 *            maxSize={4 * 1024 * 1024}
 *          />
 *        </FormControl>
 *        <FormMessage />
 *      </FormItem>
 *    </div>
 *  )}
 * />
 * ```
 *
 * @param param0
 * @returns
 */
export function FileUpload({
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
  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  /**
   * When a user drops files into the dropzone, this function is called by the
   * dropzone component. It checks if the number of files is within the limits
   * and then sets the files state with the new files.
   *
   * If the `onUpload` function is provided, it will be called with the new
   * files. This means that the files will be uploaded to the server immediately
   * and not when the form is submitted.
   *
   * @param {File[]} acceptedFiles - The files that were accepted by the dropzone.
   * @param {FileRejection[]} rejectedFiles - The files that were rejected by the dropzone.
   */
  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // If only one file is allowed and the user tries to upload more than one
      // file, show an error message and return early
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error('Es kann nur eine Datei hochgeladen werden.');
        return;
      }

      // If the number of files exceeds the maximum file count, show an error
      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(
          `Es können nicht mehr als ${maxFileCount} Dateien hochgeladen werden.`
        );
        return;
      }

      // Create a preview url for each file. This is an optional step since
      // we're not using previews at the moment but it can be useful in the future.
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // Update the files state with the new files
      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      // Update the value
      setFiles(updatedFiles);

      // Show an error message for each rejected file
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(
            `Die Datei "${file.name}" kann nicht hochgeladen werden. Eventuell wird die Datei nicht unterstützt oder sie ist zu groß.`
          );
        });
      }

      // If the onUpload function is provided and the number of files is within
      // the limits, call the onUpload function with the new files. This will
      // upload the files to the server immediately
      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFileCount
      ) {
        // Helper text for the toast message
        const target =
          updatedFiles.length > 0 ? `${updatedFiles.length} Dateien` : `Datei`;

        // After the files are uploaded, show a toast message with the upload
        // result
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

  /**
   * Removes a file from the list of files. This is called when the user clicks
   * the remove button on a file card.
   *
   * @param {number} index - The index of the file to remove. Automatically
   *    provided by the `map` function.
   */
  function onRemove(index: number) {
    // If there are no files, return early
    if (!files) return;

    // Remove the file at the specified index
    const newFiles = files.filter((_, i) => i !== index);

    // Update the files state
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

  /**
   * Handles the keydown event for the dropzone. When the file upload component
   * is focused and the user presses the Enter or Space key, the file picker
   * should be opened.
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Only open the file picker when the Enter or Space key is pressed
    if (e.key === 'Enter' || e.key === ' ') {
      // Prevent the default actions
      e.preventDefault();
      e.stopPropagation();

      // Open the file picker
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
              // base styles
              'group border-border-secondary relative grid h-52 w-full cursor-pointer place-items-center rounded-xl border border-dashed px-5 py-2.5 text-center transition',
              // focus styles
              'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              // styles for when a file is being dragged anywhere on the page
              isDragActive && 'border-accent bg-accent-50 dark:bg-accent-950',
              // disabled styles
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            // handle keyboard navigation
            onKeyDown={handleKeyDown}
            {...dropzoneProps}
          >
            {/* This is the actual input component, which handles the files */}
            <input {...getInputProps()} />
            {isDragActive ? (
              // When a file is being dragged, show this message
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
              // When no file is being dragged, show this message
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <ArrowUpTrayIcon
                  className="text-secondary size-6"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-px">
                  <p className="text-foreground text-sm font-medium">
                    {/* Depending on wether multiple files are beeing accepted,
                     * change the info messages */}
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
      {/* Display a list with all uploaded files */}
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
  /**
   * The file to display in the card.
   *
   * @type File
   * @required
   */
  file: File;

  /**
   * Callback function to be called when the remove button is clicked.
   *
   * @returns void
   */
  onRemove: () => void;

  /**
   * The progress of the file upload.
   *
   * @type number | undefined
   */
  progress?: number;
}

/**
 * A FileCard is a card that displays information about a file that has been
 * uploaded. It shows the file name, size, and an optional progress bar.
 */
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

// Check if the file has a preview url
function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof file.preview === 'string';
}

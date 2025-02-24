import { Checkbox } from '@/components/ui/checkbox/checkbox';

export default function CheckboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox />
      <p className="text-muted-foreground">
        Try changing the colors in `colors.css`.
      </p>
    </div>
  );
}

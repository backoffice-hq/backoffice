import { cn } from "@backoffice/ui/lib/utils";

export default function AppIcon({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center text-muted-foreground text-xl font-medium",
        className
      )}
    >
      {name.charAt(0)}
    </div>
  );
}

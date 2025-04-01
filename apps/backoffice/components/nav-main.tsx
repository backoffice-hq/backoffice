"use client";

import { cn } from "@backoffice/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface NavMainProps {
  title: string;
  items: Item[];
}

export function NavMain({ title, items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-64 border-r transition-all duration-300 ease-in-out h-screen flex flex-col"
      )}
    >
      <div className="flex flex-col p-4 space-y-0.5">
        <h1 className="text-sm text-muted-foreground font-medium mb-4 px-2">{title}</h1>
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link 
              href={item.url} 
              key={item.title}
              className={cn(
                "flex w-full p-2 rounded-md transition-colors gap-2",
                isActive 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

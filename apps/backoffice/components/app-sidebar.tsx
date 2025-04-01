import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <div className="flex flex-col justify-between items-center w-14 border-r py-2">
      <div>
        <Link href="/">
          <Image
            src="/images/backoffice.svg"
            alt="logo"
            width={32}
            height={32}
          />
        </Link>
        <div>{/* Apps */}</div>
      </div>
      <div className="mb-2">
        <Link href="/settings/account">
          <SettingsIcon className="w-5 h-5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}

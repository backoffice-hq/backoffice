import { NavMain } from "@/components/nav-main";
import {
  Building2,
  Users,
  FileText,
  Blocks,
  User,
  Settings2,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Back Office",
  description: "Settings for your account",
};

const items = [
  {
    title: "Account",
    url: "/settings/account",
    icon: <User className="w-4 h-4" />,
  },
  {
    title: "Company",
    url: "/settings/company",
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    title: "Users",
    url: "/settings/users",
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: "Documents",
    url: "/settings/documents",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    title: "Applications",
    url: "/settings/applications",
    icon: <Blocks className="w-4 h-4" />,
  },
  {
    title: "Preferences",
    url: "/settings/preferences",
    icon: <Settings2 className="w-4 h-4" />,
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <NavMain title="Settings" items={items} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

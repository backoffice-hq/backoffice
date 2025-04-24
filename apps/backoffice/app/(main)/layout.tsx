import { AppSidebar } from "@/components/app-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Apps Sidebar */}
      <AppSidebar />
      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

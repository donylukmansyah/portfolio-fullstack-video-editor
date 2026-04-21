import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminPage();

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar adminEmail={session.user.email} />
      <SidebarInset className="bg-[linear-gradient(180deg,#fff9f7_0%,#fde7e2_100%)]">
        <div className="border-b-2 border-border bg-secondary-background px-4 py-3 shadow-shadow sm:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9" />
            <div>
              <p className="font-heading text-base text-foreground">Admin Panel</p>
              <p className="text-xs text-foreground/65">Dashboard and portfolio management</p>
            </div>
          </div>
        </div>
        <main className="flex flex-1 flex-col p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

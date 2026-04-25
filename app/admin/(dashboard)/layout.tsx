import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/app-sidebar";
import { AdminBreadcrumb } from "@/features/admin/components/admin-breadcrumb";
import { requireAdminPage } from "@/lib/admin";
import prisma from "@/lib/prisma";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, unreadMessages] = await Promise.all([
    requireAdminPage(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar
        adminEmail={session.user.email}
        unreadMessages={unreadMessages}
      />
      <SidebarInset className="bg-background">
        {/* ─── Topbar with trigger + breadcrumbs ─── */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b-2 border-border bg-secondary-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 size-8" />
            <div className="mx-1 h-5 w-0.5 bg-border" />
            <AdminBreadcrumb />
          </div>
        </header>

        {/* ─── Page content ─── */}
        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

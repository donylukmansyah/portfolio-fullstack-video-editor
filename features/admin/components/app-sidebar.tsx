"use client";

import { FolderKanban, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Portfolio", url: "/admin/portfolios", icon: FolderKanban },
];

type AppSidebarProps = {
  adminEmail?: string | null;
};

export function AppSidebar({ adminEmail }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="gap-3 p-3">
        <div className="rounded-base border-2 border-border bg-main px-3 py-3 text-main-foreground shadow-shadow">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-heading text-sm">Portfolio Admin</p>
              <p className="truncate text-xs text-main-foreground/80">Neobrutalism CMS</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.url)
                    }
                    size="lg"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-3 shadow-shadow">
          <p className="text-[11px] font-heading uppercase tracking-wide text-foreground/60">
            Signed In
          </p>
          <p className="mt-1 truncate font-heading text-sm text-foreground">Admin</p>
          <p className="truncate text-xs text-foreground/70">{adminEmail ?? "No email"}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

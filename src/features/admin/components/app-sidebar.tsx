"use client";

import {
  ChevronsUpDown,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  SquareTerminal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    description: "Overview",
  },
  {
    title: "Portfolio",
    url: "/admin/portfolios",
    icon: FolderKanban,
    description: "CRUD content",
  },
  {
    title: "Messages",
    url: "/admin/messages",
    icon: Inbox,
    description: "Inbox",
  },
];

type AppSidebarProps = {
  adminEmail?: string | null;
  unreadMessages?: number;
};

export function AppSidebar({ adminEmail, unreadMessages = 0 }: AppSidebarProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const isActive = (url: string) =>
    url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

  const initials = adminEmail
    ? adminEmail
        .split("@")[0]
        .split(".")
        .map((s) => s[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2)
    : "AD";

  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* ─── Brand header ─── */}
      <SidebarHeader className="gap-3 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default data-[state=open]:bg-main data-[state=open]:text-main-foreground data-[state=open]:outline-border hover:bg-main hover:text-main-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)]">
                <SquareTerminal className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-heading">Portfolio Admin</span>
                <span className="truncate text-xs">
                  Admin CMS
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ─── Navigation ─── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    size="lg"
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="grid group-data-[collapsible=icon]:hidden">
                        <span>{item.title}</span>
                        <span className="text-[11px] font-base text-current/65 group-data-[collapsible=icon]:hidden">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Messages" && unreadMessages > 0 && (
                    <SidebarMenuBadge className="bg-main text-main-foreground border-2 border-border rounded-base px-1.5 text-[10px] font-heading">
                      {unreadMessages}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ─── Quick links ─── */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Shortcut
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="default">
                  <Link href="/" target="_blank">
                    <ExternalLink />
                    <span>View Public Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ─── Footer with user dropdown ─── */}
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group-data-[state=collapsed]:hover:outline-0 group-data-[state=collapsed]:hover:bg-transparent overflow-visible"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
                    {initials}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-heading">Admin</span>
                    <span className="truncate text-xs text-foreground/60">
                      {adminEmail ?? "No email"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-base">
                  <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground text-xs font-heading">
                      {initials}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-heading">Admin</span>
                      <span className="truncate text-xs">{adminEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" target="_blank">
                    <ExternalLink />
                    <span>View Public Site</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/sign-out">
                    <LogOut />
                    <span>Sign Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

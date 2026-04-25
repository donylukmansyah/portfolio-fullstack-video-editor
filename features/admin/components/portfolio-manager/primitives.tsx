import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ─── Re-export Table primitives for convenience ─────────────────
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
};

// ─── Empty table body ───────────────────────────────────────────
export function EmptyTableRow({
  colSpan,
  description,
  title,
}: {
  colSpan: number;
  description: string;
  title: string;
}) {
  return (
    <TableRow className="bg-background hover:bg-background">
      <TableCell colSpan={colSpan} className="px-6 py-14 text-center">
        <div className="mx-auto max-w-xs">
          <p className="font-heading text-base text-foreground">{title}</p>
          <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{description}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

// ─── Section count badge ────────────────────────────────────────
export function SectionCountBadge({ count }: { count: number }) {
  return (
    <div className="inline-flex items-center rounded-base border-2 border-border bg-secondary-background px-3 py-1.5 text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
      {count} total
    </div>
  );
}

// ─── Stat strip for page headers ────────────────────────────────
export function AdminStatStrip({
  stats,
}: {
  stats: {
    label: string;
    value: number;
  }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-base border-2 border-border bg-secondary-background px-4 py-2.5 shadow-[2px_2px_0px_0px_var(--border)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          <p className="text-[10px] font-heading uppercase tracking-[0.15em] text-foreground/50">
            {stat.label}
          </p>
          <p className="mt-0.5 text-xl font-heading text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page header component ──────────────────────────────────────
export function PageHeader({
  title,
  description,
  subtitle,
  children,
}: {
  title: string;
  description: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div className="space-y-2">
        {subtitle && (
          <p className="text-[11px] font-heading uppercase tracking-[0.2em] text-foreground/45">
            {subtitle}
          </p>
        )}
        <h1 className="text-2xl font-heading text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/65">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

// ─── Manager section (card wrapper for tables) ──────────────────
export function ManagerSection({
  action,
  children,
  count,
  description,
  icon: Icon,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  count: number;
  description: string;
  icon?: LucideIcon;
  title: string;
}) {
  return (
    <section className="neo-panel overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between gap-4 border-b-2 border-border bg-secondary-background px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
              <Icon className="size-4" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="truncate text-lg font-heading text-foreground">
                {title}
              </h2>
              <SectionCountBadge count={count} />
            </div>
            <p className="mt-0.5 truncate text-xs text-foreground/55">{description}</p>
          </div>
        </div>
        {action}
      </div>

      {/* Section content */}
      <div>{children}</div>
    </section>
  );
}

// ─── Reusable Table Pagination ──────────────────────────────────
export function AdminTablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  visiblePages,
  canGoPrevious,
  canGoNext,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  visiblePages: (number | "ellipsis")[];
  canGoPrevious: boolean;
  canGoNext: boolean;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t-2 border-border bg-secondary-background px-5 py-3 sm:flex-row sm:px-6">
      <p className="text-xs font-base text-foreground/50">
        Showing{" "}
        <span className="font-heading text-foreground">{start}</span>
        {" – "}
        <span className="font-heading text-foreground">{end}</span>
        {" of "}
        <span className="font-heading text-foreground">{totalItems}</span>
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (canGoPrevious) onPageChange(currentPage - 1);
              }}
              className={!canGoPrevious ? "pointer-events-none opacity-40" : "cursor-pointer"}
              aria-disabled={!canGoPrevious}
            />
          </PaginationItem>
          {visiblePages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (canGoNext) onPageChange(currentPage + 1);
              }}
              className={!canGoNext ? "pointer-events-none opacity-40" : "cursor-pointer"}
              aria-disabled={!canGoNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

"use client";

import { FolderKanban, ImageIcon, Link2, Video } from "lucide-react";

import type { PortfolioRow, SubCategoryOption } from "@/features/admin/types";
import {
  PortfolioCreateDialog,
  PortfolioEditDialog,
} from "@/features/admin/components/dialogs/portfolio-item-dialogs";
import {
  AdminTablePagination,
  EmptyTableRow,
  ManagerSection,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/admin/components/portfolio-manager/primitives";
import { usePagination } from "@/features/admin/hooks/use-pagination";

export function PortfolioItemsSection({
  rows,
  subCategories,
}: {
  rows: PortfolioRow[];
  subCategories: SubCategoryOption[];
}) {
  const pagination = usePagination(rows);

  return (
    <ManagerSection
      title="Portfolio Cards"
      description="Create and edit the cards shown on the public home page and detail modal."
      count={rows.length}
      icon={FolderKanban}
      action={<PortfolioCreateDialog subCategories={subCategories} />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sub Category</TableHead>
            <TableHead>Media</TableHead>
            <TableHead>External Link</TableHead>
            <TableHead>Thumbnail Label</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.paginatedItems.length ? (
            pagination.paginatedItems.map((item) => (
              <TableRow
                key={item.id}
                className="bg-background text-foreground hover:bg-secondary-background/60"
              >
                <TableCell>
                  <p className="font-heading text-foreground min-w-[140px]">
                    {item.title}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="text-foreground/70 whitespace-nowrap">
                    {item.mainCategoryName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-foreground/70 whitespace-nowrap">
                    {item.subCategoryName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-base border-2 border-border bg-secondary-background px-2.5 py-0.5 text-xs font-heading">
                    {item.mediaType === "video" ? (
                      <Video className="size-3" />
                    ) : (
                      <ImageIcon className="size-3" />
                    )}
                    {item.mediaType}
                  </span>
                </TableCell>
                <TableCell>
                  {item.externalLinkUrl ? (
                    <span className="inline-flex max-w-[160px] items-center gap-1.5 rounded-base border-2 border-border bg-secondary-background px-2.5 py-0.5 text-xs font-heading">
                      <Link2 className="size-3 shrink-0" />
                      <span className="truncate">
                        {item.externalLinkName ?? "External Link"}
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-foreground/40">None</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1 max-w-[200px] text-wrap text-sm text-foreground/70">
                    {item.thumbnailLabel}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="whitespace-nowrap text-foreground/60 text-xs">
                    {item.updatedAt}
                  </span>
                </TableCell>
                <TableCell>
                  <PortfolioEditDialog
                    item={item}
                    subCategories={subCategories}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <EmptyTableRow
              colSpan={8}
              title="No portfolio cards yet"
              description="Once your categories are ready, add your first card here and it will appear on the public portfolio."
            />
          )}
        </TableBody>
      </Table>
      <AdminTablePagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        pageSize={pagination.pageSize}
        onPageChange={pagination.goToPage}
        visiblePages={pagination.visiblePages}
        canGoPrevious={pagination.canGoPrevious}
        canGoNext={pagination.canGoNext}
      />
    </ManagerSection>
  );
}

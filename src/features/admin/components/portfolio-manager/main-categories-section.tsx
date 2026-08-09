"use client";

import { Layers } from "lucide-react";

import type { MainCategoryRow } from "@/features/admin/types";
import {
  MainCategoryCreateDialog,
  MainCategoryEditDialog,
} from "@/features/admin/components/dialogs/main-category-dialogs";
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

export function MainCategoriesSection({
  rows,
}: {
  rows: MainCategoryRow[];
}) {
  const pagination = usePagination(rows);

  return (
    <ManagerSection
      title="Main Categories"
      description="Top-level filter groups shown on the portfolio page."
      count={rows.length}
      icon={Layers}
      action={<MainCategoryCreateDialog />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Sub Categories</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.paginatedItems.length ? (
            pagination.paginatedItems.map((category) => (
              <TableRow
                key={category.id}
                className="bg-background text-foreground hover:bg-secondary-background/60"
              >
                <TableCell>
                  <p className="font-heading text-foreground">
                    {category.name}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-base border-2 border-border bg-secondary-background px-2.5 py-0.5 text-xs font-heading">
                    {category.slug}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums">{category.subCount}</span>
                </TableCell>
                <TableCell>
                  <MainCategoryEditDialog category={category} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <EmptyTableRow
              colSpan={4}
              title="No main categories yet"
              description="Create your first main category so the public portfolio can start grouping filters."
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

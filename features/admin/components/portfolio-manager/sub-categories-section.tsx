"use client";

import { LayoutGrid } from "lucide-react";

import type { MainCategoryOption, SubCategoryRow } from "@/features/admin/types";
import {
  SubCategoryCreateDialog,
  SubCategoryEditDialog,
} from "@/features/admin/components/dialogs/sub-category-dialogs";
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

export function SubCategoriesSection({
  mainCategories,
  rows,
}: {
  mainCategories: MainCategoryOption[];
  rows: SubCategoryRow[];
}) {
  const pagination = usePagination(rows);

  return (
    <ManagerSection
      title="Sub Categories"
      description="Child filters grouped under each main category."
      count={rows.length}
      icon={LayoutGrid}
      action={<SubCategoryCreateDialog mainCategories={mainCategories} />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Cards</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.paginatedItems.length ? (
            pagination.paginatedItems.map((subCategory) => (
              <TableRow
                key={subCategory.id}
                className="bg-background text-foreground hover:bg-secondary-background/60"
              >
                <TableCell>
                  <p className="font-heading text-foreground">
                    {subCategory.name}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="text-foreground/70">
                    {subCategory.mainCategoryName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-base border-2 border-border bg-secondary-background px-2.5 py-0.5 text-xs font-heading">
                    {subCategory.slug}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums">
                    {subCategory.portfolioCount}
                  </span>
                </TableCell>
                <TableCell>
                  <SubCategoryEditDialog
                    subCategory={subCategory}
                    mainCategories={mainCategories}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <EmptyTableRow
              colSpan={5}
              title="No sub categories yet"
              description="Add a main category first, then create sub categories for the filter tabs on the public page."
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

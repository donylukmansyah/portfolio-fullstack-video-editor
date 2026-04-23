import { ScrollArea } from "@/components/ui/scroll-area";
import type { MainCategoryRow } from "@/features/admin/types";
import {
  MainCategoryCreateDialog,
  MainCategoryEditDialog,
} from "@/features/admin/components/dialogs/main-category-dialogs";
import {
  EmptyTableRow,
  ManagerSection,
  tableCellClassName,
  tableHeaderClassName,
} from "@/features/admin/components/portfolio-manager/primitives";

export function MainCategoriesSection({
  rows,
}: {
  rows: MainCategoryRow[];
}) {
  return (
    <ManagerSection
      title="Main Categories"
      description="Top-level filter groups shown on the portfolio page."
      count={rows.length}
      action={<MainCategoryCreateDialog />}
    >
      <ScrollArea className="w-full whitespace-nowrap rounded-base border-2 border-border bg-white">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className={tableHeaderClassName}>Name</th>
              <th className={tableHeaderClassName}>Slug</th>
              <th className={tableHeaderClassName}>Sub Categories</th>
              <th className={tableHeaderClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((category) => (
                <tr key={category.id}>
                  <td className={tableCellClassName}>
                    <p className="font-heading text-foreground">{category.name}</p>
                  </td>
                  <td className={tableCellClassName}>
                    <span className="rounded-base border border-border px-2 py-1 text-xs">
                      {category.slug}
                    </span>
                  </td>
                  <td className={tableCellClassName}>{category.subCount}</td>
                  <td className={tableCellClassName}>
                    <MainCategoryEditDialog category={category} />
                  </td>
                </tr>
              ))
            ) : (
              <EmptyTableRow
                colSpan={4}
                title="No main categories yet"
                description="Create your first main category so the public portfolio can start grouping filters."
              />
            )}
          </tbody>
        </table>
      </ScrollArea>
    </ManagerSection>
  );
}

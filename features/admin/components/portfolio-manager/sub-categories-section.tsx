import { ScrollArea } from "@/components/ui/scroll-area";
import type { MainCategoryOption, SubCategoryRow } from "@/features/admin/types";
import {
  SubCategoryCreateDialog,
  SubCategoryEditDialog,
} from "@/features/admin/components/dialogs/sub-category-dialogs";
import {
  EmptyTableRow,
  ManagerSection,
  tableCellClassName,
  tableHeaderClassName,
} from "@/features/admin/components/portfolio-manager/primitives";

export function SubCategoriesSection({
  mainCategories,
  rows,
}: {
  mainCategories: MainCategoryOption[];
  rows: SubCategoryRow[];
}) {
  return (
    <ManagerSection
      title="Sub Categories"
      description="Child filters grouped under each main category."
      count={rows.length}
      action={<SubCategoryCreateDialog mainCategories={mainCategories} />}
    >
      <ScrollArea className="w-full whitespace-nowrap rounded-base border-2 border-border bg-white">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className={tableHeaderClassName}>Name</th>
              <th className={tableHeaderClassName}>Parent Category</th>
              <th className={tableHeaderClassName}>Slug</th>
              <th className={tableHeaderClassName}>Cards</th>
              <th className={tableHeaderClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td className={tableCellClassName}>
                    <p className="font-heading text-foreground">{subCategory.name}</p>
                  </td>
                  <td className={tableCellClassName}>{subCategory.mainCategoryName}</td>
                  <td className={tableCellClassName}>
                    <span className="rounded-base border border-border px-2 py-1 text-xs">
                      {subCategory.slug}
                    </span>
                  </td>
                  <td className={tableCellClassName}>{subCategory.portfolioCount}</td>
                  <td className={tableCellClassName}>
                    <SubCategoryEditDialog
                      subCategory={subCategory}
                      mainCategories={mainCategories}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <EmptyTableRow
                colSpan={5}
                title="No sub categories yet"
                description="Add a main category first, then create sub categories for the filter tabs on the public page."
              />
            )}
          </tbody>
        </table>
      </ScrollArea>
    </ManagerSection>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import type { PortfolioRow, SubCategoryOption } from "@/features/admin/types";
import {
  PortfolioCreateDialog,
  PortfolioEditDialog,
} from "@/features/admin/components/dialogs/portfolio-item-dialogs";
import {
  EmptyTableRow,
  ManagerSection,
  tableCellClassName,
  tableHeaderClassName,
} from "@/features/admin/components/portfolio-manager/primitives";

export function PortfolioItemsSection({
  rows,
  subCategories,
}: {
  rows: PortfolioRow[];
  subCategories: SubCategoryOption[];
}) {
  return (
    <ManagerSection
      title="Portfolio Cards"
      description="Create and edit the cards shown on the public home page and detail modal."
      count={rows.length}
      action={<PortfolioCreateDialog subCategories={subCategories} />}
    >
      <ScrollArea className="w-full whitespace-nowrap rounded-base border-2 border-border bg-white">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className={tableHeaderClassName}>Title</th>
              <th className={tableHeaderClassName}>Category</th>
              <th className={tableHeaderClassName}>Sub Category</th>
              <th className={tableHeaderClassName}>Media</th>
              <th className={tableHeaderClassName}>Thumbnail Label</th>
              <th className={tableHeaderClassName}>Updated</th>
              <th className={tableHeaderClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((item) => (
                <tr key={item.id}>
                  <td className={tableCellClassName}>
                    <p className="font-heading text-foreground">{item.title}</p>
                  </td>
                  <td className={tableCellClassName}>{item.mainCategoryName}</td>
                  <td className={tableCellClassName}>{item.subCategoryName}</td>
                  <td className={tableCellClassName}>
                    <span className="rounded-base border border-border px-2 py-1 text-xs">
                      {item.mediaType}
                    </span>
                  </td>
                  <td className={tableCellClassName}>
                    <span className="line-clamp-1 max-w-[220px] text-wrap text-sm">
                      {item.thumbnailLabel}
                    </span>
                  </td>
                  <td className={tableCellClassName}>{item.updatedAt}</td>
                  <td className={tableCellClassName}>
                    <PortfolioEditDialog item={item} subCategories={subCategories} />
                  </td>
                </tr>
              ))
            ) : (
              <EmptyTableRow
                colSpan={7}
                title="No portfolio cards yet"
                description="Once your categories are ready, add your first card here and it will appear on the public portfolio."
              />
            )}
          </tbody>
        </table>
      </ScrollArea>
    </ManagerSection>
  );
}

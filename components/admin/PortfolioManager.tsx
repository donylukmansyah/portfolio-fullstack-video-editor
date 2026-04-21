import {
  MainCategoryCreateDialog,
  MainCategoryEditDialog,
  PortfolioCreateDialog,
  PortfolioEditDialog,
  SubCategoryCreateDialog,
  SubCategoryEditDialog,
} from "@/components/admin/PortfolioManagerDialogs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAdminSession } from "@/lib/admin";
import { getPortfolioItemsForAdmin } from "@/lib/portfolio";
import prisma from "@/lib/prisma";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

const tableHeaderClassName =
  "border-b-2 border-border bg-secondary-background px-4 py-3 text-left text-xs font-heading uppercase tracking-wide text-foreground/60";
const tableCellClassName = "border-b border-border/60 px-4 py-3 align-top text-sm";

function EmptyTableRow({
  colSpan,
  title,
  description,
}: {
  colSpan: number;
  title: string;
  description: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center">
        <p className="font-heading text-base text-foreground">{title}</p>
        <p className="mt-2 text-sm text-foreground/65">{description}</p>
      </td>
    </tr>
  );
}

export async function PortfolioManager() {
  const [session, mainCategories, subCategories, portfolioItems] = await Promise.all([
    getAdminSession(),
    prisma.mainCategory.findMany({
      include: {
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.subCategory.findMany({
      include: {
        mainCategory: true,
        _count: {
          select: {
            portfolioItems: true,
          },
        },
      },
      orderBy: [
        {
          mainCategory: {
            name: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    }),
    getPortfolioItemsForAdmin(),
  ]);

  const mainCategoryRows = mainCategories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    subCount: category._count.subCategories,
  }));

  const mainCategoryOptions = mainCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  const subCategoryRows = subCategories.map((subCategory) => ({
    id: subCategory.id,
    name: subCategory.name,
    slug: subCategory.slug,
    mainCategoryId: subCategory.mainCategoryId,
    mainCategoryName: subCategory.mainCategory.name,
    portfolioCount: subCategory._count.portfolioItems,
  }));

  const subCategoryOptions = subCategories.map((subCategory) => ({
    id: subCategory.id,
    name: subCategory.name,
    mainCategoryName: subCategory.mainCategory.name,
  }));

  const portfolioRows = portfolioItems.map((item) => ({
    id: item.id,
    title: item.title,
    thumbnailLabel: item.thumbnailLabel,
    thumbnailUrl: item.thumbnailUrl,
    mediaType: item.mediaType as "video" | "image",
    youtubeUrl: item.youtubeUrl,
    gradient: item.gradient,
    subCategoryId: item.subCategoryId,
    subCategoryName: item.subCategory.name,
    mainCategoryName: item.subCategory.mainCategory.name,
    updatedAt: dateFormatter.format(item.updatedAt),
  }));

  const stats = [
    { label: "Main Categories", value: mainCategories.length },
    { label: "Sub Categories", value: subCategories.length },
    { label: "Portfolio Cards", value: portfolioItems.length },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">Portfolio</p>
          <h1 className="mt-2 text-3xl font-heading text-foreground">Portfolio Manager</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/75">
            Everything for your portfolio lives here: top-level filters, sub-filters, and portfolio cards.
            Public UI stays the same, you only manage the content.
          </p>
          <p className="mt-2 text-xs font-heading text-foreground/60">
            Logged in as {session?.user.email}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-base border-2 border-border bg-secondary-background px-4 py-2 shadow-[2px_2px_0px_0px_var(--border)]"
            >
              <p className="text-[11px] font-heading uppercase tracking-wide text-foreground/60">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-heading text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="neo-panel p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading text-foreground">Main Categories</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Top-level filter groups shown on the portfolio page.
              </p>
            </div>
            <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
              {mainCategories.length} total
            </div>
          </div>

          <div className="mb-5 flex justify-end">
            <MainCategoryCreateDialog />
          </div>

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
                {mainCategoryRows.length ? (
                  mainCategoryRows.map((category) => (
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
        </section>

        <section className="neo-panel p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading text-foreground">Sub Categories</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Child filters grouped under each main category.
              </p>
            </div>
            <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
              {subCategories.length} total
            </div>
          </div>

          <div className="mb-5 flex justify-end">
            <SubCategoryCreateDialog mainCategories={mainCategoryOptions} />
          </div>

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
                {subCategoryRows.length ? (
                  subCategoryRows.map((subCategory) => (
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
                          mainCategories={mainCategoryOptions}
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
        </section>
      </div>

      <section className="neo-panel p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-heading text-foreground">Portfolio Cards</h2>
            <p className="mt-1 text-sm text-foreground/70">
              Create and edit the cards shown on the public home page and detail modal.
            </p>
          </div>
          <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
            {portfolioItems.length} total
          </div>
        </div>

        <div className="mb-5 flex justify-end">
          <PortfolioCreateDialog subCategories={subCategoryOptions} />
        </div>

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
              {portfolioRows.length ? (
                portfolioRows.map((item) => (
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
                      <PortfolioEditDialog item={item} subCategories={subCategoryOptions} />
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
      </section>
    </div>
  );
}

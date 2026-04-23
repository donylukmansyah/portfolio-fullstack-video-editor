import type { ReactNode } from "react";

export const tableHeaderClassName =
  "border-b-2 border-border bg-secondary-background px-4 py-3 text-left text-xs font-heading uppercase tracking-wide text-foreground/60";
export const tableCellClassName = "border-b border-border/60 px-4 py-3 align-top text-sm";

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
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center">
        <p className="font-heading text-base text-foreground">{title}</p>
        <p className="mt-2 text-sm text-foreground/65">{description}</p>
      </td>
    </tr>
  );
}

export function SectionCountBadge({ count }: { count: number }) {
  return (
    <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading shadow-[2px_2px_0px_0px_var(--border)]">
      {count} total
    </div>
  );
}

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
          className="rounded-base border-2 border-border bg-secondary-background px-4 py-2 shadow-[2px_2px_0px_0px_var(--border)]"
        >
          <p className="text-[11px] font-heading uppercase tracking-wide text-foreground/60">
            {stat.label}
          </p>
          <p className="mt-1 text-xl font-heading text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export function ManagerSection({
  action,
  children,
  count,
  description,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  count: number;
  description: string;
  title: string;
}) {
  return (
    <section className="neo-panel p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-foreground/70">{description}</p>
        </div>
        <SectionCountBadge count={count} />
      </div>

      {action ? <div className="mb-5 flex justify-end">{action}</div> : null}
      {children}
    </section>
  );
}

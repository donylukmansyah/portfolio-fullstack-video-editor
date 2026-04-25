"use client";

import { Mail, Trash2 } from "lucide-react";

import {
  deleteContactMessage,
  markContactMessageRead,
  markContactMessageUnread,
} from "@/app/actions/admin/contact-messages";
import { Button } from "@/components/ui/Button";
import type { ContactMessageRow } from "@/features/admin/types";
import {
  AdminTablePagination,
  EmptyTableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/admin/components/portfolio-manager/primitives";
import { usePagination } from "@/features/admin/hooks/use-pagination";

export function ContactMessagesTable({
  rows,
}: {
  rows: ContactMessageRow[];
}) {
  const pagination = usePagination(rows);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.paginatedItems.length === 0 ? (
            <EmptyTableRow
              colSpan={5}
              title="No messages yet"
              description="When someone submits the public contact form, their message will show up here."
            />
          ) : (
            pagination.paginatedItems.map((row) => (
              <TableRow
                key={row.id}
                className={`text-foreground hover:bg-secondary-background/60 ${
                  row.isRead ? "bg-background" : "bg-main/5"
                }`}
              >
                <TableCell>
                  <div className="min-w-[180px]">
                    <p className="font-heading text-foreground">
                      {row.name}
                    </p>
                    <a
                      href={`mailto:${row.email}`}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-foreground/60 underline-offset-4 hover:text-foreground hover:underline"
                    >
                      <Mail className="size-3.5" />
                      <span>{row.email}</span>
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="min-w-[260px] max-w-[400px] whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                    {row.message}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="min-w-[100px]">
                    <span
                      className={`inline-flex items-center rounded-base border-2 border-border px-2.5 py-0.5 text-[10px] font-heading uppercase tracking-wide ${
                        row.isRead
                          ? "bg-secondary-background text-foreground/60"
                          : "bg-main text-main-foreground"
                      }`}
                    >
                      {row.isRead ? "Read" : "Unread"}
                    </span>
                    {row.readAt ? (
                      <p className="mt-1.5 text-[10px] text-foreground/40">
                        Opened {row.readAt}
                      </p>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="min-w-[130px] whitespace-nowrap text-xs text-foreground/60">
                    {row.createdAt}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-[160px] flex-wrap gap-2">
                    <form
                      action={
                        row.isRead
                          ? markContactMessageUnread.bind(null, row.id)
                          : markContactMessageRead.bind(null, row.id)
                      }
                    >
                      <Button type="submit" size="sm" variant="neutral">
                        {row.isRead ? "Mark Unread" : "Mark Read"}
                      </Button>
                    </form>
                    <form action={deleteContactMessage.bind(null, row.id)}>
                      <Button type="submit" size="sm" variant="neutral">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))
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
    </>
  );
}

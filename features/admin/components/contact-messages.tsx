import { Mail, Trash2 } from "lucide-react";

import { deleteContactMessage, markContactMessageRead, markContactMessageUnread } from "@/app/actions/admin/contact-messages";
import { Button } from "@/components/ui/Button";
import { getContactMessagesData } from "@/features/admin/server/queries";
import {
  AdminStatStrip,
  EmptyTableRow,
  ManagerSection,
  tableCellClassName,
  tableHeaderClassName,
} from "@/features/admin/components/portfolio-manager/primitives";

export async function ContactMessagesManager() {
  const { adminEmail, rows, stats, unreadCount } = await getContactMessagesData();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">Messages</p>
          <h1 className="mt-2 text-3xl font-heading text-foreground">Contact Inbox</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/75">
            Every message from the public contact form lands here, so you can review who sent it,
            what they asked, and follow up from the admin panel.
          </p>
          <p className="mt-2 text-xs font-heading text-foreground/60">
            Logged in as {adminEmail}
          </p>
        </div>

        <AdminStatStrip stats={stats} />
      </div>

      <ManagerSection
        count={rows.length}
        title="Inbox"
        description={`${unreadCount} unread message${unreadCount === 1 ? "" : "s"} currently waiting.`}
      >
        <div className="overflow-hidden rounded-base border-2 border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-background">
              <thead>
                <tr>
                  <th className={tableHeaderClassName}>Sender</th>
                  <th className={tableHeaderClassName}>Message</th>
                  <th className={tableHeaderClassName}>Status</th>
                  <th className={tableHeaderClassName}>Received</th>
                  <th className={tableHeaderClassName}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <EmptyTableRow
                    colSpan={5}
                    title="No messages yet"
                    description="When someone submits the public contact form, their message will show up here."
                  />
                ) : (
                  rows.map((row) => (
                    <tr key={row.id} className={row.isRead ? "bg-background" : "bg-main/10"}>
                      <td className={tableCellClassName}>
                        <div className="min-w-[180px]">
                          <p className="font-heading text-foreground">{row.name}</p>
                          <a
                            href={`mailto:${row.email}`}
                            className="mt-2 inline-flex items-center gap-1 text-sm text-foreground/75 underline-offset-4 hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            <span>{row.email}</span>
                          </a>
                        </div>
                      </td>
                      <td className={tableCellClassName}>
                        <p className="min-w-[280px] whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                          {row.message}
                        </p>
                      </td>
                      <td className={tableCellClassName}>
                        <div className="min-w-[120px]">
                          <span
                            className={`inline-flex rounded-base border-2 border-border px-3 py-1 text-xs font-heading uppercase tracking-wide ${
                              row.isRead ? "bg-secondary-background text-foreground/70" : "bg-main text-main-foreground"
                            }`}
                          >
                            {row.isRead ? "Read" : "Unread"}
                          </span>
                          {row.readAt ? (
                            <p className="mt-2 text-xs text-foreground/60">Opened {row.readAt}</p>
                          ) : null}
                        </div>
                      </td>
                      <td className={tableCellClassName}>
                        <p className="min-w-[140px] text-sm text-foreground">{row.createdAt}</p>
                      </td>
                      <td className={tableCellClassName}>
                        <div className="flex min-w-[180px] flex-wrap gap-2">
                          <form
                            action={row.isRead ? markContactMessageUnread.bind(null, row.id) : markContactMessageRead.bind(null, row.id)}
                          >
                            <Button type="submit" size="sm" variant="neutral">
                              {row.isRead ? "Mark Unread" : "Mark Read"}
                            </Button>
                          </form>
                          <form action={deleteContactMessage.bind(null, row.id)}>
                            <Button type="submit" size="sm" variant="neutral">
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ManagerSection>
    </div>
  );
}

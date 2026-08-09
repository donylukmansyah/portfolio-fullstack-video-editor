import { Inbox } from "lucide-react";

import { getContactMessagesData } from "@/features/admin/server/queries";
import {
  AdminStatStrip,
  ManagerSection,
  PageHeader,
} from "@/features/admin/components/portfolio-manager/primitives";
import { ContactMessagesTable } from "@/features/admin/components/contact-messages-table";

export async function ContactMessagesManager() {
  const { rows, stats, unreadCount } = await getContactMessagesData();

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Page header ─── */}
      <PageHeader
        subtitle="Messages"
        title="Contact Inbox"
        description="Every message from the public contact form lands here, so you can review who sent it, what they asked, and follow up from the admin panel."
      >
        <AdminStatStrip stats={stats} />
      </PageHeader>

      {/* ─── Messages table ─── */}
      <ManagerSection
        count={rows.length}
        title="Inbox"
        description={`${unreadCount} unread message${unreadCount === 1 ? "" : "s"} currently waiting.`}
        icon={Inbox}
      >
        <ContactMessagesTable rows={rows} />
      </ManagerSection>
    </div>
  );
}

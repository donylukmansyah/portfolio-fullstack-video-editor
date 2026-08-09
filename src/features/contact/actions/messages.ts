"use server";

import prisma from "@/server/db/prisma";
import { assertAdminAction } from "@/server/auth/session";
import { revalidatePath } from "next/cache";

function revalidateContactMessageRoutes() {
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function markContactMessageRead(id: string) {
  await assertAdminAction();

  await prisma.contactMessage.update({
    where: { id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });

  revalidateContactMessageRoutes();
}

export async function markContactMessageUnread(id: string) {
  await assertAdminAction();

  await prisma.contactMessage.update({
    where: { id },
    data: {
      isRead: false,
      readAt: null,
    },
  });

  revalidateContactMessageRoutes();
}

export async function deleteContactMessage(id: string) {
  await assertAdminAction();

  await prisma.contactMessage.delete({
    where: { id },
  });

  revalidateContactMessageRoutes();
}

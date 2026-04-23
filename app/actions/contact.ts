"use server";

import { createHash, randomUUID } from "node:crypto";

import { cookies, headers } from "next/headers";

import prisma from "@/lib/prisma";
import { contactMessageSchema } from "@/server/validation/contact";

const CONTACT_COOLDOWN_SECONDS = 30;
const CONTACT_DEVICE_COOKIE = "contact_device_id";

export type ContactFormState = {
  ok: boolean;
  message: string;
  retryAfterSeconds: number;
  cooldownNonce: number | null;
  status: "idle" | "success" | "error" | "rate_limited";
};

function getRateLimitMessage(retryAfterSeconds: number) {
  const unit = retryAfterSeconds === 1 ? "second" : "seconds";
  return `Please wait ${retryAfterSeconds} ${unit} before sending another message.`;
}

function getSenderFingerprint(deviceId: string, userAgent: string | null) {
  return createHash("sha256")
    .update(`${deviceId}:${userAgent ?? "unknown"}`)
    .digest("hex");
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    const firstFieldError = Object.values(flattened.fieldErrors)
      .flat()
      .find((issue): issue is string => typeof issue === "string");

    return {
      ok: false,
      message: firstFieldError ?? flattened.formErrors[0] ?? "Unable to send the message.",
      retryAfterSeconds: 0,
      cooldownNonce: null,
      status: "error",
    };
  }

  if (parsed.data.website) {
    return {
      ok: true,
      message: "Message sent successfully.",
      retryAfterSeconds: 0,
      cooldownNonce: null,
      status: "success",
    };
  }

  try {
    const cookieStore = await cookies();
    const headersList = await headers();
    const existingDeviceId = cookieStore.get(CONTACT_DEVICE_COOKIE)?.value;
    const deviceId = existingDeviceId ?? randomUUID();

    if (!existingDeviceId) {
      cookieStore.set(CONTACT_DEVICE_COOKIE, deviceId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    const senderFingerprint = getSenderFingerprint(
      deviceId,
      headersList.get("user-agent"),
    );

    const latestMessage = await prisma.contactMessage.findFirst({
      where: {
        senderFingerprint,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        createdAt: true,
      },
    });

    if (latestMessage) {
      const elapsedSeconds =
        (Date.now() - latestMessage.createdAt.getTime()) / 1000;
      const retryAfterSeconds = Math.ceil(
        CONTACT_COOLDOWN_SECONDS - elapsedSeconds,
      );

      if (retryAfterSeconds > 0) {
        return {
          ok: false,
          message: getRateLimitMessage(retryAfterSeconds),
          retryAfterSeconds,
          cooldownNonce: Date.now(),
          status: "rate_limited",
        };
      }
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        senderFingerprint,
      },
    });

    return {
      ok: true,
      message: "Message sent successfully.",
      retryAfterSeconds: CONTACT_COOLDOWN_SECONDS,
      cooldownNonce: Date.now(),
      status: "success",
    };
  } catch (error) {
    console.error("Failed to save contact message.", error);

    return {
      ok: false,
      message: "Failed to send the message. Please try again.",
      retryAfterSeconds: 0,
      cooldownNonce: null,
      status: "error",
    };
  }
}

"use server";

import { z } from "zod";

import { profile } from "@/data/profile";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a couple of sentences.")
    .max(5000, "Please keep your message under 5,000 characters."),
});

type ContactField = keyof z.infer<typeof contactSchema>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  /** Shown above the form. */
  message?: string;
  /** Per-field validation messages. */
  errors?: Partial<Record<ContactField, string>>;
  /** What the visitor typed, so the form is not cleared on an error. */
  values?: Partial<Record<ContactField, string>>;
}

/**
 * Sends the contact form by email through Resend (https://resend.com).
 * Requires RESEND_API_KEY; see .env.example.
 */
export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field, bots usually do.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks, your message was sent." };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      errors[field] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  const fallback = `Please email me directly at ${profile.email}.`;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The contact form isn't set up yet. ${fallback}`,
      values,
    };
  }

  const { name, email, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL ?? profile.email,
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend error", response.status, await response.text());
      return {
        status: "error",
        message: `Something went wrong sending your message. ${fallback}`,
        values,
      };
    }
  } catch (error) {
    console.error("Contact form error", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. ${fallback}`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks, your message was sent. I'll reply as soon as I can.",
  };
}

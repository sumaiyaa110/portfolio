import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

type ContactField = "name" | "email" | "message";
type ContactValues = Record<ContactField, string>;

// Plain checks rather than a schema library: this file runs in the browser,
// so it is kept small.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }: ContactValues) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100)
    errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Please write at least a couple of sentences.";
  else if (message.length > 5000)
    errors.message = "Please keep your message under 5,000 characters.";
  return errors;
}

export interface ContactFormState {
  status: "idle" | "success" | "error";
  /** Shown above the form. */
  message?: string;
  /** Per-field validation messages. */
  errors?: Partial<Record<ContactField, string>>;
  /** What the visitor typed, so the form is not cleared on an error. */
  values?: Partial<Record<ContactField, string>>;
}

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * Sends the contact form by email through Web3Forms (https://web3forms.com).
 *
 * Runs in the visitor's browser: Web3Forms' free plan only accepts browser
 * submissions. The access key only lets someone send mail *to you*, so it is
 * safe to publish; set it in `src/config/site.ts`.
 */
export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field, bots usually do.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks, your message was sent." };
  }

  const values: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const trimmed: ContactValues = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  const errors = validate(trimmed);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const fallback = `Please email me directly at ${profile.email}.`;
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    siteConfig.contact.web3formsAccessKey;
  if (!accessKey) {
    return {
      status: "error",
      message: `The contact form isn't set up yet. ${fallback}`,
      values,
    };
  }

  const { name, email, message } = trimmed;
  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        // Collapse whitespace so a crafted name cannot break the subject line.
        subject: `Portfolio message from ${name.replace(/\s+/g, " ")}`,
        from_name: `${profile.name} portfolio`,
        name,
        email,
        message,
      }),
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!response.ok || !result?.success) {
      console.error("Web3Forms error", response.status, result?.message);
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

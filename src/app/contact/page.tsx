import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/seo";

const description =
  "Questions, research ideas, internship opportunities or just a hello: I'm happy to hear from you.";

export const metadata = createMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" description={description} />

      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          <div>
            <h2 className="font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
              Email
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="link mt-2 inline-block font-serif text-xl"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <h2 className="font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </h2>
            <SocialLinks showLabels className="mt-3 flex-col items-start gap-y-3" />
          </div>
          <div>
            <h2 className="font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
              Based in
            </h2>
            <p className="mt-2">{profile.location}</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}

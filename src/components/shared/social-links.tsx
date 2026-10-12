import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

import { socialIcons } from "./icons";

interface SocialLinksProps {
  className?: string;
  /** Show the text label next to each icon. */
  showLabels?: boolean;
}

export function SocialLinks({ className, showLabels = false }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {profile.social.map((link) => {
        const Icon = socialIcons[link.platform];
        const external = !link.href.startsWith("mailto:");
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={showLabels ? undefined : link.label}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon className="size-[1.125rem]" />
              {showLabels && <span>{link.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

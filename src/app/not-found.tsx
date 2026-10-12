import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-2xl py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-3 text-4xl font-medium sm:text-5xl">
        This page isn&apos;t in the notebook.
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        The link may be out of date, or the page may have moved.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
        Back to home
      </Link>
    </div>
  );
}

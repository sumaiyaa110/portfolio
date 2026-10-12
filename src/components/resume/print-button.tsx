"use client";

import { PrinterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Opens the browser print dialog, where the page can be saved as a PDF. */
export function PrintButton() {
  return (
    <Button variant="outline" size="lg" onClick={() => window.print()}>
      <PrinterIcon data-icon="inline-start" />
      Print
    </Button>
  );
}

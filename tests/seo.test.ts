import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { JsonLd } from "@/components/shared/json-ld";
import { publications } from "@/data/experience";
import { projects } from "@/data/projects";
import {
  personJsonLd,
  projectJsonLd,
  publicationsJsonLd,
} from "@/lib/seo";

describe("JsonLd", () => {
  it("cannot be broken out of with a closing script tag", () => {
    const html = renderToStaticMarkup(
      JsonLd({ data: { name: "</script><script>alert(1)</script>" } }),
    );
    expect(html.match(/<\/script>/g)).toHaveLength(1);
    expect(html).toContain("\\u003c/script>");
  });
});

describe("structured data", () => {
  it("describes the person with absolute URLs", () => {
    const person = personJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.sameAs.every((url) => url.startsWith("https://"))).toBe(true);
    if ("image" in person) expect(person.image).toMatch(/^https?:\/\//);
  });

  it("gives each project a breadcrumb trail", () => {
    const graph = projectJsonLd(projects[0])["@graph"];
    const breadcrumb = graph[1] as { itemListElement: { position: number }[] };
    expect(breadcrumb.itemListElement.map((item) => item.position)).toEqual([
      1, 2, 3,
    ]);
  });

  it("lists every publication", () => {
    expect(publicationsJsonLd(publications)["@graph"]).toHaveLength(
      publications.length,
    );
  });
});

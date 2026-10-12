import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const prettyCodeOptions: Options = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
};

/** Internal links use client-side navigation; external links open in a new tab. */
function MdxLink({ href = "", ...props }: React.ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Renders an MDX string as an article on the server. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-notebook">
      <MDXRemote
        source={source}
        components={{ a: MdxLink }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}

import type { MDXComponents } from "mdx/types";
import { TextLink } from "@/components/ui/TextLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/") || href?.startsWith("#")) {
        return (
          <TextLink href={href} {...props}>
            {children}
          </TextLink>
        );
      }
      return (
        <a
          href={href}
          className="text-accent underline-offset-4 hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    },
    ...components,
  };
}

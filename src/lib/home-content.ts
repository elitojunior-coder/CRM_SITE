import { z } from "zod";

const homeFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type HomeFrontmatter = z.infer<typeof homeFrontmatterSchema>;

export function parseHomeFrontmatter(data: unknown): HomeFrontmatter {
  return homeFrontmatterSchema.parse(data);
}

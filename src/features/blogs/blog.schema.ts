import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(50000, "Content must not exceed 50000 characters"),
  isPublished: z.boolean().optional().default(false),
});

export const updateBlogSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must not exceed 100 characters")
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long")
      .max(50000, "Content must not exceed 50000 characters")
      .optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const blogSlugSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
});

export const feedParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type FeedParams = z.infer<typeof feedParamsSchema>;

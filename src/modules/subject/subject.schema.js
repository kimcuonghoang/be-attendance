import z from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().min(1, "Subject code is required"),
  description: z.string().optional(),
  englishName: z.string().optional(),
  deletedAt: z.date().optional(),
});

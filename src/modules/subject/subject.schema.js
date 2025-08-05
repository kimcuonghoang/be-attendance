import { z } from "zod";

// Schema for creating a subject
export const createSubjectSchema = z
  .object({
    name: z.string().min(1, "Tên môn học là bắt buộc"),
    englishName: z.string().min(1, "Tên tiếng Anh là bắt buộc"),
    description: z.string().optional(),
  })
  .strict();

// Schema for updating a subject
export const updateSubjectSchema = z
  .object({
    name: z.string().min(1, "Tên môn học là bắt buộc").optional(),
    englishName: z.string().min(1, "Tên tiếng Anh là bắt buộc").optional(),
    description: z.string().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Phải cung cấp ít nhất một trường để cập nhật",
  });

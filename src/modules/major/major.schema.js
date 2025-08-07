import { z } from "zod";

export const createMajorSchema = z
  .object({
    name: z.string().min(1, 'Trường "Name" là bắt buộc'),
    description: z.string().min(1, 'Trường "Description" là bắt buộc'),
    code: z
      .string()
      .min(1, 'Trường "Code" là bắt buộc')
      .regex(/^[A-Z]{2,}$/, 'Trường "Code" chỉ được chứa chữ cái viết hoa'),
  })
  .strict();

export const updateMajorSchema = z
  .object({
    name: z.string().min(1, 'Trường "Name" là bắt buộc').optional(),
    description: z
      .string()
      .min(1, 'Trường "Description" là bắt buộc')
      .optional(),
    code: z
      .string()
      .min(1, 'Trường "Code" là bắt buộc')
      .regex(/^[A-Z]{2,}$/, 'Trường "Code" chỉ được chứa chữ cái viết hoa')
      .optional(),
    deletedAt: z.date().optional().nullable(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Ít nhất một trường phải được cập nhật",
  });

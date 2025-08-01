import z from "zod";

export const sessionSchema = z.object({
  classId: z.string().nonempty("Class ID is required"),
  sessionDate: z
    .date()
    .refine((date) => date > new Date(), "Session date must be in the future"),
});

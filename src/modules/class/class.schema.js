import z from "zod";
import { ShiftEnum } from "../../common/constants/enums.js";

const classSchema = z.object({
  subjectId: z.string().nonempty("Subject ID is required"),
  majorId: z.string().nonempty("Major ID is required"),
  name: z.string().nonempty("Class name is required"),
  teacherId: z.string().nonempty("Teacher ID is required"),
  studentIds: z.array(z.string()).optional(),
 
  totalSessions: z
    .number()
    .int()
    .positive("Total sessions must be a positive integer"),
  shift: z.enum(Object.values(ShiftEnum), "Invalid shift value"),
  deletedAt: z.date().optional(),
});

export default classSchema;

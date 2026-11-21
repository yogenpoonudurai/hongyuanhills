import { z } from "zod";

export const leadTypes = ["visit", "enquiry", "funeral", "notify"] as const;
export const interestValues = [
  "grounds",
  "columbarium",
  "funeral",
  "preplanning",
  "other",
] as const;
export const preferredTimes = [
  "any",
  "morning",
  "afternoon",
  "evening",
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{6,30}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const leadSchema = z.object({
  type: z.enum(leadTypes),
  locale: z.enum(["zh", "en"]),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().regex(phonePattern),
  email: z
    .string()
    .trim()
    .max(120)
    .regex(emailPattern)
    .optional()
    .or(z.literal("")),
  interest: z.enum(interestValues).optional().or(z.literal("")),
  preferredDate: z
    .string()
    .trim()
    .regex(datePattern)
    .optional()
    .or(z.literal("")),
  preferredTime: z.enum(preferredTimes).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true),
  website: z.string().max(200).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
  page: z.string().max(200).optional(),
  utm: z
    .object({
      source: z.string().max(100).optional(),
      medium: z.string().max(100).optional(),
      campaign: z.string().max(100).optional(),
      term: z.string().max(100).optional(),
      content: z.string().max(100).optional(),
    })
    .optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function fieldErrors(
  issues: z.ZodIssue[],
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

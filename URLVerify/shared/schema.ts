import { z } from "zod";

export const urlCheckSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export const urlCheckResultSchema = z.object({
  url: z.string(),
  isPhishing: z.boolean(),
  threatLevel: z.enum(["safe", "suspicious", "dangerous"]),
  analysisDetails: z.object({
    sslValid: z.boolean(),
    reputation: z.string(),
    threats: z.array(z.string()),
    lastChecked: z.string(),
  }),
});

export type UrlCheckRequest = z.infer<typeof urlCheckSchema>;
export type UrlCheckResult = z.infer<typeof urlCheckResultSchema>;

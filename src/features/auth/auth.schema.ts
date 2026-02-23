import { z } from "zod";

// Password regex: at least one letter and one number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one letter and one number",
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

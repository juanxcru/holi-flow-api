import { z as zod } from 'zod';




export const registerSchema = zod.object({
  email: zod.email(),
  password: zod.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\W_]{8,32}$/),
  organizationName: zod.string(),
  country: zod.string().default('ARG'), // toDo: ISO 3166 (3 chars) validation
  timezone: zod.string().default('GMT-3'),
  defaultProfessionalFee: zod.number().min(0).max(1).default(0),
  adminName: zod.string().min(3).max(32),
  adminPhone: zod.e164().default("none")
})

export const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\W_]{8,32}$/),
})


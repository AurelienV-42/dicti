import { z } from "zod";

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

const NAME_REGEX = /^[^.,?!^:;/$&(){}@*<>+=_%"#0-9[\]\\]{2,50}$/;
const FR_PHONE_REGEX =
  /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

export const emailSchema = z
  .string()
  .min(1, "L'email ne peut pas etre vide.")
  .max(MAX_EMAIL_LENGTH, "L'email est trop long.")
  .email("L'email ne semble pas etre au bon format.");

export const passwordSchema = z
  .string()
  .min(1, "Le mot de passe ne peut pas etre vide.")
  .min(MIN_PASSWORD_LENGTH, "Le mot de passe est trop court.")
  .max(MAX_PASSWORD_LENGTH, "Le mot de passe est trop long.");

export const nameSchema = z
  .string()
  .min(1, "Ce champ ne peut pas etre vide.")
  .min(MIN_NAME_LENGTH, "Ce champ est trop court.")
  .max(MAX_NAME_LENGTH, "Ce champ est trop long.")
  .regex(NAME_REGEX, "Le format n'est pas valide.");

export const phoneSchema = z
  .string()
  .min(1, "Le numero de telephone ne peut pas etre vide.")
  .max(30, "Le numero de telephone est trop long.")
  .regex(FR_PHONE_REGEX, "Le numero de telephone n'est pas au bon format.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Le mot de passe ne peut pas etre vide."),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

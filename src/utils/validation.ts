import { z } from "zod";

type CountryCode = "FR";

const NAME_REGEX = /^[^.,?!^:;/$&(){}@*<>+=_%"#0-9[\]\\]{2,50}$/;
const FR_PHONE_REGEX =
  /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

const nameSchema = (fieldName: string): z.ZodString =>
  z
    .string()
    .min(1, `${fieldName} ne peut pas etre vide.`)
    .min(2, `${fieldName} est trop court.`)
    .max(50, `${fieldName} est trop long.`)
    .regex(NAME_REGEX, `${fieldName} n'est pas au bon format.`);

const emailSchema = z
  .string()
  .min(1, "L'email ne peut pas etre vide.")
  .max(100, "L'email est trop long.")
  .email("L'email ne semble pas etre au bon format.");

const passwordSchema = z
  .string()
  .min(1, "Le mot de passe ne peut pas etre vide.")
  .min(6, "Le mot de passe est trop court.")
  .max(100, "Le mot de passe est trop long.");

const phoneSchema = z
  .string()
  .min(1, "Le numero de telephone ne peut pas etre vide.")
  .max(30, "Le numero de telephone est trop long.")
  .regex(FR_PHONE_REGEX, "Le numero de telephone n'est pas au bon format.");

export const nameChecker = (
  name: string,
  fieldName = "Ce champ",
): string | undefined => {
  const result = nameSchema(fieldName).safeParse(name);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const emailChecker = (email: string): string | undefined => {
  const result = emailSchema.safeParse(email);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const passwordChecker = (password: string): string | undefined => {
  const result = passwordSchema.safeParse(password);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const phoneChecker = (
  phoneNumber: string,
  _countryCode: CountryCode,
): string | undefined => {
  const result = phoneSchema.safeParse(phoneNumber);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const startEndDatechecker = (
  startDate: Date | null,
  endDate: Date | null,
  minDate: Date,
): string | undefined => {
  if (!startDate) {
    return "La date de debut ne peut etre vide";
  }
  const today = new Date();
  const effectiveEndDate = endDate ?? today;

  if (startDate > today) {
    return "La date de debut ne peut etre dans le futur.";
  }

  if (startDate > effectiveEndDate) {
    return "La date de debut ne peut etre apres la date de fin.";
  }

  if (startDate < minDate || effectiveEndDate < minDate) {
    return "Les dates sont trop anciennes.";
  }

  return undefined;
};

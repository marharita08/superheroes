import { z } from "zod";

const SuperheroCreateUpdateSchema = z.object({
  nickname: z.string().trim().min(1, { message: "Nickname is required" }),
  realName: z.string().trim().min(1, { message: "Real name is required" }),
  originDescription: z
    .string()
    .trim()
    .min(1, { message: "Origin description is required" }),
  superpowers: z
    .string()
    .trim()
    .min(1, { message: "Superpowers are required" }),
  catchPhrase: z.string().trim().min(1, { message: "Catchphrase is required" }),
  images: z
    .array(z.object({ url: z.string().url("Must be a valid URL") }))
    .optional()
});

export { SuperheroCreateUpdateSchema };

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const PlayerDataSchema = z
  .object({
    rank: z.number().int().positive(),
    points: z.number().int().nonnegative(),
    weight: z.number().int().positive(),
    height: z.number().int().positive(),
    age: z.number().int().positive(),
    last: z.array(z.union([z.literal(0), z.literal(1)])).max(5),
  })
  .openapi("PlayerData");

const PlayerCountrySchema = z
  .object({
    picture: z.url(),
    code: z.string().length(3),
  })
  .openapi("PlayerCountry");

export const PlayerSchema = z
  .object({
    id: z.number().int().positive(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    shortname: z.string().min(1),
    sex: z.enum(["M", "F"]),
    country: PlayerCountrySchema,
    picture: z.url(),
    data: PlayerDataSchema,
  })
  .openapi("Player");

export const CreatePlayerSchema = PlayerSchema.omit({ id: true }).openapi(
  "CreatePlayer",
);

export const UpdatePlayerSchema = CreatePlayerSchema.openapi("UpdatePlayer");

export const PlayerIdParamSchema = z
  .object({ id: z.coerce.number().int().positive() })
  .openapi("PlayerIdParam");

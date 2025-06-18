import { z } from 'zod';

export const envSchema = z
  .object({
    ENV: z.enum(['test', 'staging', 'live']),
    PORT: z.string().transform((p) => parseInt(p)),
    JWT_SECRET: z.string(),
    MONGO_URL: z.string(),
  })
  .strict();

export function validateConfig(config: Record<string, unknown>) {
  if (CL_ARGS.port) config.PORT = CL_ARGS.port;
  const validatedConfig = envSchema.parse(config);
  return validatedConfig;
}

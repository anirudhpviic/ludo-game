/* eslint-disable no-var */

import { parseCommandLineArgs } from './util';
import { envSchema } from './env.validator';

declare global {
  var CL_ARGS: ReturnType<typeof parseCommandLineArgs>;
  type EnvironmentVariables = z.infer<typeof envSchema>;
}

export { };

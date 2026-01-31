import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE_',

  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
  },

  /**
   * What object holds the environment variables at runtime.
   * Server variables use process.env, client variables use import.meta.env.
   */
  runtimeEnv: {
    // Server variables (from process.env)
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    // Client variables (from import.meta.env)
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,

  /**
   * Skip validation in certain environments
   */
  skipValidation: typeof window !== 'undefined',
})

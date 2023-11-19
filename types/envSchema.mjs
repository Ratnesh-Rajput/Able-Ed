// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */

import { z } from 'zod'

/*eslint sort-keys: "error"*/
export const envSchema = z.object({
	DISCORD_CLIENT_ID: z.string().transform((x) => x.toString()),
	DISCORD_CLIENT_SECRET: z.string(),
	GITHUB_CLIENT_ID: z.string().optional(),
	GITHUB_CLIENT_SECRET: z.string().optional(),
	MONGODB_URI: z.string().url(),
	MONGO_COLL: z.string(),
	MONGO_PW: z.string(),
	MONGO_SERVER: z.string(),
	MONGO_USER: z.string(),
	NEXTAUTH_SECRET: z
		.string()
		.regex(/^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?$/, {
			message: 'Must be a base64 encoded string - see .env.example',
		}),
	NEXTAUTH_URL: z.string().url(),
	NODE_ENV: z.enum(['development', 'test', 'production']),
	TWITTER_CLIENT_ID: z.string().optional(),
	TWITTER_CLIENT_SECRET: z.string().optional(),
})

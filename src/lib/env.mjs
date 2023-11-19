// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { envSchema } from '../../types/envSchema.mjs'

const formatErrors = (
	/** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
	errors
) =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (value && '_errors' in value)
				return `⚠️  ${name}: ${value._errors.join(', ')} ⚠️\n`
		})
		.filter(Boolean)

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error(
		'❌ Invalid environment variables:\n\n',
		...formatErrors(_env.error.format())
	)
	throw new Error(
		`

	❌ 🙅‍♀️ 🙅🏻‍♂️ ❌
	Invalid environment variables!
	❌ 🙅‍♀️ 🙅🏻‍♂️ ❌
	
	`,
		{ cause: _env.error }
	)
}
export const env = { ..._env.data }

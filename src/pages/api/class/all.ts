import { getServerSession } from '../auth/[...nextauth]'
import * as httpResponse from '~/lib/httpResponse'
import { isDevEnv } from '~/lib'
import { NextApiHandler } from 'next'
import { fetchClasses } from '~/lib/db/queries'

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	if (!session) {
		!isDevEnv
			? httpResponse.unauthorized(res)
			: console.log('unauthed req for /api/classes/all')
	}
	try {
		const classes = await fetchClasses()
		httpResponse.json(res, classes)
	} catch (err) {
		httpResponse.serverErrorJSON(res, err)
	}
}
export default handler

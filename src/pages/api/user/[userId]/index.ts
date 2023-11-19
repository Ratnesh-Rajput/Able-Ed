import type { NextApiHandler } from 'next'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import { fetchCurrentUser } from '~/lib/db/queries'
import * as httpResponse from '~/lib/httpResponse'

const handler: NextApiHandler = async (req, res) => {
	try {
		const session = await getServerSession(req, res)
		const { method, query } = req
		if (!session?.user.id) throw 'unauthorized'
		if (query.userId === 'me' && method === 'GET') {
			const currentUserProfile = await fetchCurrentUser(session.user.id)
			httpResponse.json(res, currentUserProfile)
		}
	} catch (error) {
		switch (error) {
			case 'unauthorized':
				httpResponse.unauthorized(res)
			default:
				httpResponse.serverErrorJSON(res, error)
		}
	}
}
export default handler

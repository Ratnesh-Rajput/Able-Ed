import type { NextApiRequest, NextApiResponse } from 'next'
import * as httpResponse from '~/lib/httpResponse'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import { updateCurrentUser } from '~/lib/db/queries'
import type { CurrentUserUpdateData } from '~/lib/db/validations'
import { z } from 'zod'
import superjson from 'superjson'

const validateData = z.object({
	name: z.string().optional(),
	email: z.string().optional(),
})

type Data = {
	userId: string
	data: CurrentUserUpdateData
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getServerSession(req, res)
		const { method, query, body } = req
		if (!session?.user.id) throw 'unauthorized'
		if (query.userId === 'me' && method === 'PATCH') {
			const reqBody = validateData.parse(superjson.deserialize(req.body))
			const result = await updateCurrentUser(session.user.id, reqBody)
			httpResponse.json(res, result)
		} else throw 'badRequest'
	} catch (error) {
		switch (error) {
			case 'unauthorized':
				httpResponse.unauthorized(res)
			case 'badRequest':
				httpResponse.badRequest(res)
			default:
				httpResponse.serverErrorJSON(res, error)
		}
	}
}
export default handler

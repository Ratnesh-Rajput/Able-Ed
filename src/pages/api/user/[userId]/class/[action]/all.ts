import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { fetchClassStatuses } from '~/lib/db/queries'
import { Prisma } from '@prisma/client'
import * as httpResponse from '~/lib/httpResponse'
import { isDevEnv } from '~/lib'

interface QueryParams {
	userId: Prisma.UserCreateInput['id']
	action: 'status' | 'update'
}

const handler: NextApiHandler = async (req, res) => {
	try {
		const session = await getServerSession(req, res)
		const { userId, action } = req.query as Partial<QueryParams>
		const { method } = req

		if (!session) {
			!isDevEnv
				? httpResponse.unauthorized(res)
				: console.log('unauthed req for /api/classes/all')
		}
		if (userId !== session?.user.id && session?.user.role !== 'USER')
			throw 'forbidden'
		switch (action) {
			case 'status':
				if (method !== 'GET' || !userId) throw 'badRequest'

				const classes = await fetchClassStatuses(userId)
				httpResponse.json(res, classes)
		}
	} catch (error) {
		switch (error) {
			case 'forbidden':
				httpResponse.forbidden(res)
			case 'badRequest':
				httpResponse.badRequest(res)
			default:
				httpResponse.serverErrorJSON(res, error)
		}
	}
}
export default handler

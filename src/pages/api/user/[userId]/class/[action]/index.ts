import type { NextApiHandler } from 'next'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import {
	upsertManyCompletedClasses,
	CompletedClassesInput,
} from '~/lib/db/queries'
import { z } from 'zod'
import superjson from 'superjson'
import * as httpResponse from '~/lib/httpResponse'

interface QueryParams {
	userId: string
	action: 'massupdate'
}

const handler: NextApiHandler = async (req, res) => {
	try {
		/* Checking to see if the user is logged in. */
		const session = await getServerSession(req, res)
		/* Destructuring the query params from the request object. */
		const { userId, action } = req.query as Partial<QueryParams>
		/* Destructuring the body and method properties from the request object. */
		const { body, method } = req
		/* Creating a schema that will be used to validate the payload. */
		const massUpdateSchema = z.object({
			userId: z.string(),
			classes: z.array(z.string()).nonempty(),
		})
		/* If the user is not logged in, it will return a 401 error. */
		if (!session) httpResponse.unauthorized(res)
		/* This is a security measure to prevent a user from accessing the endpoint with a GET request. */
		if (method !== 'POST' || action !== 'massupdate')
			httpResponse.badRequest(res)
		/* Deserializing the data from the request body. */
		const payload = superjson.deserialize<CompletedClassesInput>(body.data)
		/* Validating the payload against the schema. */
		const validatedPayload = massUpdateSchema.parse(payload)
		/* Calling the upsertManyCompletedClasses function and passing in the validated payload. */
		if (payload.userId !== userId && session?.user.role === 'USER')
			httpResponse.forbidden(res)
		const mutation = await upsertManyCompletedClasses(validatedPayload)
		/* Sending the response back to the client. */
		httpResponse.json(res, mutation)
	} catch (error) {
		/* Sending a 500 error to the client. */
		httpResponse.serverErrorJSON(res, error)
	}
}
export default handler

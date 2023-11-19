import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { querySingleClass } from '../validations'

export type FetchSingleClassResult =
	| Prisma.PromiseReturnType<typeof fetchSingleClass>
	| Prisma.NotFoundError

/**
 * It fetches a single class from the database using the classId
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class you want to fetch
 * @returns  The result of the query.
 */
export const fetchSingleClass = async (classId: string) => {
	try {
		const result = await prisma.class.findUniqueOrThrow(
			querySingleClass(classId)
		)
		return result
	} catch (err) {
		console.error(err)
		throw 'not found'
	}
}

import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { queryClassStatusesByUser } from '../validations'

export type FetchClassStatusesResult = Prisma.PromiseReturnType<
	typeof fetchClassStatuses
>
/**
 * It fetches all the class statuses for a user and returns them in a formatted object
 * @param {string} userId - The user's id
 * @returns An array of objects with the classId and status
 */
export const fetchClassStatuses = async (userId: string) => {
	try {
		const data = await prisma.classStatus.findMany(
			queryClassStatusesByUser(userId)
		)
		const formattedData = {
			id: userId,
			classes: data.map((result) => ({
				id: result.classId,
				status: result.status,
			})),
		}
		return formattedData
	} catch (err) {
		throw err
	}
}

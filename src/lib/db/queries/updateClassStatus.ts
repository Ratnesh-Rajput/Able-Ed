import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { upsertSingleClassStatus } from '../validations'

export type UpdateClassStatusResult = Prisma.PromiseReturnType<
	typeof updateClassStatus
>
/**
 * It takes a userId, classId, and newStatus, and updates the status of the class for the user
 * @param {Prisma.UserCreateInput['id']} userId - The user's id
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class
 * @param {Prisma.ClassStatusCreateInput['status']} newStatus - The updated status
 * @returns {UpdateClassStatusResult} The userId and the status of the class
 */
export const updateClassStatus = async (
	userId: string,
	classId: string,
	newStatus: 'not_started' | 'in_progress' | 'done'
) => {
	try {
		const record = await prisma.classStatus.upsert(
			upsertSingleClassStatus(userId, classId, newStatus)
		)
		const formattedData = {
			id: record.userId,
			status: [
				{
					classId: record.classId,
					status: record.status,
				},
			],
		}
		return formattedData
	} catch (error) {
		console.error(error)
		throw error
	}
}

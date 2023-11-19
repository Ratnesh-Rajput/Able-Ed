import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { upsertManyCompletedClassesPayload } from '../validations'

export interface CompletedClassesInput {
	userId: string
	classes: string[]
}

export type UpsertManyCompletedClassesResult = Prisma.PromiseReturnType<
	typeof upsertManyCompletedClasses
>

/**
 * It takes an array of classIds and a userId, and creates a new classStatus record for each classId in
 * the array
 * @param {CompletedClassesInput} data - CompletedClassesInput
 * @returns An array of classStatus objects
 */
export const upsertManyCompletedClasses = async (
	data: CompletedClassesInput
) => {
	const { userId, classes } = data
	const payload = classes.map((classId) =>
		upsertManyCompletedClassesPayload(userId, classId)
	)
	const result = await prisma.$transaction(payload)
	return result
}

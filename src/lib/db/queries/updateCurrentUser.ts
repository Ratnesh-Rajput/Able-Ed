import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { updateCurrentUserArgs, CurrentUserUpdateData } from '../validations'

export type UpdateCurrentUserResult = Prisma.PromiseReturnType<
	typeof updateCurrentUser
>

export const updateCurrentUser = async (
	userId: string,
	data: CurrentUserUpdateData
) => {
	return await prisma.user.update(updateCurrentUserArgs(userId, data))
}

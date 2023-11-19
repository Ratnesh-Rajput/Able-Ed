import { prisma } from '~/lib'
import { getUserLastUpdateArgs } from '../validations'
import { Prisma } from '@prisma/client'

export const getUserLastUpdate = async (userId: string) => {
	return await prisma.user.findUnique(getUserLastUpdateArgs(userId))
}
export type GetUserLastUpdate = Prisma.PromiseReturnType<
	typeof getUserLastUpdate
>

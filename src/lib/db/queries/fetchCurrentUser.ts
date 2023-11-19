import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { findUniqueUser } from '../validations'

export type FetchCurrentUserResult = Prisma.PromiseReturnType<
	typeof fetchCurrentUser
>
// | Prisma.NotFoundError

export const fetchCurrentUser = async (userId: string) => {
	const data = await prisma.user.findUniqueOrThrow(findUniqueUser(userId))
	return data
}

import { Prisma } from '@prisma/client'

export const findUniqueUser = (userId: string) => {
	return Prisma.validator<Prisma.UserFindUniqueOrThrowArgs>()({
		where: {
			id: userId,
		},
		select: {
			id: true,
			discordTag: true,
			name: true,
			email: true,
			image: true,
			role: true,
			accounts: {
				select: {
					provider: true,
					providerAccountId: true,
				},
			},
		},
	})
}

export const getUserLastUpdateArgs = (userId: string) => {
	return Prisma.validator<Prisma.UserFindUniqueArgs>()({
		where: {
			id: userId,
		},
		select: {
			updatedAt: true,
		},
	})
}
export interface CurrentUserUpdateData {
	name?: string
	email?: string
}

export const updateCurrentUserArgs = (
	userId: string,
	data: CurrentUserUpdateData
) => {
	return Prisma.validator<Prisma.UserUpdateArgs>()({
		where: {
			id: userId,
		},
		data: {
			name: data?.name,
			email: data?.email,
		},
	})
}

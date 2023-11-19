import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { Prisma } from '@prisma/client'
import { FetchCurrentUserResult } from '~/hooks'
import { prisma } from '~/lib'

const userTypeGen = Prisma.validator<Prisma.UserFindUniqueArgs>()({
	where: {
		id: string,
	},
})

declare module 'next-auth' {
	interface DiscordGuild {
		id: string
	}

	interface AxiosResponse {
		data: DiscordGuild[] | any
	}

	interface Session {
		user: {
			id: User['id']
			role: User['role']
			name: User['name']
			image: User['image']
			discordTag: User['discordId']
		}
	}
	interface User {
		id?: string
		role?: 'USER' | 'MOD' | 'ADMIN'
		name?: string
		discordId?: string
		discordTag?: string
		updatedAt?: Date
		image?: string
	}
	// interface User extends Partial<Prisma.UserGetPayload<typeof userTypeGen>> {}
}
declare module 'next-auth/providers/discord' {
	interface DiscordProfile {
		discordId: string
	}
}

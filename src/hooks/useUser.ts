import { axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'
import superjson from 'superjson'
import { Prisma } from '@prisma/client'
import type {
	FetchCurrentUserResult,
	UpdateCurrentUserResult,
} from '~/lib/db/queries'
import type { CurrentUserUpdateData } from '~/lib/db/validations'
import { SuperJSONResult } from 'superjson/dist/types'

export const fetchCurrentUserAPI =
	async (): Promise<FetchCurrentUserResult> => {
		const client = axiosClient()
		const { data } = await client.get('/api/user/me')
		const deserialized = superjson.deserialize<FetchCurrentUserResult>(data)
		return deserialized
	}

export const useCurrentUser = () => {
	const result = useQuery<FetchCurrentUserResult, Prisma.NotFoundError>(
		['user', 'me'],
		fetchCurrentUserAPI
	)
	return result
}

export const updateCurrentUserAPI = async (
	data: CurrentUserUpdateData
): Promise<UpdateCurrentUserResult> => {
	const client = axiosClient()
	const { data: res } = await client.patch<SuperJSONResult>(
		'/api/user/me/update',
		superjson.serialize(data)
	)
	const deserialized = superjson.deserialize<UpdateCurrentUserResult>(res)
	return deserialized
}

import { axiosClient } from '~/lib'
import { useQuery, QueryKey } from '@tanstack/react-query'
import superjson from 'superjson'
import { Prisma } from '@prisma/client'
import type {
	FetchClassStatusesResult,
	UpdateClassStatusResult,
} from '~/lib/db/queries'

/**
 * It fetches all the class statuses for a user
 * @param {string} userId - The user's ID.
 * @returns {FetchClassStatusesResult} FetchClassStatusesResult
 */
const fetchClassStatusesAPI = async (
	userId: string
): Promise<FetchClassStatusesResult> => {
	const client = axiosClient()
	try {
		const { data } = await client.get(`/api/user/${userId}/class/status/all`)
		const deserialized = superjson.deserialize<FetchClassStatusesResult>(data)
		return deserialized
	} catch (error) {
		throw new Error(JSON.parse(JSON.stringify(error)))
	}
}

export const keyClassStatuses = (
	userId: Prisma.UserWhereUniqueInput['id']
): QueryKey => ['class', userId, 'statuses']

/**
 * It returns a query result for a query key and a user id
 * @param {QueryKey} queryKey - This is a unique key that will be used to identify this query.
 * @param {Prisma.UserCreateInput['id']} userId
 * @returns {FetchClassStatusesResult} The result of the query
 */
export const useClassStatuses = (queryKey: QueryKey, userId: string) => {
	const result = useQuery<FetchClassStatusesResult, Error>(queryKey, () =>
		fetchClassStatusesAPI(userId)
	)
	return result
}

/**
 * It updates the status of a class for a user
 * @param {Prisma.UserCreateInput['id']} userId - The id of the user who is updating the class status
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class you want to update
 * @param {Prisma.ClassStatusCreateInput['status']} newStatus - The updated status
 * @returns {UpdateClassStatusResult}
 */
export const updateClassStatusAPI = async (
	userId: Prisma.UserCreateInput['id'],
	classId: Prisma.ClassCreateInput['id'],
	newStatus: Prisma.ClassStatusCreateInput['status']
): Promise<UpdateClassStatusResult> => {
	const client = axiosClient()
	try {
		const { data } = await client.put(
			`/api/user/${userId}/class/update/${classId}`,
			superjson.serialize({ newStatus })
		)
		return data
	} catch (err) {
		console.error(err)
		throw err
	}
}

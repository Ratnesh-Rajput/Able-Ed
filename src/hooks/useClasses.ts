import { Prisma } from '@prisma/client'
import { axiosClient } from '~/lib'
import { useQuery, QueryKey } from '@tanstack/react-query'
import superjson from 'superjson'
import type {
	FetchClassesResult,
	FetchSingleClassResult,
	CompletedClassesInput,
	UpsertManyCompletedClassesResult,
} from '~/lib/db/queries'

/**
 * It fetches all the classes from the server and returns them as an array of ClassRecord objects
 * @returns An array of ClassRecord objects
 */
export const fetchClassesAPI = async () => {
	const client = axiosClient()
	const { data } = await client.get('/api/class/all')
	const formattedData = superjson.deserialize<FetchClassesResult>(data)
	return formattedData
}

/**
 * `useClasses` is a React hook that returns the result of a query for all classes
 * @returns The result of the useQuery hook.
 */
export const useClasses = () => {
	const result = useQuery<FetchClassesResult>(['classes'], fetchClassesAPI)
	return result
}

/**
 * It fetches a single class from the database using the classId
 * @param {Prisma.ClassCreateInput['id']} classId
 * @returns {FetchSingleClassResult} The data from the API call
 */
const fetchSingleClassAPI = async (classId: string) => {
	const client = axiosClient()
	const { data } = await client.get(`/api/class/${classId}`)
	const formattedData = superjson.deserialize<FetchSingleClassResult>(data)
	return formattedData
}

/**
 * It takes a classId and returns a query key that can be used to fetch that class
 * @param classId - The id of the class we want to retrieve.
 */
export const keySingleClass = (
	classId: Prisma.ClassCreateInput['id']
): QueryKey => ['class', 'byId', classId]

/**
 * It returns a `QueryResult` object that contains the result of the query, and a function to refetch
 * the query
 * @param {Prisma.ClassCreateInput['id']} classId
 * @returns {FetchSingleClassResult} The result of the query
 */
export const useSingleClass = (classId: string) => {
	const result = useQuery<FetchSingleClassResult, Prisma.NotFoundError>(
		keySingleClass(classId),
		() => fetchSingleClassAPI(classId)
	)
	return result
}

/**
 * It takes a payload of completed classes, and then it sends that payload to the server, which then
 * updates the database with the new completed classes
 * @param {CompletedClassesInput} payload - CompletedClassesInput
 * @returns {UpsertManyCompletedClassesResult} An array of completed classes
 */
export const upsertManyCompletedClassesAPI = async (
	payload: CompletedClassesInput
): Promise<UpsertManyCompletedClassesResult> => {
	const client = axiosClient()
	const { data } = await client.post(
		`/api/user/${payload.userId}/class/massupdate/`,
		{ data: superjson.serialize(payload) }
	)
	return superjson.deserialize<UpsertManyCompletedClassesResult>(data)
}

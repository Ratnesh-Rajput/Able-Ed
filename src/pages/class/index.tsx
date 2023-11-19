import {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	ComponentWithAuth,
} from 'next'
import { Text } from '@mantine/core'
import { ClassAccordianTable } from '~/components/ClassTable'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useClasses, useClassStatuses, keyClassStatuses } from '~/hooks'
import { fetchClasses, fetchClassStatuses } from '~/lib/db/queries'
import superjson from 'superjson'
import { getServerSession } from '../api/auth/[...nextauth]'

const ClassPage: ComponentWithAuth = ({
	session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	// const { data: session, status } = useSession()
	const userId = session?.user.id
	const {
		data: classData,
		isLoading: classLoading,
		isError: classErrorStat,
		error: classError,
	} = useClasses()
	const {
		data: statusData,
		isLoading: statusLoading,
		isError: statusErrorStat,
		error: statusError,
	} = useClassStatuses(keyClassStatuses(userId), userId)
	try {
		if (classLoading || statusLoading) return <Text>Loading...</Text>
		if (classErrorStat || statusErrorStat)
			throw classErrorStat ? 'classError' : 'statusError'
		return <ClassAccordianTable data={classData} status={statusData} />
	} catch (err) {
		switch (err) {
			case 'classError':
				return <Text>{`Error: ${classError}`}</Text>
			case 'statusError':
				return <Text>{`Error: ${statusError}`}</Text>
			default:
				return <Text>{`Error: ${err}`}</Text>
		}
	}
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context
	const session = await getServerSession(req, res)
	const { id: userId } = session?.user ?? { id: '' }
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['classes'], fetchClasses)
	if (userId) {
		await queryClient.prefetchQuery(keyClassStatuses(userId), () =>
			fetchClassStatuses(userId)
		)
		const queryState = dehydrate(queryClient)
		const serializedQueryState = superjson.serialize(queryState)
		return {
			props: {
				dehydratedState: serializedQueryState,
				session,
			},
		}
	}
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}

ClassPage.auth = { required: true }
export default ClassPage

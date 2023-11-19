import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const fetchSession = async (): Promise<Session | null> => {
	const res = await getSession()
	return res
}

export function useSession<R extends boolean = false>({
	required,
	redirectTo = '/api/auth/signin?error=SessionExpired',
}: {
	/** If set to `true`, the returned session is guaranteed to not be `null` */
	required?: R
	/** If `required: true`, the user will be redirected to this URL, if they don't have a session */
	redirectTo?: string
} = {}) {
	const router = useRouter()
	const query = useQuery(['session'], fetchSession, {
		onSettled(data) {
			if (data || !required) return
			router.push(redirectTo)
		},
		staleTime: 1000 * 60 * 15,
	})
	return [
		query.data as R extends true ? Session : Session | null,
		query.status === 'loading',
	] as const
}

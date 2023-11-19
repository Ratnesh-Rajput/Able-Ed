import next, { NextComponentType, NextPageContext } from 'next'
import { Session, User } from 'next-auth'
import { Router } from 'next/router'

declare module 'next' {
	interface ApiErrorResponse {
		message: string
	}
	interface AuthWrapProps {
		required?: boolean
		children?: AppProps['children']
		role?: User['role']
		loader?: JSX.Element
		// redirectTo?: 'signin' | 'accessdenied'
	}
	type ComponentWithAuth<PropsTypes = any> = React.FC<PropsTypes> & {
		auth?: AuthWrapProps
	}
}

declare module 'next/app' {
	type AppProps<P = Record<string, unknown>> = {
		Component: NextComponentType<NextPageContext, any, P>
		router: Router
		__N_SSG?: boolean
		__N_SSP?: boolean
		pageProps: P & {
			/** Initial session passed in from `getServerSideProps` or `getInitialProps` */
			session?: Session
		}
	}
}

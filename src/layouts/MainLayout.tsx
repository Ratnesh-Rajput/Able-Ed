import { AppShell, ScrollArea } from '@mantine/core'
import { SideNav, HeaderBar, CenterLoader } from '~/components'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

interface LayoutProps {
	children: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
	const { data: session, status } = useSession()
	const [scrolled, setScrolled] = useState(false)
	if (status === 'loading' && !session) {
		return <CenterLoader />
	}
	return (
		<AppShell
			padding='md'
			fixed={true}
			navbar={(session && <SideNav />) || undefined}
			header={<HeaderBar />}
		>
			{children}
		</AppShell>
	)
}

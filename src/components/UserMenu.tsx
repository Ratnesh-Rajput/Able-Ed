import {
	UnstyledButton,
	Group,
	Avatar,
	Menu,
	Button,
	Loader,
	createStyles,
	Center,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import { Icon } from '@iconify/react'
import { useSession, signIn, signOut } from 'next-auth/react'

// This is Typescript stuff - don't worry about it.
interface LoggedInProps {
	image: string
	name: string
}
// end Typescript stuff

const useStyles = createStyles((theme) => ({
	userMenu: {
		// [ theme.fn.smallerThan( 'xs' ) ]: {
		//     display: 'none',
		// },
	},
	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '',
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',
		'&:hover': {
			backgroundColor: theme.colors.primary[5],
			// theme.colorScheme === 'dark'
			// 	? theme.colors.dark[8]
			// 	: theme.colors.primary[6],
		},
	},
	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '',
	},
	icon: {
		// fontSize: '2.5rem',
		marginRight: '2rem',
	},
	avatarShadow: {
		filter: `drop-shadow(3px 3px 1px #737373)`,
	},
}))

const LoggedInUser = () => {
	const { data: session, status } = useSession()
	const { classes } = useStyles()
	let name, image
	session ? ({ name, image } = session.user) : null

	return (
		<Menu position='bottom' transition='scale-y' width={200}>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar
							src={image}
							radius='xl'
							size='lg'
							alt={name}
							classNames={{
								root: classes.avatarShadow,
							}}
						/>
						<Icon icon='fa6-solid:chevron-down' height='18' />
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					component={NextLink}
					href='/dashboard/profile'
					icon={<Icon icon='fa6-solid:user-pen' height='20' />}
				>
					<Center>Profile</Center>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => signOut({ callbackUrl: '/' })}
					icon={<Icon icon='fa6-solid:door-open' height='20' />}
				>
					<Center>Logout</Center>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}

const SignUpLoginButtons = () => {
	return (
		<Group>
			<Button
				variant='outline'
				color='highlightPrimary'
				onClick={() =>
					signIn(
						'discord',
						{ callbackUrl: '/dashboard' },
						{ prompt: 'consent' }
					)
				}
			>
				Sign Up with Discord
			</Button>
			<Button
				onClick={() =>
					signIn('discord', { callbackUrl: '/dashboard' }, { prompt: 'none' })
				}
				variant='filled'
				color='highlightPrimary'
			>
				Log In with Discord
			</Button>
		</Group>
	)
}

export const UserMenu = () => {
	const { data: session, status } = useSession()
	const isLoading = status === 'loading'
	const hasSession = session != null
	const menuControl = () => {
		if (hasSession && !isLoading) {
			return <LoggedInUser />
			// return <></>
		}
		if (!hasSession && !isLoading) {
			return <SignUpLoginButtons />
		}
		return <Loader />
	}
	return menuControl()
}

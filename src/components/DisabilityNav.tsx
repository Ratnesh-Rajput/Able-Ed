import {
	Navbar,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { disnav } from '~/data/disnav'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// color: theme.white,
		opacity: 0.85,

		'&:hover': {
			opacity: 1,
			backgroundColor: theme.colors.primary[5],
			svg: {
				color: theme.colors.secondary[1],
			},
		},
	},
	active: {
		opacity: 1,
		'&, &:hover': {
			backgroundColor: theme.colors.primary[7],
		},
	},
	icon: {
		fontSize: '1.75rem',
		color: theme.colors.primary[0],
	},
}))

interface NavbarLinkProps {
	icon: string
	label: string
	active: boolean
	url: string
}

export function NavLink({ icon, label, active, url }: NavbarLinkProps) {
	const { classes, cx } = useStyles()
	return (
		<Tooltip
			label={label}
			position='right'
			withArrow
			transitionDuration={50}
			transition='scale-x'
		>
			<div>
				<Link href={url} passHref>
					<UnstyledButton
						component='a'
						className={cx(classes.link, { [classes.active]: active })}
					>
						<Icon icon={icon} className={classes.icon} />
					</UnstyledButton>
				</Link>
			</div>
		</Tooltip>
	)
}

const useNavbarStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colors.primary[6],
		margin: 'none',
	},
}))

export function DisabilityNav() {
	const { classes } = useNavbarStyles()
	const router = useRouter()
	const links = disnav.map((link, index) => (
		<NavLink {...link} key={link.label} active={router.pathname === link.url} />
	))

	return (
		<Navbar
			fixed={false}
			width={{ base: 80 }}
			p='md'
			className={classes.navbar}
		>
			<Stack align='center' spacing='md'>
				{links}
			</Stack>
		</Navbar>
	)
}

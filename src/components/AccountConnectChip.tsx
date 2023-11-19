import { ReactElement, useState } from 'react'
import { Chip, Group, createStyles } from '@mantine/core'
import { signIn } from 'next-auth/react'
const useChipStyles = createStyles((theme, _params, getRef) => ({
	label: {
		'&[data-checked]': {
			'&, &:hover': {
				backgroundColor: theme.colors.highlightPrimary[4],
				color: theme.white,
			},
			[`& .${getRef('iconWrapper')}`]: {
				color: theme.white,
			},
		},
		'&[data-disabled]': {
			backgroundColor: `${
				// theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
				theme.colors.highlightPrimary[4]
			} !important`,
			borderColor:
				// ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}
				`#f1f3f5 !important`,
			color: theme.white,
			// theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
			cursor: 'default',

			...theme.fn.hover({
				backgroundColor: theme.colors.highlightPrimary[4],
				// theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
			}),
		},
	},
}))

interface Props {
	service: string
	connected: boolean
	icon: ReactElement
}

export const AccountConnectChip = ({ service, connected, icon }: Props) => {
	const { classes: chipClasses } = useChipStyles()
	const [connectedState, setConnectedState] = useState(connected)
	const handleConnectAccount = async (service: string) => {
		signIn(service, { callbackUrl: '/dashboard/profile?connect=true' })
	}
	return (
		<Group align='center'>
			{icon}
			<Chip
				classNames={chipClasses}
				checked={connectedState}
				disabled={connectedState}
				onChange={() => handleConnectAccount(service)}
				sx={(theme) => ({
					display: 'inline',
					paddingLeft: 5,
				})}
				size='md'
			>
				{connectedState ? 'Connected' : 'Connect'}
			</Chip>
		</Group>
	)
}

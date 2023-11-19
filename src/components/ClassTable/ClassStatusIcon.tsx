import { Icon } from '@iconify/react'
import { Tooltip } from '@mantine/core'
import { Prisma } from '@prisma/client'

interface Props {
	status: Prisma.ClassStatusCreateInput['status']
}

export const ClassStatusIcon = ({ status }: Props) => {
	switch (status) {
		case 'not_started':
			return (
				<Tooltip label='Not started' withArrow>
					<Icon icon='fa6-solid:minus' />
				</Tooltip>
			)
		case 'in_progress':
			return (
				<Tooltip label='In progress' withArrow>
					<Icon icon='fa6-solid:laptop-code' />
				</Tooltip>
			)
		case 'done':
			return (
				<Tooltip label='Done' withArrow>
					<Icon icon='fa6-solid:flag-checkered' />
				</Tooltip>
			)
		// default:
		// 	return (
		// 		<Tooltip label='Error: Status not recieved' withArrow>
		// 			<Icon icon='fa6-solid:question' />
		// 		</Tooltip>
		// )
	}
}

import { SegmentedControl, Tooltip, Loader } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { updateClassStatusAPI, keyClassStatuses } from '~/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ClassStatusSwitchProps {
	classId: string
	status: 'not_started' | 'in_progress' | 'done'
	userId: string
}

export const ClassStatusSwitch = ({
	classId,
	status,
	userId,
}: ClassStatusSwitchProps) => {
	const [classStatus, setClassStatus] = useState(status)
	const queryClient = useQueryClient()
	const update = useMutation(
		(value: ClassStatusSwitchProps['status']) =>
			updateClassStatusAPI(userId, classId, value),
		{ onSuccess: () => queryClient.invalidateQueries(keyClassStatuses(userId)) }
	)
	const handleClick = (value: ClassStatusSwitchProps['status']) => {
		setClassStatus(value)
		update.mutate(value)
	}
	const showLoader = (value: ClassStatusSwitchProps['status']) =>
		update.isLoading && value === classStatus ? <Loader size='sm' /> : false
	return (
		<SegmentedControl
			data={[
				{
					label: (
						<>
							{showLoader('not_started') ? (
								showLoader('not_started')
							) : (
								<Tooltip label='Not started' withArrow withinPortal>
									<Icon icon='fa6-solid:minus' />
								</Tooltip>
							)}
						</>
					),
					value: 'not_started',
				},
				{
					label: (
						<>
							{showLoader('in_progress') ? (
								showLoader('in_progress')
							) : (
								<Tooltip label='In progress' withArrow withinPortal>
									<Icon icon='fa6-solid:laptop-code' />
								</Tooltip>
							)}
						</>
					),
					value: 'in_progress',
				},
				{
					label: (
						<>
							{showLoader('done') ? (
								showLoader('done')
							) : (
								<Tooltip label='Done' withArrow withinPortal>
									<Icon icon='fa6-solid:flag-checkered' />
								</Tooltip>
							)}
						</>
					),
					value: 'done',
				},
			]}
			value={classStatus}
			onChange={(value: ClassStatusSwitchProps['status']) => {
				handleClick(value)
			}}
			size='sm'
			disabled={update?.isLoading}
		/>
	)
}

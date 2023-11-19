import { Accordion, Group, useMantineTheme, Title } from '@mantine/core'
import { FetchClassStatusesResult, FetchClassesResult } from '~/lib/db/queries'
import { Icon } from '@iconify/react'
import { TagGroup } from '~/components'
import { ClassDetail } from './'

interface ClassAccordianTableProps {
	data: FetchClassesResult
	status: FetchClassStatusesResult
}

export const ClassAccordianTable = ({
	data,
	status,
}: ClassAccordianTableProps) => {
	const { colors } = useMantineTheme()
	const { classes: statusArr, id: userId } = status
	const classStatusMap = new Map(
		statusArr.map((item) => [item.id, item.status])
	)
	const statusIconColor = colors.lowlight[4]
	const statusIcon = new Map([
		[
			'not_started',
			<Icon
				key='not_started'
				icon='fa6-solid:minus'
				color={statusIconColor}
				width={20}
				height={16}
			/>,
		],
		[
			'in_progress',
			<Icon
				key='in_progress'
				icon='fa6-solid:laptop-code'
				color={statusIconColor}
				width={20}
				height={16}
			/>,
		],
		[
			'done',
			<Icon
				key='done'
				icon='fa6-solid:flag-checkered'
				color={statusIconColor}
				width={20}
				height={16}
			/>,
		],
	])

	const itemGen = (classArr: FetchClassesResult) =>
		classArr.map((item) => {
			const classStatus = classStatusMap.get(item.id) || 'not_started'

			return (
				<Accordion.Item key={item.id} value={item.id}>
					<Accordion.Control icon={statusIcon.get(classStatus)}>
						<Group position='apart'>
							{`Class ${item.classNum} - ${item.title}`}
							<TagGroup tags={item.tags} />
						</Group>
					</Accordion.Control>
					<Accordion.Panel>
						<ClassDetail
							classData={item}
							userId={userId}
							classStatus={classStatus}
							showTags={false}
							showDate={true}
						/>
					</Accordion.Panel>
				</Accordion.Item>
			)
		})

	const completedClassesArr: FetchClassesResult = []
	const uncompletedClassesArr: FetchClassesResult = []
	data.forEach((item) =>
		classStatusMap.get(item.id) === 'done'
			? completedClassesArr.push(item)
			: uncompletedClassesArr.push(item)
	)

	const uncompletedClasses = itemGen(uncompletedClassesArr)
	const completedClasses = itemGen(completedClassesArr)

	return (
		<>
			<Accordion defaultValue='in_progress'>
				<Accordion.Item value='in_progress'>
					<Accordion.Control>
						<Title order={2}>In Progress</Title>
					</Accordion.Control>
					<Accordion.Panel>
						<Accordion>{uncompletedClasses}</Accordion>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value='done'>
					<Accordion.Control>
						<Title order={2}>Completed</Title>
					</Accordion.Control>
					<Accordion.Panel>
						<Accordion>{completedClasses}</Accordion>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</>
	)
}

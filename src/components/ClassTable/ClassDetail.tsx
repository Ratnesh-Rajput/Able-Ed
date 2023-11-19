import {
	Divider,
	Group,
	Stack,
	Text,
	Anchor,
	createStyles,
	Space,
} from '@mantine/core'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { TagGroup } from '..'
import { ClassStatusSwitch } from './'
import { FetchClassesResult, FetchClassStatusesResult } from '~/lib/db/queries'
import { dateDisplay } from '~/lib'

interface ClassDetailProps {
	classData: FetchClassesResult[0]
	classStatus: FetchClassStatusesResult['classes'][0]['status']
	userId: string
	showTags?: boolean
	showDate?: boolean
}

const useStyles = createStyles((theme) => ({
	modal: {
		height: '60vh',
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
	modalClose: {
		color: theme.colors.secondary[4],
	},
	YouTube: {
		color: '#ff0000',
	},
	Twitch: {
		color: '#9146ff',
	},
	stackCenter: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	maxHalf: {
		maxWidth: '50%',
	},
}))

const ClassDetail = ({
	classData,
	classStatus,
	userId,
	showTags = true,
	showDate = false,
}: ClassDetailProps) => {
	const { classes, cx } = useStyles()
	const formattedDate = dateDisplay(classData.date)
	return (
		<>
			<Divider my='xs' />
			<Space h='md' />
			<Group position='apart'>
				{/* <Text weight={500} inline>
						Status:{' '}
					</Text> */}
				<ClassStatusSwitch
					userId={userId}
					classId={classData.id}
					status={classStatus}
				/>
				{showTags && <TagGroup tags={classData.tags} tagSize='lg' />}
				{showDate && (
					<time dateTime={classData.date.toString()}>{formattedDate}</time>
				)}
			</Group>
			<Space h='xl' />
			<Group align='flex-start' spacing='xl'>
				<Stack className={classes.maxHalf}>
					<Text weight={700}>Message:</Text>
					<Text>{classData.description}</Text>
				</Stack>
				<Stack className={cx(classes.stackCenter, classes.maxHalf)}>
					<Group>
						<Text inline weight={700}>
							Check-in:
						</Text>
						{classData.checkinTweet ? (
							<Text inline>
								<Link href={classData.checkinTweet.url} passHref>
									<Anchor target='_blank'>Click here</Anchor>
								</Link>
							</Text>
						) : (
							<Text inline>No Checkin required</Text>
						)}
					</Group>
					<Group>
						<Text inline weight={700}>
							VOD:
						</Text>
						{classData.vod ? (
							classData.vod.map((link) => (
								<Text inline key={link.url}>
									<Link href={link.url} passHref>
										<Anchor target='_blank'>
											<Icon
												icon={`fa6-brands:${link.service.toLowerCase()}`}
												className={classes[link.service]}
											/>{' '}
											{link.service}
										</Anchor>
									</Link>
								</Text>
							))
						) : (
							<Text inline>No video for this class</Text>
						)}
					</Group>
					<Group>
						<Text inline weight={700}>
							Slides:
						</Text>
						{classData.slidesUrl ? (
							<Text inline>
								<Link href={classData.slidesUrl} passHref>
									<Anchor target='_blank'>Click here</Anchor>
								</Link>
							</Text>
						) : (
							<Text inline>No slides for this class</Text>
						)}
					</Group>
				</Stack>
			</Group>
		</>
	)
}

export { ClassDetail }

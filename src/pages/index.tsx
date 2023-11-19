import {
	Button,
	Container,
	AspectRatio,
	createStyles,
	Text,
	Overlay,
	Title,
	useMantineTheme,
	Stack,
	Space,
	SimpleGrid,
} from '@mantine/core'
import classMaterialsImg from 'public/landingPage-class-materials.svg'
import stayOrganizedImg from 'public/landingpage-stay-organized.svg'
import workTogetherImg from 'public/landingpage-work-together.svg'
import stayUpToDateImg from 'public/landingpage-stay-up-to-date.svg'
import heroImage from 'public/coding-924920_1920.jpg'
// import learnTogetherLogo from 'public/learn-together.png'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SideNav } from '~/components'
import { DisabilityNav } from '~/components'

const useStyles = createStyles((theme) => ({
	bgWrap: {
		position: 'relative',
		zIndex: -1,
		overflow: 'hidden',
	},
	hero: {
		maxHeight: '400px',
	},
	title: {
		fontWeight: 700,
		maxWidth: 500,
		color: theme.colors.lowlight[4],
		fontSize: 48,
		padding: 0,
		textAlign: 'center',
	},
	titleContainer: {
		width: 'fit-content',
	},
	stack: {
		span: {
			minHeight: 275,
		},
	},
	cardImage: {
		maxHeight: 250,
	},
}))

function LandingPage() {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const { data: session } = useSession()
	const router = useRouter()

	if (session) router.push('/dashboard')
	return (
		<>
			<DisabilityNav />
			<Container size='xl'>
				<AspectRatio ratio={16 / 9} className={classes.hero}>
					<Image
						src={heroImage}
						alt='Learn Together Logo'
						className={classes.bgWrap}
						layout='fill'
						objectFit='cover'
						objectPosition='50% 50%'
					/>
					<Stack
						style={{
							top: 0,
							right: 0,
							left: 'unset',
							marginRight: '2rem',
							width: 'fit-content',
						}}
						align='flex-end'
					>
						<Title
							style={{
								display: 'inline',
							}}
							className={classes.title}
							align='left'
						>
							Learn Together with a{' '}
							<Text
								component='span'
								inherit
								variant='gradient'
								gradient={{
									from: theme.colors.highlightSecondary[8],
									to: theme.colors.secondary[6],
									deg: 180,
								}}
							>
								community!
							</Text>
						</Title>
						<Button
							variant='gradient'
							gradient={{
								from: theme.colors.highlightSecondary[7],
								to: theme.colors.secondary[8],
								deg: 135,
							}}
							onClick={() =>
								signIn(
									'discord',
									{ callbackUrl: '/dashboard' },
									{ prompt: 'consent' }
								)
							}
						>
							Sign Up and Get Started!
						</Button>
					</Stack>
					<Overlay
						zIndex={-1}
						opacity={0.6}
						gradient={`linear-gradient(90deg, ${theme.colors.primary[5]} 0%, ${theme.colors.primary[0]} 100% )`}
					/>
				</AspectRatio>
				<Space h='xl' />
				<SimpleGrid
					cols={4}
					spacing='xl'
					breakpoints={[
						{ maxWidth: 'md', cols: 2 },
						{ maxWidth: 'sm', cols: 2, spacing: 'md' },
					]}
				>
					<Stack className={classes.stack}>
						<Image
							src={classMaterialsImg}
							alt='Teacher with students'
							className={classes.cardImage}
							layout='responsive'
							// width={200}
							// height={200}
						/>
						<>
							<Title order={2}>Class Materials</Title>
							<Text>
								Easily find materials and assignments for all the classes at one
								place.
							</Text>
						</>
					</Stack>

					<Stack className={classes.stack}>
						<Image
							src={stayOrganizedImg}
							alt='Teacher with students'
							layout='responsive'
							// objectFit='contain'
							className={classes.cardImage}
							// width={200}
							// height={200}
						/>

						<>
							<Title order={2}>Stay organized</Title>
							<Text>Track and manage past-due and upcoming assignments.</Text>
						</>
					</Stack>

					<Stack className={classes.stack}>
						<Image
							src={workTogetherImg}
							alt='Teacher with students'
							layout='responsive'
							// objectFit='contain'
							className={classes.cardImage}
							// width={200}
							// height={200}
						/>

						<>
							<Title order={2}>Work together</Title>
							<Text>
								Share helpful resources, find other community members to ask for
								help, or request help for a specific topic.
							</Text>
						</>
					</Stack>

					<Stack className={classes.stack}>
						<Image
							src={stayUpToDateImg}
							alt='Teacher with students'
							layout='responsive'
							// objectFit='contain'
							className={classes.cardImage}
							// width={200}
							// height={200}
						/>

						<>
							<Title order={2}>Stay up to date</Title>
							<Text>
								Access links to class streams, Discord announcements, and
								upcoming events.
							</Text>
						</>
					</Stack>
				</SimpleGrid>
			</Container>
		</>
	)
}

export default LandingPage

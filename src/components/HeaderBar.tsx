import { Center, Group, Image, createStyles, Header } from '@mantine/core'
import { UserMenu } from './'
const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.colors.primary[6],
		padding: '0 10px',
	},
	logo: {
		marginTop: theme.spacing.sm,
		marginBottom: theme.spacing.sm,
		height: 60,
		width: 60,
	},
	searchContainer: {
		flexGrow: 1,
	},
	searchBox: {
		width: 400,
	},
}))

export const HeaderBar = () => {
	const { classes } = useStyles()

	return (
		<Header
			className={classes.header}
			height={80}
			sx={{ borderBottom: 'none' }}
		>
			<Group>
				<Image
					src='/learn-together.png'
					className={classes.logo}
					alt='logo placeholder'
					height={60}
					width={236}
				/>
				<Center className={classes.searchContainer}>
					{/* <TextInput
						aria-label='Search'
						placeholder='Search'
						rightSection={<Icon icon='tabler:search' />}
						className={classes.searchBox}
					/> */}
				</Center>
				<UserMenu />
			</Group>
		</Header>
	)
}

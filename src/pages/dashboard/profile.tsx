import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getProviders, ClientSafeProvider } from 'next-auth/react'
import { getServerSession } from '../api/auth/[...nextauth]'
import { useEffect } from 'react'
import {
	Container,
	Avatar,
	Title,
	Group,
	Grid,
	TextInput,
	Space,
	Button,
	createStyles,
} from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import { useForm, zodResolver } from '@mantine/form'
import { randomId, useShallowEffect } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { Icon } from '@iconify/react'
import { useCurrentUser } from '~/hooks'
import { FetchCurrentUserResult, fetchCurrentUser } from '~/lib/db/queries'
import { updateCurrentUserAPI } from '~/hooks'
import { CenterLoader, AccountConnectChip } from '~/components'
import { Twitter, Github, Discord } from '~/components/serviceIcons'
import {
	dehydrate,
	useMutation,
	useQueryClient,
	useQuery,
	QueryClient,
} from '@tanstack/react-query'
import superjson from 'superjson'
import { CurrentUserUpdateData } from '~/lib/db/validations'
import { z } from 'zod'

interface ConnectedAccountsProps {
	accounts: FetchCurrentUserResult['accounts']
}

const ConnectedAccounts = ({ accounts }: ConnectedAccountsProps) => {
	const { data: providers, isSuccess } = useQuery(
		['authProviders'],
		getProviders,
		{
			staleTime: 1000 * 60 * 60,
		}
	)
	const iconSize = 30
	const providerIcon = new Map([
		[
			'discord',
			<Discord key={randomId()} fontSize={iconSize} width={iconSize} />,
		],
		[
			'github',
			<Github key={randomId()} fontSize={iconSize} width={iconSize} />,
		],
		[
			'twitter',
			<Twitter key={randomId()} fontSize={iconSize} width={iconSize} />,
		],
	])

	if (isSuccess) {
		const providerChips = []
		let i = 1
		let limit = Object.keys(providers as object).length
		for (const key in providers) {
			const { id } = providers[key] as ClientSafeProvider
			const isConnected = accounts.some((item) => item.provider === id)
			const icon = providerIcon.get(id.toLocaleLowerCase())
			if (icon)
				providerChips.push(
					<AccountConnectChip
						key={randomId()}
						service={id}
						connected={isConnected}
						icon={icon}
					/>
				)
			i < limit ? providerChips.push(<Space key={id} h='sm' />) : null
			i++
		}

		return (
			<>
				<Title order={3}>Connected Acounts</Title>
				<Space h='lg' />
				{providerChips}
			</>
		)
	}
	return <CenterLoader />
}

const useStyles = createStyles((theme) => ({
	invalid: {
		color: theme.colors.secondary[4],
	},
}))

const ProfilePage = ({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) => {
	const { data, isSuccess } = useCurrentUser()
	const { classes } = useStyles()
	const queryClient = useQueryClient()
	const router = useRouter()
	const formSchema = z.object({
		name: z.string().min(1, { message: 'Field cannot be empty.' }),
		email: z.string().email({ message: 'Invalid email.' }),
	})
	const form = useForm<CurrentUserUpdateData>({
		initialValues: {
			name: '',
			email: '',
		},
		validate: zodResolver(formSchema),
		validateInputOnChange: true,
	})
	type FormValues = typeof form.values
	useShallowEffect(() => {
		if (router.query.newuser) {
			router.push('/dashboard/profile?showModal=true')
		}
		if (router.query.showModal) {
			openContextModal({
				modal: 'newUserProgress',
				title: 'Welcome!',
				innerProps: {},
			})
		}
		if (router.query.connect) queryClient.invalidateQueries(['user', 'me'])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])
	useEffect(() => {
		if (isSuccess) {
			form.setValues(data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, data])
	const dataSubmit = useMutation((formData: FormValues) =>
		updateCurrentUserAPI(formData)
	)

	const handleSubmit = (values: FormValues) => {
		try {
			// event.preventDefault()
			const formData = values
			dataSubmit.mutate(formData, {
				onSuccess: () => {
					queryClient.invalidateQueries(['user', 'me'])
					showNotification({
						id: 'profileSave',
						title: 'Saved!',
						message: 'User profile saved successully.',
						color: 'blue',
					})
				},
			})
		} catch (err) {}
	}

	const handleError = (values: FormValues) => {
		console.log(values)
		return null
	}

	if (isSuccess) {
		return (
			<Container size='lg'>
				<Group>
					<Avatar src={data.image} alt={data.name} radius='xl' size='xl' />
					<Title order={2}>{data.name}</Title>
				</Group>
				<Space h='lg' />
				<Grid columns={3}>
					<Grid.Col span={2}>
						<form onSubmit={form.onSubmit(handleSubmit, handleError)}>
							<TextInput
								label='Name'
								{...form.getInputProps('name')}
								classNames={{
									error: classes.invalid,
									invalid: classes.invalid,
								}}
							/>
							<TextInput
								label='Email'
								{...form.getInputProps('email')}
								classNames={{
									error: classes.invalid,
									invalid: classes.invalid,
								}}
							/>
							<Space h='md' />
							<Button
								color='highlightPrimary'
								type='submit'
								leftIcon={<Icon icon='fa6-solid:floppy-disk' />}
								loading={dataSubmit.isLoading}
								disabled={!form.isValid()}
								sx={{
									root: {
										marginTop: '1rem',
										paddingBottom: '1rem',
									},
								}}
							>
								{dataSubmit.isLoading ? 'Saving' : 'Save'}
							</Button>
						</form>
					</Grid.Col>
					<Grid.Col span={1}>
						<ConnectedAccounts accounts={data.accounts} />
					</Grid.Col>
				</Grid>
			</Container>
		)
	}

	return <CenterLoader />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const { req, res } = ctx
	const session = await getServerSession(req, res)
	const { id: userId } = session?.user ?? { id: '' }
	const queryClient = new QueryClient()

	if (userId) {
		await queryClient.prefetchQuery(['authProviders'], getProviders)
		await queryClient.prefetchQuery(['user', 'me'], () =>
			fetchCurrentUser(userId)
		)
		const queryState = dehydrate(queryClient)
		const serializedQueryState = superjson.serialize(queryState)

		return {
			props: {
				dehydratedState: serializedQueryState,
				session,
			},
		}
	}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}

ProfilePage.auth = { required: true }
export default ProfilePage

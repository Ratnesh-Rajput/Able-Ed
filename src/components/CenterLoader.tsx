import { Center, Loader } from '@mantine/core'

export const CenterLoader = () => {
	return (
		<Center style={{ width: '100%', height: '100%' }}>
			<Loader size='xl' />
		</Center>
	)
}

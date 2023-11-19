import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Text } from '@mantine/core'

export default function DashPage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return (
		<>
			{' '}
			{/* <Text>This is where the dashboard goes.</Text> */}
			<iframe
				src='https://www.mentalup.co/samples/game/game25?referrer=blog-brain-exercises-for-memory&page=Desktop&ga_dp=%2Fblog%2Fbrain-exercises-for-memory'
				title='description'
				width='100%'
				height='100%'
			></iframe>
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}

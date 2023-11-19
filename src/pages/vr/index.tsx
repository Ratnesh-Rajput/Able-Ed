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
				// src='https://aframe.glitch.me/'
				src='https://rahulkarda.github.io/Web-AR/'
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

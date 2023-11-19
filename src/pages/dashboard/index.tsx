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
				// src='https://online-video-material.netlify.app/'
				// src='https://www.codewithharry.com/videos/'
				src='https://rahulkarda.github.io/cwh-courses/'
				title='description'
				width='100%'
				height='100%'
				id='iframe'
			></iframe>
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}

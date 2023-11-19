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
				// src='https://stemkoski.github.io/AR-Examples/keyboard-camera-move.html'
				src='https://3d-api.si.edu/voyager/3d_package:936d1822-b237-4431-bb3f-a1f9d39a2e90'
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

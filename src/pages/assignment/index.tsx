import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Text } from '@mantine/core'

export default function AssignmentPage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return (
		<>
			{/* <Text>I am a placeholder for the Assignments page</Text> */}
			<iframe
				src='https://rahulkarda.github.io/homework-tracker/'
				width='100%'
				height='100%'
			></iframe>
		</>
	)
}

AssignmentPage.auth = {
	required: true,
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}

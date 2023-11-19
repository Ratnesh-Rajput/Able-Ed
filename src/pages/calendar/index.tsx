import { Text } from '@mantine/core'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function CalendarPage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return <>
	{/* <Text>One day, I will be a calendar.</Text> */}
	<iframe src="https://calendar.google.com/calendar/embed?src=rahulkarda2002%40gmail.com&ctz=Asia%2FKolkata" width="100%" height="100%" scrolling="no"></iframe>
	</>
	
}

CalendarPage.auth = {
	required: true,
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}

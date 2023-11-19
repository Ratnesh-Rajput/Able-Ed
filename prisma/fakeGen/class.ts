import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

interface TagConnect {
	tag: string
}

export const fakeClass = (num: number, tags: string[]) => {
	const fakeData: Prisma.ClassCreateInput[] = []
	for (let i = 0; i < num; i++) {
		const connectTags: TagConnect[] = faker.helpers
			.uniqueArray(tags, 3)
			.map((item) => {
				return {
					tag: item,
				}
			})
		const data: Prisma.ClassCreateInput = {
			title: `${faker.hacker.ingverb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}s`,
			classNum: i + 1,
			cohort: '2022',
			date: faker.date.past(1),
			description: faker.hacker.phrase(),
			tags: {
				connect: connectTags,
			},
			assignments: {},
			// checkinUrl: faker.internet.url(),
			vod: {},
		}
		fakeData.push(data)
	}
	return fakeData
}

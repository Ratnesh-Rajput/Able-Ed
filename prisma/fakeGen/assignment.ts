import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { prisma } from '../seed'
import { DateTime } from 'luxon'

const getClasses = async () => {
	const data = await prisma.class
		.findMany({
			select: {
				id: true,
				date: true,
			},
		})
		.then((x) => x)
	return data
}

export const fakeAssignment = async (num: number, tags: string[]) => {
	const fakeData: Prisma.AssignmentCreateInput[] = []
	const classes = await getClasses()
	const resource = (max: number) => {
		const limit = faker.mersenne.rand(max, 1)
		const res: Prisma.AssignResourceCreateInput[] = []
		for (let i = 0; i < limit; i++) {
			const entry = {
				title: faker.lorem.sentence(),
				url: faker.internet.url(),
				description: faker.lorem.paragraph(),
			}
			res.push(entry)
		}
		return res
	}
	for (let i = 0; i < num; i++) {
		const connectTags = faker.helpers
			.uniqueArray(tags, 3)
			.map((tag) => {
				return {
					tag,
				}
			})
			.reduce((prev, curr) => {
				return { ...prev, ...curr }
			})
		const connectClass = faker.helpers.arrayElement(classes)
		const date = DateTime.fromJSDate(faker.date.past(1))
		const resources = resource(3)
		const data: Prisma.AssignmentCreateInput = {
			name: faker.hacker.phrase(),
			description: faker.lorem.paragraph(3),
			dateAssigned: date.toJSDate(),
			dateDue: date.plus({ days: 7 }).toJSDate(),
			class: {
				connect: {
					id: connectClass.id,
				},
			},
			resources: resources,
			tags: {
				connect: {
					...connectTags,
				},
			},
		}
		fakeData.push(data)
	}
	return fakeData
}

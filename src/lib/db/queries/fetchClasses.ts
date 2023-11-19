import { Prisma } from '@prisma/client'
import { prisma } from '~/lib'
import { selectFetchClasses } from '../validations'

export type FetchClassesResult = Prisma.PromiseReturnType<typeof fetchClasses>
/**
 * It fetches all the classes from the database and returns them
 * @returns An array of objects with the following properties:
 * 	id: true,
 * 	title: true,
 * 	classNum: true,
 * 	date: true,
 * 	description: true,
 * 	materialLinks: true,
 * 	tags: true,
 */
export const fetchClasses = async () => {
	try {
		const classes = await prisma.class.findMany(selectFetchClasses)
		return classes
	} catch (err) {
		throw new Error(JSON.parse(JSON.stringify(err)))
	}
}

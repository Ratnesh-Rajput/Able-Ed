import { PrismaClient, Prisma } from '@prisma/client'
import { tags } from './seed-data'
import { fakeClass, fakeAssignment } from './fakeGen'
export const prisma = new PrismaClient()

// Seed Variables

const fakeClasses = 25
const fakeAssignments = 60

async function main() {
	console.log(`🌱  Seeding database`)

	console.info(`🌱  Tags:	Creating / Updating`)
	const allTags = []
	for (const item of tags) {
		try {
			await prisma.tag.upsert({
				where: {
					tag: item.name,
				},
				update: {
					color: item.color,
				},
				create: {
					tag: item.name,
					color: item.color,
				},
				select: {
					tag: true,
				},
			})
			console.info(`🏷  Upserted tag: ${item.name}`)
			allTags.push(item.name)
		} catch (err) {
			console.error(err)
		}
	}
	console.info(`🌱  Tags:	Complete`)

	if (process.env.DEVSEED) {
		console.info(`🌱  Seeding fake data for development...`)

		console.info('🌱  Creating Classes...')
		const classEntries = fakeClass(fakeClasses, allTags)
		let classCount = 0
		for (const entry of classEntries) {
			await prisma.class.create({
				data: entry,
			})
			console.info(
				`🎓  (${classCount + 1}/${fakeClasses})Created Class entry: ${
					entry.title
				}`
			)
			classCount++
		}
		console.info('🌱  Creating Assignments...')
		const assignmentEntries = await fakeAssignment(fakeAssignments, allTags)
		let assignmentCount = 0
		for (const entry of assignmentEntries) {
			await prisma.assignment.create({
				data: entry,
			})
			console.info(
				`📝  (${
					assignmentCount + 1
				}/${fakeAssignments})Created Assignment entry: ${entry.name}`
			)
			assignmentCount++
		}

		console.info(`🌱  Fake data completed.`)
	}
	console.log(`🌱  Seeding finished.`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		console.info('Disconnecting from db...')
		await prisma.$disconnect()
	})

import inquirer from 'inquirer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const delClasses = async () => {
	console.info('🚮 Deleting Classes...')
	await prisma.class.deleteMany({})
}
const delAssignments = async () => {
	console.info('🚮 Deleting Assignments...')
	await prisma.assignment.deleteMany({})
}

const delAuth = async () => {
	console.info('🚮 Deleting Users...')
	await prisma.user.deleteMany({})
	console.info('🚮 Deleting Accounts...')
	await prisma.account.deleteMany({})
	console.info('🚮 Deleting Sessions...')
	await prisma.session.deleteMany({})
}

async function main() {
	inquirer
		.prompt([
			{
				name: 'items',
				message: 'Select which collections to delete:',
				type: 'checkbox',
				choices: [
					{
						name: 'Classes',
						value: 'class',
					},
					{
						name: 'Assignments',
						value: 'assignment',
					},
					{ name: 'User Auth', value: 'auth' },
				],
			},
			{
				name: 'ok',
				message: 'There is no going back after this... Are you sure?',
				type: 'confirm',
				default: false,
			},
		])
		.then(async (answers) => {
			if (answers.ok) {
				if (answers.items.includes('class')) await delClasses()
				if (answers.items.includes('assignment')) await delAssignments()
				if (answers.items.includes('auth')) await delAuth()
			}
		})
}

main()

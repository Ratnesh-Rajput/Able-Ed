import { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

// if (typeof window === 'undefined') {
// 	if (process.env.NODE_ENV === 'production') {
// 		prisma = new PrismaClient({
// 			log: ['warn', 'error'],
// 		})
// 	} else {
// 		if (!global.prisma) {
// 			global.prisma = new PrismaClient({
// 				log: ['info', 'warn', 'error'],
// 			})
// 		}
// 		prisma = global.prisma

// 	}
// }
if (typeof window === 'undefined') {
	prisma =
		global.prisma ||
		new PrismaClient({
			log: ['query'],
		})

	if (process.env.NODE_ENV !== 'production') global.prisma = prisma
	// prisma.$use(async (params, next) => {
	// 	const before = Date.now()

	// 	const result = await next(params)

	// 	const after = Date.now()

	// 	console.log(
	// 		'\x1b[1mPrisma:\x1b[0m',
	// 		`query ${params.model}.${params.action} took ${after - before}ms`
	// 	)

	// 	return result
	// })
}

export { prisma }

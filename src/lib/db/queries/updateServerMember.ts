import { prisma } from '~/lib'

export const updateServerMember = async (
	userId: string,
	isServerMember: boolean
) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			serverMember: isServerMember,
		},
	})
}

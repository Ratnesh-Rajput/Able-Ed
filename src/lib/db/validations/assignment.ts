import { Prisma } from '@prisma/client'

export const assignmentSelectId =
	Prisma.validator<Prisma.AssignmentFindManyArgs>()({
		select: {
			id: true,
		},
	})

export const assignmentSelectAll =
	Prisma.validator<Prisma.AssignmentFindManyArgs>()({
		select: {
			id: true,
			dateAssigned: true,
			dateDue: true,
			name: true,
			description: true,
			resources: true,
			tags: {
				select: {
					id: true,
					tag: true,
					color: true,
				},
			},
			submitUrl: true,
		},
	})

import { Badge, Group } from '@mantine/core'

// TypeScript specific
interface TagGroupProps {
	tags: {
		tag: string
		color: string
	}[]
	noWrap?: boolean
	className?: any
	tagSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const TagGroup = ({
	tags,
	noWrap = true,
	className,
	tagSize = 'sm',
}: TagGroupProps) => {
	const tagItems = tags.map((tag) => {
		return (
			<Badge
				key={tag.tag}
				size={tagSize}
				styles={(theme) => ({
					root: {
						backgroundColor: tag.color,
					},
				})}
			>
				{tag.tag}
			</Badge>
		)
	})

	return (
		<Group spacing={5} noWrap={noWrap} className={className}>
			{tagItems}
		</Group>
	)
}

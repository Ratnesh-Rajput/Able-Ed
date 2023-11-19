type NavItem = {
	icon: string
	label: string
	url: string
}
type AuthRedirect = {
	[key: string]: string
}

export const disnav = [
	// {
	// 	icon: 'fa6-solid:star',
	// 	label: 'Roadmaps',
	// 	url: 'https://roadmaps.sh/',
	// },
	{ icon: 'fa6-solid:star', label: 'Awareness', url: 'https://rahulkarda.github.io/types-of-learning-disabilities/'},
	{ icon: 'fa6-solid:info', label: 'Info', url: '/' },
	{ icon: 'fa6-solid:book', label: 'Roadmaps', url: 'https://roadmaps.sh' },
	// { icon: 'fa6-solid:calendar-days', label: 'About', url: '' },
	
] as const

export const authRedirect = {
	signIn: '/api/auth/signin?error=SessionRequired',
	accessDenied: '/api/auth/error?error=AccessDenied',
} as const

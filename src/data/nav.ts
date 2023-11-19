type NavItem = {
	icon: string
	label: string
	url: string
}
type AuthRedirect = {
	[key: string]: string
}

export const nav = [
	{ icon: 'fa6-solid:gauge-high', label: 'Home', url: '/dashboard' },
	{ icon: 'fa6-solid:calendar-days', label: 'Calendar', url: '/calendar' },
	{ icon: 'fa6-solid:book', label: 'Assignments', url: '/assignment' },
	{ icon: 'fa6-solid:graduation-cap', label: 'Classes', url: '/class' },
	{ icon: 'fa6-solid:puzzle-piece', label: 'Games', url: '/games' },
	// { icon: 'fa6-solid:gamepad', label: 'Game2', url: '/game2' },
	{ icon: 'fa6-solid:list', label: 'TODO', url: '/todo' },
	{ icon: 'fa6-solid:vr-cardboard', label: 'VR', url: '/vr' },
	{ icon: 'fa6-solid:vr-cardboard', label: 'VR', url: '/vr2' },
	{ icon: 'fa6-solid:vr-cardboard', label: 'VR', url: '/vr3' },
] as const

export const authRedirect = {
	signIn: '/api/auth/signin?error=SessionRequired',
	accessDenied: '/api/auth/error?error=AccessDenied',
} as const

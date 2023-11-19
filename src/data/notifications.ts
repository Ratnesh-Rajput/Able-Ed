import type { NotificationProps } from '@mantine/notifications'

type NotificationKey = typeof notifyData[number][0]

const notifyData = [
	[
		'devSignIn',
		{
			id: 'devSignIn',
			title: 'Auth required',
			message: `Things may not work correctly - if this wasn't a dev environment, you'd be kicked to the SignIn page right now.`,
			color: 'red',
		},
	],
	[
		'devAccessDenied',
		{
			id: 'devAccessDenied',
			title: 'Elevated user role required',
			message: `This would normally need 'MOD' or 'ADMIN' permissions - if this wasn't a dev environment, you'd be kicked to the Access Denied error page right now.`,
			color: 'red',
		},
	],
	[
		'noSession',
		{
			id: 'noSession',
			title: 'Invalid session',
			message:
				'This action requires a valid session.\n\n Redirecting to Login...',
			color: 'red',
		},
	],
] as const

const notifyMap = new Map<string, NotificationProps>(notifyData)

export const notify = (
	key: NotificationKey,
	override: Partial<NotificationProps> = {}
) => {
	try {
		const notifyLookup = notifyMap.get(key)
		if (!notifyLookup) throw 'Not found'
		const notifyProps = Object.assign(notifyLookup, override)

		return notifyProps
	} catch (error) {
		return {
			id: key,
			title: 'ERROR',
			message:
				'There was an attempt to display a notification, but an invalid value was passed to the notifier',
			color: 'red',
		}
	}
}

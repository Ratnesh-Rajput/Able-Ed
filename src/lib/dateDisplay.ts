import { DateTime } from 'luxon'

export const dateDisplay = (
	dateInput: string | Date,
	format = 'DDDD',
	opts = {}
) => {
	const resolvedOpts = {
		...opts,
	}
	let d = dateInput
	if (typeof d === 'object' && d.toISOString) {
		d = d.toISOString()
		return DateTime.fromISO(d).toFormat(format, resolvedOpts)
	}
	if (typeof d === 'string') {
		return DateTime.fromISO(d).toFormat(format, resolvedOpts)
	}
	return 'Invalid DateTime'
}

import { useState } from 'react'
import { Calendar } from '@mantine/dates'

export const MiniCalendar = () => {
	const [month, onMonthChange] = useState(new Date())

	return (
		<Calendar month={month} onMonthChange={(month) => onMonthChange(month)} />
	)
}

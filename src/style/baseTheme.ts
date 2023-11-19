import type { MantineThemeOverride } from '@mantine/core'

/**
 * Color shades generated with: https://maketintsandshades.com/
 */

/**
 * Color palette: https://coolors.co/efede7-756cb2-ffc60a-e20742-3b3831-25201d
 */

export const baseTheme: MantineThemeOverride = {
	colorScheme: 'light',
	colors: {
		primary: [
			// Isabelline
			'#f5f4f1',
			'#f4f2ee',
			'#f2f1ec',
			'#f1efe9',
			'#efede7', // index 4 - base
			'#d7d5d0',
			'#bfbeb9',
			'#a7a6a2',
			'#8f8e8b',
			'#787774',
		],
		highlightPrimary: [
			// Blue Violet Crayola
			'#aca7d1',
			'#9e98c9',
			'#9189c1',
			'#837bba',
			'#756cb2', // index 4 - base
			'#6961a0',
			'#5e568e',
			'#524c7d',
			'#46416b',
			'#3b3659',
		],
		highlightSecondary: [
			// Mikado Yellow
			'#ffdd6c',
			'#ffd754',
			'#ffd13b',
			'#ffcc23',
			'#ffc60a', // index 4 - base
			'#e6b209',
			'#cc9e08',
			'#b38b07',
			'#997706',
			'#806305',
		],
		secondary: [
			// Crimson
			'#ee6a8e',
			'#eb517b',
			'#e83968',
			'#e52055',
			'#E20742', // index 4 - base
			'#cb063b',
			'#b50635',
			'#9e052e',
			'#880428',
			'#710421',
		],
		lowlight: [
			// Black Olive
			'#898883',
			'#76746f',
			'#62605a',
			'#4f4c46',
			'#3b3831', // index 4 - base
			'#35322c',
			'#2f2d27',
			'#292722',
			'#23221d',
			'#1e1c19',
		],
		dark: [
			// Eerie Black
			'#e9e9e8',
			'#d3d2d2',
			'#bebcbb',
			'#a8a6a5',
			'#92908e',
			'#7c7977',
			'#666361',
			'#514d4a',
			'#3b3634',
			'#25201d', // index 9 - base
		],
	},
	primaryColor: 'primary',
	primaryShade: 4,
	fontFamily: 'Roboto, sans-serif',
	headings: {
		fontWeight: '700',
	},
	cursorType: 'pointer',
	components: {
		TextInput: {
			styles: (theme) => ({
				wrapper: { maxWidth: 300 },
			}),
		},
	},
}

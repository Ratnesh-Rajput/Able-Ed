import {
	createStylesServer,
	createGetInitialProps,
	ServerStyles,
} from '@mantine/next'
import Document, {
	Head,
	Html,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document'

const getInitialProps = createGetInitialProps()
const stylesServer = createStylesServer()

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return {
			...initialProps,
			styles: [
				initialProps.styles,
				<ServerStyles
					html={initialProps.html}
					server={stylesServer}
					key='styles'
				/>,
			],
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=optional'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

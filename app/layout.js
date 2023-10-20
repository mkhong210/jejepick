import Context from './components/Context'
import BtmNavi from './components/common/BtmNavi'
import Header from './components/common/Header'
import './globals.scss'
import './reset.scss'

export const metadata = {
	// title: 'Create Next App',
	// description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>JEJEPICK</title>
				<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" rel="stylesheet" type="text/css" />
				<link rel="icon" type="image/png" href="/asset/common/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/asset/common/favicon-16x16.png" sizes="16x16" />
			</head>
			<body>
				<div className='jejepick'>
					<Context>
						<Header />
						<main id='main' className='no'>
							{children}
						</main>
						<BtmNavi />
					</Context>
				</div>
			</body>
		</html>
	)
}

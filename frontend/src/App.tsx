import React, { FC } from 'react'
import Header from './Component/Header/Header'
import Main from './Component/Main/Main'
import Footer from './Component/Footer/Footer'

const App: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
			<Footer />
		</div>
	)
}

export default App

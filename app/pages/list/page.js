import React from 'react'
import style from './list.module.scss'

function Page() {
	useEffect(() => {
    const head = document.getElementsByClassName(`header`);
		head[0].classList.add(style.hidden);
    const btm = document.getElementsByClassName(`bottom`);
		btm[0].classList.add(style.hidden);
  }, []); 

	return (
		<>
			<div>page</div>
		</>
	)
}

export default Page
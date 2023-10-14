import React from 'react'
import style from '../../pages/list/list.module.scss'
import ListItem from './ListItem'

function List() {
	return (
		<>
			<ul className={style.list+` inner`}>
				<li className={style.list_item}>
					<ListItem />
				</li>
				<li className={style.list_item}>
					<ListItem />
				</li>
				<li className={style.list_item}>
					<ListItem />
				</li>
			</ul>
		</>
	)
}

export default List
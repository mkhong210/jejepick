import React from 'react'
import style from '../../pages/list/list.module.scss'
import ListItem from './ListItem'
import Link from 'next/link'

function List({bestlist}) {

	if (!bestlist) {
		return <div>Loading...</div>;
	}
	
	console.log(bestlist);

	// axios.get('/api/visit')
	// .then(response => {
	// 	const filteredJejuData = response.data;
	// 	// 이 데이터를 상태로 설정하거나 다른 곳에서 사용
	// })
	// .catch(error => {
	// 	console.error('Failed to fetch data:', error);
	// });

	return (
		<>
			<ul className={style.list}>
				<li className={style.list_item}>
					<Link href='#' className='item_wrap'>
						<div className='img_wrap'>
							<img src='/asset/common/item_example_thum.jpg'></img>
						</div>
						<div className='text_wrap'>
							<p>똘똘이 국밥집</p>
							<button className='like'>
								<img src='/asset/common/Icon_favorite.svg' />
							</button>
						</div>
					</Link>
				</li>
				<li className={style.list_item}>
					<Link href='#' className='item_wrap'>
						<div className='img_wrap'>
							<img src='/asset/common/item_example_thum.jpg'></img>
						</div>
						<div className='text_wrap'>
							<p>똘똘이 국밥집</p>
							<button className='like'>
								<img src='/asset/common/Icon_favorite.svg' />
							</button>
						</div>
					</Link>
				</li>
				<li className={style.list_item}>
					<Link href='#' className='item_wrap'>
						<div className='img_wrap'>
							<img src='/asset/common/item_example_thum.jpg'></img>
						</div>
						<div className='text_wrap'>
							<p>똘똘이 국밥집</p>
							<button className='like'>
								<img src='/asset/common/Icon_favorite.svg' />
							</button>
						</div>
					</Link>
				</li>
			</ul>
		</>
	)
}

export default List
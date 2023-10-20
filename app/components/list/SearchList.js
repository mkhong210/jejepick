"use client"
import React, { useEffect, useState } from 'react'
import './listitem.scss'
import Link from 'next/link'
import Heart from '../Heart';
import style from '../../pages/list/list.module.scss'



export default function SearchList({searchedData}) {

    const [sData, setSData] = useState([]);
    useEffect(()=>{
        setSData(searchedData)
    },[searchedData])

        return (
        <>
			<ul className={style.total_list}>
            {
                searchedData.map((v,k)=>(
                    <li key={k} className={style.total_item}>
                        <Link href={`/pages/list/${v.contentsid}`} className='item_wrap'>
                            <div className='img_wrap'>
                                <img src={v?.repPhoto?.photoid?.thumbnailpath} alt={v.title} />
                            </div>
                            <div className='text_wrap'>
                                <p>{v.title}</p>
                                <Heart dataId={v.contentsid} />
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>    
        </>
    )
}

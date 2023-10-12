"use client"

import { useEffect, useState } from "react"
// import { contact } from "../lib/contact"; 
import axios from 'axios';



export default function Test() {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    async function getData() {
        const result = await axios.get('/api');
        const newData = result.data.items
        setData(newData);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    async function insert(e) {
        e.preventDefault();
        // const load = await axios.get('http://localhost:3000');
        // const newData = load.data;
        // setData(newData);

        // let msg = e.target.msg.value;

        // let k = data.filter(n => n.mntnnm === msg)
        // if (k != undefined) {
        //     setData(k)
        //     if (k.length != 1) {
        //         setSlideEa(k.length >= 3 ? 3 : 2)
        //     } else {
        //         setSlideEa(1)
        //     }
        // } else {
        //     alert('잘못된 키워드입니다')
        // }
    }

    console.log(data)

    // if(!data.length){
    //     return <>loading.....</>
    // }
    if (loading) {
        return <div>로딩 중...</div>;
    }
    return (
        <>


            <h1>Test</h1>

            <div>
                {/* <div>Q1. 도심? 바다?</div>
            <div>도심</div>
            <div>바다</div> */}

                <form>
                    <h1>Q1. 도심? 바다?</h1>
                    <input type="radio" name="company" value="google" />도심
                    <input type="radio" name="company" value="naver" />바다
                </form>

                <button>돌아가기버튼</button>
                <button onClick={insert}>다음버튼</button>
            </div>
            {data.map((v, k) => (
                <li key={k}>
                    {/* <figure>
                        <img src={v.mntnattchimageseq} alt='Img' onError={(e) => {
                            e.target.src = '/Mountain/mountain4.jpg';
                        }}></img>
                    </figure> */}
                    <p>{v.title}</p>
                    <p>{v.address}</p>
                    <p>{v.alltag}</p>
                </li>
            ))
            }

        </> 
    )
}

"use client"
import testdb from "../../testdb/data.json"
import style from '../pages/personal-test/personalTest.module.scss'
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function Test() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [jsondata, setJsondata] = useState(testdb);
    const [loading, setLoading] = useState(true);

    const [num, setNum] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);

    async function getData() {
        const result = await axios.get('/api/visit');
        const newData = result.data.items
        setData(newData);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    //키워드 2개 필터링
    function filter(e) {
        e.preventDefault();
        
        let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes('잡화') && obj.alltag.includes('제주시내')) : [];
        console.log(filteredData);
        setData(filteredData)
    }
    
    //다음 질문으로 이동
    const next = () => {
        if (num < jsondata.length - 1) {
            setNum(num + 1);
            setSelectedOptions(jsondata[0].questions,...selectedOptions)
        } else {
            router.push("/pages/personal-result")
        }
    };

    console.log(data)
    
    const aaa = (keyword)=>{
        console.log(keyword)
    }

    if (loading) {
        return <div>로딩 중...</div>;
    }
    return (
        <>
            
        <div className={style.jejepick}>
            <button onClick={next}>다음</button>
            <h2>{jsondata[num].questions}</h2>
            <p>{num+1}/5</p>
            <ul>
                <li>
                    {
                        jsondata[num].options.map((info)=>(
                            <figure onClick={e=>{aaa(info[2])}}>
                                <img src={info[0]} />
                                <figcaption>{info[1]}</figcaption>
                            </figure>
                        ))
                    }
                
                </li>
            </ul>
        </div>

        </> 
    )
}
"use client"
import testdb from "../../testdb/data.json"
import style from '../pages/personal-test/personalTest.module.scss'
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from "next/navigation";
//import Result from "./Result";

export default function Test() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [jsondata, setJsondata] = useState(testdb);
    const [loading, setLoading] = useState(true);

    const [num, setNum] = useState(0);
    const [option, setOption] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]);   

    async function getData() {
        const result = await axios.get('/api/visit');
        const newData = result.data;
        setData(newData);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    console.log(data);

    //키워드 2개 필터링
    function filter(e) {
        e.preventDefault();
        
        let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes('잡화') && obj.alltag.includes('제주시내')) : [];
        console.log(filteredData);
        setData(filteredData)
    }
    
    //다음 질문으로 이동
    const next = () => {
        if(option){
            if (num < jsondata.length - 1) {
                setNum(num + 1);
                setSelectedOptions([option,...selectedOptions]);
                setOption('')

            } else {
                setSelectedOptions([option,...selectedOptions]);
                router.push("/pages/personal-result");
            }
        }else{
            alert('문항을 알맞게 선택해주세요')
        }
    };
    console.log(option);
    console.log(selectedOptions)
    
    const word = (keyword)=>{
        setOption(keyword.target.parentElement.getAttribute("data-keyword"));
        keyword.currentTarget.classList.toggle(`${style.active}`);
    }

    if (loading) {
        return <div>로딩 중...</div>;
    }
    return (
        <>
        {/* <Result selectedOptions={selectedOptions} />     */}
        <div className={style.jejepick}>
            <div className={style.testbeforeback}></div>
            <div className={style.test}></div>
            <div className={style.testcon}>
                <div className={style.mar + ` inner`}>
                    <div className={style.testcontop}>
                        <div className={style.testque}>
                            <div>
                                <img src='/asset/image/test/testingmarker.svg'></img>
                                <h2>{jsondata[num].questions}</h2>
                            </div>
                            <p>{num+1}/5</p>
                        </div>
                        <div className={style.ing}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="602" height="14" viewBox="0 0 602 14" fill="none">
                                <path d="M7 7L595 7.00005" stroke="#FFF8D9" stroke-width="13" stroke-linecap="round"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width={124 + (120*num)} height="14" viewBox={`0 0 ${134 + (120*num)} 14`} fill="none">
                                    <path d={`M7 7L${125 + (120*num)} 7.00001`} stroke="#FFE668" stroke-width="13" stroke-linecap="round"/>
                                </svg>
                            </svg>
                        </div>
                    </div>
                    <ul>
                        <li>
                            {
                                jsondata[num].options.map((info,k)=>(
                                    <figure key={k} 
                                    onClick={word} data-keyword={info[2]} className={option === info[2] ? style.active : ""}>
                                        <div>
                                            <img src={info[0]}/>
                                        </div>
                                        <figcaption>{info[1]}</figcaption>
                                    </figure>
                                ))
                            }
                        
                        </li>
                    </ul>
                    <div>
                        <button className={style.next} onClick={next}>다음</button>
                    </div>
                </div>
                <div className={style.testbottom}></div>
            </div>
        </div>

        </> 
    )
}
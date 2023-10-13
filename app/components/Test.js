"use client"

import { useEffect, useState } from "react"
// import { contact } from "../lib/contact"; 
import axios from 'axios';


export default function Test() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const questions = ["질문 1", "질문 2", "질문 3", "질문 4", "질문 5"];
    const images = ["", "", "", "", "","","",""];
    const options = [{ option1 : "체험", option2 : "힐링", option3 : "오름", option4 : "문화유적지" }, { option1 : "해변", option2 : "안해변" }, { option1 : "반려동물", option2 : "안반려동물" }, { option1 : "시내", option2 : "외곽" }, { option1 : "뚜벅", option2 : "주차장" }];
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

    //키워드 2개 포함 로직
    function insert(e) {
        e.preventDefault();
        // const load = await axios.get('http://localhost:3000');
        // const newData = load.data;
        // setData(newData);

        // let msg = e.target.msg.value;
        // let k =data ? data.filter(n => n.alltag.includes('체험') ) : [];
        // let k = data ? data.filter(obj => obj.alltag && obj.alltag.includes('제주시내')) : [];
        let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes('잡화') && obj.alltag.includes('제주시내')) : [];
        console.log(filteredData);
        setData(filteredData)
    }
    
    //다음 질문으로 이동
    const next = () => {
        if (num < questions.length - 1) {
            setNum(num + 1);
        } else {
          // 테스트 종료 또는 결과 페이지로 이동
        }
    };

    console.log(data)
    
    if (loading) {
        return <div>로딩 중...</div>;
    }
    return (
        <>
            
        <div>
            <h2>{questions[num]}</h2>
            <h2>{options[num].option1}</h2>
            <h2>{options[num].option2}</h2>
        </div>

        <button onClick={next}>다음버튼</button>

        </> 
    )
}

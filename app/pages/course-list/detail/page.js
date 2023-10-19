"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from './courseList_id.module.scss'
import { useSearchParams } from "next/navigation";

export default function Home() {

//======================전 페이지에서 코스 가져오기==================
    // course-list에서 데이터 가져오기
    const param = useSearchParams()
    const idString = param.get('id')
    const idArray = JSON.parse(idString);
    
    const [apiData, setApiData ] = useState();


     // 제주 리스트 api에서 데이터 가져오기
    useEffect(()=>{
        axios.get('/api/visit')
        .then((response) => {
            setApiData(response.data);
        })
    },[])
    
    /* let finaldata = null; */

    useEffect(()=> {
        if(apiData && idString){
            const finaldata = apiData.filter((item) => idArray.includes(item.contentsid));
        }
        /* finaldata(); */
    },[apiData,idString])


//===================전 페이지에서 코스 가져오기===========






//======================경유지 관련 코드 =========================    
    
    const loadMap = {
        "origin": {
            "x": "127.11024293202674",
            "y": " 37.394348634049784"
        },
        "destination": {
            "x": "127.10860518470294",
            "y": "37.401999820065534"
        },
        "waypoints": [
            {
                "name": "name0",
                "x": 127.11341936045922,
                "y": 37.39639094915999
            }
        ],
        "priority": "RECOMMEND",
        "car_fuel": "GASOLINE",
        "car_hipass": false,
        "alternatives": false,
        "road_details": false
    }
    
    const map = useRef();
    const REST_API_KEY = '6ded06fd9b620e77bf2e95a12ec6f927';
    
    const url = `/api/map?origin=${loadMap.origin.toString()}&destination=${loadMap.destination}&waypoints=${loadMap.waypoints.join('#')}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

  //지도 API
  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
    document.head.appendChild(kakaoMapScript)

    var _map;


    const onLoadKakaoAPI = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('maps')
            const options = {
                center: new window.kakao.maps.LatLng(33.3846, 126.5535),
                level: 10,
            };
            _map = new window.kakao.maps.Map(container, options)     
        })
    }
    
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
 
    
    


    axios.post('/api/map',{loadMap})
    .then(arg => {
        setTimeout(()=>{
            let {sections} = arg?.data?.routes[0];
            console.log(arg)
            if(sections[0]){
                /* 최단거리 찾아주는 함수 */
                let {guides : arrays, roads} = sections[0];  
                let detailRoads = [];
                for(let i=0;i < roads.length;i++){
                    let arg = roads[i];
                    let mini = arg.vertexes;
                    let cursor = 0;
                    while(cursor < mini.length){
                        let obj = new kakao.maps.LatLng(mini[cursor+1], mini[cursor]);
                        detailRoads.push(obj);
                        cursor = cursor + 2;
                        if(cursor >= 1000000) break;
                    }                             
                }
                arrays = arrays.map( (arg, idx)=>{
                    let{x, y}  = arg;
                    if(x && y){
                        arg.position = new kakao.maps.LatLng(arg.y, arg.x);
                    }
                    return arg;
                });

                

                //경유지 가지고 오기
                /* const waypointCoordinates = waypoints.split(',').map(coord => coord.trim());
                const waypointLatLng = waypointCoordinates.map(coord => {
                    const [lng, lat] = coord.split(',').map(c => c.trim());
                    return new kakao.maps.LatLng(lat, lng);
                  });               
                 */

                // 경유지 마커 추가
                /* waypointLatLng.forEach((waypoint, index) => {
                    const waypointMarker = new kakao.maps.Marker({
                    position: waypoint,
                    map: _map,
                    title: `경유지 ${index + 1}`
                    });
                }); */

                
                    /* 출발지 마커 */
                let { title, position} = arrays[0];
                // 마커 이미지의 이미지 크기 입니다
                let imageSize = new kakao.maps.Size(24, 35);
                // 마커 이미지를 생성합니다    
                let image = new kakao.maps.MarkerImage('/asset/image/map/ICON_starting_pin.svg', imageSize);
                // 마커를 생성합니다
                let marker1 = new kakao.maps.Marker({
                    map: _map, // 마커를 표시할 지도
                    position,
                    title: title? title : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image // 마커 이미지 
                });


                    /* 도착지 마커 */
                let {title : title2, position : position2} = arrays[arrays.length-1];
                // 마커 이미지의 이미지 크기 입니다
                // 마커 이미지를 생성합니다    
                let image2 = new kakao.maps.MarkerImage('/asset/image/map/ICON_final_pin.svg', imageSize);
                // 마커를 생성합니다
                let marker2 = new kakao.maps.Marker({
                    map: _map, // 마커를 표시할 지도
                    position : position2,
                    title: title2? title2 : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : image2 // 마커 이미지 
                });          
                
                
                /* 도착지 마커 */
                let {title : title3, position : position3} = arrays[arrays.length-1];
                // 마커 이미지의 이미지 크기 입니다
                // 마커 이미지를 생성합니다    
                let image3 = new kakao.maps.MarkerImage('/asset/image/map/ICON_final_pin.svg', imageSize);
                // 마커를 생성합니다
                let marker3 = new kakao.maps.Marker({
                    map: _map, // 마커를 표시할 지도
                    position : position2,
                    title: title2? title2 : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : image2 // 마커 이미지 
                });          
                
                    
                // 지도에 표시할 선을 생성합니다
                let polyline = new kakao.maps.Polyline({
                    //path: arrays.map( arg=> arg.position), // 선을 구성하는 좌표배열 입니다
                    path : detailRoads,
                    strokeWeight: 3, // 선의 두께 입니다
                    strokeColor: 'rgb(255,163,102)', // 선의 색깔입니다
                    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid' // 선의 스타일입니다
                });

                // 지도에 선을 표시합니다 
                polyline.setMap(_map);                      

                let customOverlay = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(33.3846, 126.5535),
                   /*  content: `<div class ="label">거리, 시간 : ${distance}, ${duration}</div>` */
                });

                // 커스텀 오버레이를 지도에 표시합니다
                customOverlay.setMap(_map);
            }
        },2000);
    }).catch(err => {
        console.log(err)
    });

},[])

//======================경유지 관련 코드 =========================

  return (
    <div className={style.main}>
      <div id="maps" style={{ width: '100%', height: '370px' }}></div> 

    <div className={style.frame}>
        <p>내가만든 제일 좋은 여행 코스!</p>
        <div className={style.title}>
            <img src=""></img>
            <h1>노진구{/* 닉네임 들어갈예정 */}의 1일차 여행 코스</h1>
        </div>

        <div className={style.sec1}>
            
            <span></span>

            <div className={style.sec2}>
                <p>
                    도라에몽의 음식점{/* 이름 들어갈 예정*/}
                </p>
                <span></span>
                <p>
                    {/* 가게의 라벨 들어갈예정 */}
                </p>
            </div>
        </div>
    </div>



    </div>
  );
}


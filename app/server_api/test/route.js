import { queryExecute } from "../db";

//req.quert=객체로 매개변수의 값을 가져온다.

export async function GET(req){
    const profile=req.nextUrl.searchParams.get('profile');
    console.log(profile);
    
    const data = await queryExecute('SELECT * from tendency_table where profile=?',[profile]);
    //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!
    return Response.json(data);
}


/* 
    1. 로컬스토리지에 저장된 아이디를 이용해서 데이터를 가져옴
    2. 데이터를 가져올 때 ( 데이터를 넣진 않음 ) axios.get 사용 route에는 get만
    3. 사용 조건으로 profile= ? ,[로컬 값] 하면 프로필 과 관련된 정보들만 받아옴

*/
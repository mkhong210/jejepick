import { queryExecute } from "../db";
export async function POST(req){
    const {coursename,item_id,profile} = await req.json();
    const data = await queryExecute(`insert into coursetable (coursename,item_id,profile) values (?,?,?)`,[coursename,
        JSON.stringify(item_id),profile]);
    //데이터를 넣는법 
    return Response.json([]);
    
}

export async function GET(req){
    const profile=req.nextUrl.searchParams.get('profile');
    console.log(profile);
    
    const data = await queryExecute('SELECT * from coursetable where profile=?',[profile]);
    //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!
    return Response.json(data);
}


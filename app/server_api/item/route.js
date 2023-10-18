import { queryExecute } from "../db";
export async function POST(req){
    const {contentsid,profile} = await req.json();
    console.log(contentsid,profile)
    const data = await queryExecute(`insert into itemtable (contentsid,profile) values (?,?)`,[contentsid,profile]);
    //데이터를 넣는법
    return Response.json([]);
}


export async function GET(req){
    const profile=req.nextUrl.searchParams.get('profile');
    console.log(profile);
    
    const data = await queryExecute('SELECT * from itemtable where profile=?',[profile]);
    //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!
    return Response.json(data);
}


export async function DELETE(req){
    const {contentsid,profile} = await req.json();
    const data = await queryExecute('DELETE FROM itemtable where contentsid = ? AND profile = ?',[contentsid,profile]);
    return Response.json([]);
}

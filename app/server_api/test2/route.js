import { queryExecute } from "../db";

export async function GET(req){
    //const data = await queryExecute('SELECT * from tendency_table') //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!

    const data = req.nextUrl.searchParams.get('id');

    const info = await queryExecute('SELECT * from tendency_table where profile=?',[data])

    return Response.json(info);
}
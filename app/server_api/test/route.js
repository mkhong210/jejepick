export async function GET(req){
    const data = await queryExecute('SELECT * from jejumembership') //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!
    return Response.json(data);
}
export async function POST(req,{params}){
    const {keyword,tendency,image,tag,contents,types,types_img} = await req.json();
    console.log(keyword,tendency,image,tag,contents,types,types_img);
    const q = await queryExecute(`insert into tendency_table (keyword,tendency,image,tag,contents,types,types_img) values(?, ?, ?, ?, ?, ?, ?)`,[keyword,tendency,image,tag,contents,types,types_img])

    return Response.json([]);
}
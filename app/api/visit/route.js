import axios from "axios";

export async function GET(){

    const jj = axios.create({
        baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchList',
        params: { 
            apiKey: 'nn3u13ncqicdt5o0',
            locale: 'kr'
        }
    })
    
    const jeju = await jj.get();
    const jejuData = jeju.data;

    return Response.json( jejuData );
}

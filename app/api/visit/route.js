import axios from "axios";

export async function GET(){
    
    const jj1 = axios.create({
        baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchList',
        params: { 
            apiKey: 'nn3u13ncqicdt5o0',
            locale: 'kr'
        }
    })
    
    let jejuData = [];
    for(let i=1;i<10;i++){
        const jeju1 = await jj1.get('/',{params:{page:i}});
        jejuData.push(...jeju1.data.items)
    }

    let jejuDataFilter = ['숙박','관광지','음식점']
    
    const filteredJejuData = jejuData.filter(item => jejuDataFilter.includes(item.contentscd.label));
    
    return Response.json( filteredJejuData );
}
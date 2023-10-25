import axios from 'axios';
export async function GET(req) {
	// 경로탐색 관련 맵
	const param = req.url.split('?')[1];

	// RESTAPI 키 
	const REST_API_KEY = '59d0e2ff6419b9a8f970c7409a781500';
	const url = `https://apis-navi.kakaomobility.com/v1/directions?${param}`;
	const map = await axios(url, {
		headers: {
			Authorization: `KakaoAK ${REST_API_KEY}`
		}
	});

	return Response.json(map.data);
}

export async function POST(req) {
	const d = await req.json();

	// RESTAPI 키 
	const REST_API_KEY = '59d0e2ff6419b9a8f970c7409a781500';
	const url = `https://apis-navi.kakaomobility.com/v1/waypoints/directions`;
	const map = await axios({
		method: 'post',
		url: url,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `KakaoAK ${REST_API_KEY}`
		},
		data: d.loadMap
	});

	return Response.json(map.data);
}
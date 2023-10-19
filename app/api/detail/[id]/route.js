export async function GET({params}) {
	console.log(params)
	// const profile = req.nextUrl.searchParams.get('profile');
	const detailData = axios.create({
		baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchList',
		params: {
			apiKey: 'nn3u13ncqicdt5o0',
			locale: 'kr'
			// cid: {params}
		}
	})

	return Response.json(detailData);
}
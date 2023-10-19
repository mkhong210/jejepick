import React, { useEffect, useState } from 'react'
import style from '../../pages/list/[id]/page.module.scss'
import { useParams } from "next/navigation";
import axios from "axios";
import Heart from "@/app/components/Heart";
import Loading from '../loading/Loading';

function Detail() {
	const [data, setData] = useState();
	const [tagData, setTagData] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const paramId = params.id;

	// const result = await axios.get(`/server_api/personal_result?profile=${loginID}`)
	// const result = await axios.get(`/api/detail/${paramId}`, { id: paramId });

	async function getData(paramId) {
		const result = await axios.get(`/api/detail?detailId=${paramId}`);
		const newData = result.data;
		setData(newData);
		// console.log(newData.tag)
		setTagData(newData.tag.split(","));
		setLoading(false);
	}

	useEffect(() => {
		getData(paramId);
	}, [])

	if (loading) {
		return <><div><Loading /></div></>;
	}

	return (
		<>
			<div className={style.contents_1 + ` inner`}>
				<ul className={style.contents_1_text}>
					<li>{data.region1cd.label}</li>
					<li>
						<p>
							{data.title} <span>| {data.contentscd.label}</span>
						</p>
						<p>
							찜하기
							<Heart dataId={data.contentsid} />
						</p>
					</li>
				</ul>
				<div className={style.contents_1_detail_img}>
					<img src={data.repPhoto.photoid.imgpath} />
				</div>
			</div>
			<div className={style.contents_1_address_back}>
				<ul className={style.contents_1_address + ` inner`}>
					<li>
						<img src="/asset/image/list/ICON_list_address.svg" />
						<p>주소</p>
						<p>{data.roadaddress}</p>
					</li>
					<li>
						<img src="/asset/image/list/ICON_list_phone.svg" />
						<p>전화번호</p>
						<p>{data.phoneno}</p>
					</li>
					<li>
						<img src="/asset/image/list/ICON_list_desc.svg" />
						<p>설명</p>
						<p>“{data.introduction}”</p>
					</li>
					<li>
						{
							tagData.map((item) => (
								<span>{item}</span>
							))
						}
					</li>
				</ul>
			</div>
			<div className={style.contents_2 + ` inner`}>
				<div className={style.contents_2_map + ` inner`}></div>
			</div>
		</>
	)
}

export default Detail
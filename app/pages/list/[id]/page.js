import React from "react";
import style from "./page.module.scss";

function page() {
  return (
    <>
      <div className={style.contents_1 + ` inner`}>
        <ul className={style.contents_1_text}>
          <li>서귀포시</li>
          <li>
            <p>
              명문가시리식당 <span>| 음식점</span>
            </p>
            <p>
              찜하기
              <img src="/asset/common/Icon_favorite.svg" />
            </p>
          </li>
        </ul>
        <div className={style.contents_1_detail_img}>
          <img src="/asset/image/list/sample_img.jpg" />
        </div>
      </div>
      <div className={style.contents_1_address_back}>
        <ul className={style.contents_1_address + ` inner`}>
          <li>
            <img src="/asset/image/list/ICON_list_address.svg" />
            <p>주소</p>
            <p>제주 서귀포시 어쩌구로 2323 -12</p>
          </li>
          <li>
            <img src="/asset/image/list/ICON_list_phone.svg" />
            <p>전화번호</p>
            <p>064-787-1121</p>
          </li>
          <li>
            <img src="/asset/image/list/ICON_list_desc.svg" />
            <p>설명</p>
            <p>“몸국이 인기인 한식당전문점 명문가시리식당”</p>
          </li>
          <li>
            <span>서귀포시</span>
            <span>서귀포시</span>
            <span>몸국</span>
            <span>고기국수</span>
          </li>
        </ul>
      </div>
      <div className={style.contents_2 + ` inner`}>
        <div className={style.contents_2_map + ` inner`}></div>
      </div>
    </>
  );
}

export default page;

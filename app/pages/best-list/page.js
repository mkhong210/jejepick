import React from "react";
import style from "./best.module.scss";

function page() {
  return (
    <>
	 <div className={style.contents_bestlist_back}>
      <div className={style.contents_profile + ` inner`}>
        <div className={style.contents_profile_img}>
          <div>
            <img src="/asset/image/test/TEST_character4.png" />
          </div>
        </div>
        <ul className={style.contents_profile_txt}>
          <li>
            <p>'계획대로 되고있어' 천혜향</p>
          </li>
          <li>
            <b>김혜수님</b>
          </li>
          <li>
            <span>계획적</span>
            <span>활동적</span>
            <span>열정</span>
          </li>
        </ul>
      </div>
	  <div className={style.contents_bestlist_txt + ` inner`}>
          <p>제제픽의 맞춤 여행지!</p>
          <p>이런 여행지는 어떠신가요?</p>
        </div>
	  </div>
        
      <div className={style.contents_bestlist_back2}>
        <div className={style.contents_bestlist + ` inner`}>
			숙소 맞집 명소 추천리스트 쭉 ~~~
		</div>
      </div>
    </>
  );
}

export default page;

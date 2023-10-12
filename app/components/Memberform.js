"use client";
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MypageMemberCheck from './MypageMemberCheck';
import Link from 'next/link';

function Memberform() {


    const [account,setAccount]=useState('');//아이디
    const [accountMessage,setAccountMessage]=useState('');//중복 확인 메시지
    const onClickAccount = async () => {
        const response = await axios.get(`/api`);
        const userData  = response.data;
        //존재하는 아이디들을 배열로 추출
        const a = userData.map(item => item.id); 
        if (a.includes(account)) {
            setAccountMessage('이 아이디는 이미 사용 중입니다.');
            console.log('이 아이디는 이미 사용 중입니다.');
        } 
        else {
            setAccountMessage('이 아이디는 사용 가능합니다.');
            console.log('이 아이디는 사용 가능합니다.');
            
        }
        if (account.length===0){
            setAccountMessage('아이디는 필수 정보입니다')
            console.log('아이디는 필수 정보입니다')
        }
      }
      // 아이디 입력 필드 값이 변경될 때 호출되는 함수
    const handleAccountChange = (e) => {
        const interId = e.target.value;
        setAccount(interId);
    };
    /* const onClickAccount=(e)=>{
        if(!account.test(setAccount)){
            setAccountMessage('이 아이디는 사용불가능 합니다')
        }else{
            setAccountMessage('이 아이디는 이미 사용중 입니다')
        }
    } */
    const [password, setPassword] = useState(''); // 비밀번호
    const [passwordCheck,setPasswordCheck]=useState('');//비밀번호 확인
    const [passwordError,setPasswordError]=useState('');//오류메시지 저장
    const [ispassword,setIsPassword]=useState(false);//유효성 검사
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)//비밀번호 유효성 검사2
    const [passwordMessage, setPasswordMessage] = useState(''); // 비밀번호 유효성 메시지
    const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); // 비밀번호 확인 메시지

    //비밀번호 입력
    const onChangePassword=(e)=>{  
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$/
        const passwordCurrent=e.target.value;
        setPasswordError(passwordConfirm !== passwordCurrent) 
        setPasswordCheck(passwordCurrent)
        if (!passwordRegex.test(passwordCurrent)) { //입력값이 정규식이랑 다르면 
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8-15자리로 입력해주세요!')
            setIsPassword(false)
          } else {
            setPasswordMessage('안전한 비밀번호에요 : )')
            setIsPassword(true)
          }
          setPassword(passwordCurrent); //비밀번호에 입력값을 넣음
    }
     // 비밀번호 확인
    const onChangePasswordConfirm = useCallback((e) => {
        const passwordConfirmCurrent = e.target.value;
        setPasswordConfirm(passwordConfirmCurrent);
        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호가 일치해요. :)');
            setIsPasswordConfirm(true);
        } else {
            setPasswordConfirmMessage('비밀번호가 일치하지 않아요. 다시 확인해주세요.');
            setIsPasswordConfirm(false);
        }
    }, [password]);
 
    const nv= useRouter();
    const insertFn = (e)=>{
        e.preventDefault();
        const formdata =new FormData(e.target);
        const values=Object.fromEntries(formdata);
        /* const values1=Object.fromEntries(formdata);
        console.log(values);
        axios.get('/api',values1) */
        axios.post('/api',values)
        nv.push('./pages/mypage');
    }
  return (
    <div className='membershipform'>
        <div className='header'>
            <img src=''></img>
            <h2>회원가입</h2>
        </div>
        <div className='MScontents'>
            <img src=''></img>
            <p>가입을 통해 제제픽의 서비스를 만나보세요!</p>
        </div>
        <form onSubmit={insertFn}>
            <div className='IDcontents'>
                <b>아이디</b>
                <input type='text' name='id' placeholder='아이디를 입력해주세요'  onChange={handleAccountChange} className='IDinput' required/>
                <input type='button' name='accountcheck' value='아이디 중복 확인' onClick={onClickAccount} className='IDduplication' />
                <p>{accountMessage}</p>
            </div>
            <div className='PWcontents'>
                <b>비밀번호</b>
                <input type='password' name='pw' placeholder='영어 대소문자,숫자 조합의 8-15자' defaultValue={passwordCheck} onChange={onChangePassword} id='pw1' className='PWinput' required/>
                {
                    password.length>0 &&(
                        <span>
                            {passwordMessage}
                        </span>
                    )
                }
            </div>
            <div>
                <p>비밀번호 재확인</p>
                <input type='password' name='pw_rec' placeholder='비밀번호를 한번 더 입력해주세요' id='pw2'onChange={onChangePasswordConfirm} className='PWreinput' required
                />
                <p>{passwordConfirmMessage}</p>
                <p>{isPasswordConfirm}</p>

            </div>
            <div className='Namecontents'>
                <p>이름</p>
                <input type='text' name='name' placeholder='이름을 입력해주세요' className='nameInput' required/>
            </div>
            <div className='Numbercontents'>
                <p>휴대폰번호</p>
                <input type='number' name='number' placeholder='하이픈을 제외한 숫자만 입력해주세요' className='numberInput' required/>
            </div>
            <div className='Membershipbtn'>
                <p>제주도로 떠나볼까요?</p>
                <input type='submit' name='Login' className='membershipbtn' value='회원가입'/>
            </div>
        </form>
    </div>
  )
}

export default Memberform
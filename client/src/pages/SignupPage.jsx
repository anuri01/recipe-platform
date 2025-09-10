import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import { validateName, validatePassword, validateUsername } from "../utils/validation";

function SignupPage() {
    // 회원 가입에 필요한 상태 셋팅
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ emailId, setEmailId ] = useState('');
    const [ emailDomain, setEmailDomain ] = useState('');
    const [ customDomain, setCustomDomain ] = useState('');
    const [ isCustomDomain, setIsCustomDomain ] = useState(false);
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ address1, setAddress1 ] = useState('');
    const [ address2, setAddress2 ] = useState('');
    const [ interests, setInterests ] = useState([]);
    
    // 가입 완료 후 로그인 페이지로 이동시키기 위한 메소드
    const navigate = useNavigate();

    const email = emailId + '@'+ (isCustomDomain ? customDomain : emailDomain);
    
    const handleInterestChange = (e) => {
      const { value, checked } = e.target;
        if (checked) {
        // 체크되면 배열에 추가
        setInterests([...interests, value]);
        } else {
        // 체크 해제되면 배열에서 제거
        setInterests(interests.filter((item) => item !== value));
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if(!username) {
            toast.error('아이디를 입력해 주세요.');
            return;
        }
        const userNameError = validateUsername(username)
        if(userNameError) {
            toast.error(userNameError);
            return;
        }

        if(!password) {
            toast.error('비밀번호를 입력하세요');
            return;
        }

        if(!confirmPassword) {
            toast.error('비밀번호를 한번 더 입력하세요');
            return;
        }

        if(password !== confirmPassword) {
            toast.error('비밀번호가 일치하지 않습니다.');
            return;
        }
        const passwordError = validatePassword(password)
        if(passwordError) {
            toast.error(passwordError);
            return;
        }

         if(!name) {
            toast.error('이름을 입력해 주세요.');
            return;
        }
        const nameError = validateName(name);
        if(nameError){
                toast.error(nameError);
                return;
        }

        const requestData = {name, username, password, email, phoneNumber};
        // 주소가 있을 경우에만 보냄. 그렇지 않고 빈값으로 보내면 에러남
        if( postcode && postcode.trim()) {
            requestData.address = {
                postcode, address1, address2
            }
        };
       
        try {
        await api.post('/users/signup', requestData)
        toast.success('회원가입이 완료되었습니다! 로그인해 주세요.');
        navigate('/login');
        } catch(error) {
            toast.error(error.response?.data?.message || '회원가입에 실패했습니다.');
        }
        }
        const clickToCancel = () => {
            // 이전 페이지로 이동
            navigate(-1);
        }

        const serachToAddress = () => {
            toast('주소 검색은 추후 지원됩니다.');
        }
        return (
            <div className="page-container">
                <div className="auth-header">
                    <img src="/images/large_logo.png" className="logo-image"></img>
                    <h1> 아빠요리 회원가입 </h1>
                    <p>가입에 필요한 정보를 입력하세요.</p>
                </div>
                <form onSubmit={handleSubmit} className="form-section">
                    <div className="form-group require">
                        <label htmlFor="username">아이디</label>
                        <input className="input-text"
                            type="text"
                            id="username"
                            value={username}
                            placeholder="아이디 입력"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group require">
                        <label htmlFor="password">비밀번호</label>
                        <input className="input-text"
                            type="password"
                            id="password"
                            value={password}
                            placeholder="비밀번호 입력"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input className="input-text"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="비밀번호 재입력"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group require">
                        <label htmlFor="name">이름</label>
                        <input className="input-text"
                            type="text"
                            id="name"
                            value={name}
                            placeholder="이름 입력"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">휴대폰번호</label>
                        <input className="input-text"
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            placeholder="휴대폰번호 ‘-’ 없이 입력"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailId">이메일</label>
                        <div className="email-group">
                        <input className="input-text email-id"
                            type="text"
                            id="emailId"
                            value={emailId}
                            placeholder="이메일 입력"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <span>@</span>
                        { isCustomDomain ? (
                            <input className="input-text email-domain"
                                type="text"
                                value={customDomain}
                                placeholder="도메인을 입력하세요."
                                onChange={(e) => setCustomDomain(e.target.value)}
                            />
                            ) : (
                            <select 
                            value={emailDomain}
                            className="input-text email-domain"
                            onChange={(e) => {
                                    setEmailDomain(e.target.value);
                                    if (e.target.value === 'custom'){
                                        setIsCustomDomain(true);
                                        setCustomDomain('');
                                    } else {
                                        setIsCustomDomain(false);
                                    }
                                }}
                            >
                            <option value="" disabled hidden >도메인 선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="custom">직접입력</option>
                            </select>
                        )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postcode">주소</label>
                        <div className="address-group">
                        <input className="input-text postcode"
                            type="text"
                            id="postcode"
                            value={postcode}
                            placeholder="주소를 검색하세요."
                            onChange={(e) => setPostcode(e.target.value)}
                            disabled
                        />
                        <button className="action-button button-primary"
                            type="button"
                            onClick={() => serachToAddress()}
                        >검색</button>
                        </div>
                        <input className="input-text"
                            type="text"
                            id="address1"
                            value={address1}
                            placeholder=""
                            onChange={(e) => setAddress1(e.target.value)}
                            disabled
                        />
                        <input className="input-text"
                            type="text"
                            id="address2"
                            value={address2}
                            placeholder="상세주소를 입력하세요."
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                     <div className="form-group">
                        <label>관심분야</label>
                        <div className="checkbox-group">
                        <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Korean"
                            checked={interests.includes('Korean')}
                            onChange={handleInterestChange}
                        />
                        한식
                        </label>
                        <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Western"
                            checked={interests.includes('Western')}
                            onChange={handleInterestChange}
                        />
                        양식
                        </label>
                        <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Chinese"
                            checked={interests.includes('Chinese')}
                            onChange={handleInterestChange}
                        />
                        중식
                        </label>
                        <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Japanese"
                            checked={interests.includes('Japanese')}
                            onChange={handleInterestChange}
                        />
                        일식
                        </label>
                        <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Pastry"
                            checked={interests.includes('Pastry')}
                            onChange={handleInterestChange}
                        />
                        디저트
                        </label>
                         <label>
                        <input className="checkbox"
                            type="checkbox"
                            value="Baking"
                            checked={interests.includes('Baking')}
                            onChange={handleInterestChange}
                        />
                        제빵
                        </label>
                        </div>
                    </div>
                    <div className="cta-group">
                    <Link onClick={clickToCancel} className="button button-secondary sub">취소</Link>
                    <button type="submit" className="button button-primary main">가입하기</button>
                    </div>
                    

                </form>
                

            </div>
        )
    }

export default SignupPage;
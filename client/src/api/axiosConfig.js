import axios from "axios";
import useUserStore from "../store/userStore";
import { jwtDecode } from "jwt-decode";

// axios 라이브러리에서는 create 팩토리 함수로 객체 생성함.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4700/api'
})

//요청 인터셉트. 요청을 보낼때 로그인 상태를 다시 체크하고 토큰을 헤더에 실어 보내 로그인 사용자임을 알린다. 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            const decodedToken = jwtDecode(token);

            if(decodedToken.exp * 1000 < Date.now()){
                useUserStore.getState().logout();
                window.location.href = '/';
                return Promise.reject(new Error('토큰이 만료되었습니다.'));
            }
            // Bearer 구분자를 붙여서 보낸다. 공백 포함.
            config.headers.authorization = `Bearer ${token}`;
        }
        // 👇 FormData일 때는 Content-Type을 설정하지 않음
        if (config.data instanceof FormData) {
        // FormData의 경우 Content-Type을 삭제하여 브라우저가 자동으로 boundary를 설정하도록 함
        delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 요청 시 서버에서 401(토큰만료) 응답일 일 경우 로그아웃 처리
 api.interceptors.response.use(
    // 1. 성공적인 응답은 그대로 반환
    (response) => response,

    //2. 만약 에러가 401 (Unauthorized) 상태 코드면
    (error) => {
        if (error.response && error.response.status === 401) {
            // Zustand 스토어의 logout 액션을 직접 호출해 상태를 초기화
            useUserStore.getState().logout();
            // 홈 페이지로 리다이렉션
            window.location.href = '/login';
        }
        // 다른 종류의 에러는 그대로 반환해 각 컴포넌트에서 처리 
        return Promise.reject(error);
    }
);

export default api;
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";


// 로그인 전역 스토어. 로그인 상태를 확인할 수 있는 전역 스토어
const useUserStore = create((set) => {
    const token = localStorage.getItem('token');
    let initialState = {
        token: null,
        isLoggedIn: false,
        user: null,
    };
    
    if(token) {
        const decodedToken = jwtDecode('token');
        if(decodedToken.exp * 1000 > Date.now()) {
            initialState = { token, isLoggedIn: true, user: decodedToken};
        } else {
            localStorage.removeItem('token')
        }
    }
    
    return {
        // 상태를 가지고 옴. 
        ...initialState,
        // 스토어 제공 함수
        setToken: (token) => {
            const decodedToken = jwtDecode(token);
            // 이름과 저장할 토큰 값
            localStorage.setItem('token', token);
            set({token: token, isLoggedIn: true, user: decodedToken});
        },
        logout: () => {
            localStorage.removeItem('token');
            set({token: null, isLoggedIn: false, user: null});
        }
    };

});

export default useUserStore;
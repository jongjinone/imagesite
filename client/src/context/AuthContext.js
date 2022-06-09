import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext()    //context 객체 만들기

export const AuthProvider = ({ children }) => {      //provider
    const [user, setUser] = useState() //유저 로그인 정보를 받기 위한 저장소
    const [LoginState, setLoginState] = useState(false)

    return (
        <AuthContext.Provider value={[user, setUser, LoginState,  setLoginState]}>    {/*provider를 통해 state와 set함수를 넘겨줌.*/}
            {children}  {/*provide의 하위 컴포넌트들이 사용 가능함.*/}
        </AuthContext.Provider>
    )
}
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'

const ToolBar = () => {
    const [user, setUser] = useContext(AuthContext)  //context 사용을 설정 user에는 세션에 대한 정보를 저장
    const [LoginState, setLoginState] = useContext(AuthContext)
    const navigate = useNavigate()
    let name = localStorage.getItem("name")

    const Logout = async(e)=>{
        e.preventDefault(e)
        try{
            let body = {
                user : true,
                name: user.name,
                sessionId: user.sessionId,
                user_id : user._id
            }
            await axios.post('/users/logout', body) 
            setUser() //user를 빈값으로 초기화함
            localStorage.removeItem("sessionId")
            localStorage.removeItem("name")
            setLoginState(false)
            alert("로그아웃 완료")
            navigate('/auth/login')
        }catch(err){
            console.log(err.message)
        }
    }
    return (
        <div>
            <Link to='/main' style={{textDecoration : "none"}}>
                <span style={{ marginRight: 10 }}>홈</span>
            </Link>
            {LoginState ? //이전에 공유하는 user가 존재 유무
                (<>
                <span>{name}님 </span>
                <span style={{cursor: "pointer"}} onClick={(e)=>{Logout(e)}}>로그아웃</span>
                </>) 
                :
                (<>
                    <Link to='/auth/login' style={{textDecoration : "none"}}>
                        <span style={{ marginRight: 10, textDecoration : "none" }}>로그인</span>
                    </Link>
                    <Link to='/auth/register' style={{textDecoration : "none"}}>
                        <span >회원가입</span>
                    </Link>
                </>)
                }
        </div>
    )
}

export default ToolBar
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/Custominput";
import { AuthContext } from "../context/AuthContext";

const LoginPage = ()=>{
    const [user, setUser] = useContext(AuthContext)
    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [LoginState, setLoginState] = useContext(AuthContext)

    const Login = async (e)=>{
        e.preventDefault()
        if(userID.length<3){
            return alert("ID는 3자 이상입니다.")
        }
        if(password.length<6){
            return alert("비밀번호는 6자 이상입니다.")
        }
        try{
            let body = {
                userID : userID,
                password : password
            }

           const result = await axios.post('/users/login', body) //서버로 통신
           setUser({
               name : result.data.name,       //통신에 성공할 경우 이름과
               sessionId : result.data.sessionId,
               user_id : result.data.user_id
           })
           localStorage.setItem("sessionId", result.data.sessionId) //로컬 스토리지에 세션을 저장
           localStorage.setItem("name", result.data.name) //로컬 스토리지에 이름을 저장
           setLoginState(true)
           
            alert('로그인 성공!')
            navigate('/main')
        }catch(err){
            console.log(err)
            alert('잘못된 입력정보입니다.')
        }
        

    }

    return(
        <div>
            <h3>Login</h3>
            <form onSubmit={(e)=>Login(e)}>
                <CustomInput label="회원 ID" value={userID} setValue={setUserID}/>
                <CustomInput label="비밀번호" value={password} setValue={setPassword} type="password"/>
                <button type="submit">로그인</button>
                <button style={{marginLeft: "10px"}} onClick={()=>navigate('/auth/register')}>회원가입</button>
            </form>
        </div>
    )
}

export default LoginPage
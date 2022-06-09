import React, { useState, useContext} from "react";
import CustomInput from '../components/Custominput'
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [user, setUser] = useContext(AuthContext)      //AuthContext를 사용하면서 인자들을 넘겨받음.
    const [LoginState, setLoginState] = useContext(AuthContext)
    const navigate = useNavigate()
    const [passedID, setPassedID] = useState("")
    const [possible, setPossible] = useState(false)
    const [impossible, setImpossible] = useState(false)
    const [Idcheck, setIdcheck] = useState(false)

    const IDcheck = (e)=>{
        e.preventDefault()
        setPassedID(userID)       //현재 입력되어 있는 ID를 저장

        if (!userID) {
            return alert("ID를 입력해주세요"); // ID에 입력이 없는 경우
        }

        let body = {
            ID: userID       //ID를 body에 담는다.
        }

        axios.post('/users/idcheck', body).then(res => {  //body를 서버로 전송
            if (res.data.check) { //chek가 완료된 경우(중복 안됨)
                setIdcheck(true) //namechek를 true로 설정
                setPossible(true)  //닉네임 사용 가능 메세지 true
                setImpossible(false)  //닉네임 사용 불가능 false
                setTimeout(() => {
                    setPossible(false)  //3초뒤 닉네임 사용가능 메세지 사라짐
                }, 3000);
            } else {                           //check가 실패한 경우(중복)
                setIdcheck(false) //namechek를 false로 설정
                setImpossible(true) //닉네임 사용 불가능 메세지 true
                setPossible(false)  //닉네임 사용 가능 메세지 false
                setTimeout(() => {
                    setImpossible(false) //3초뒤 닉네임 사용 불가능 메세지 사라짐
                }, 3000);
            }
        }).catch(err => {
            console.log("통신에러") //서버와의 통신 실패
        })
    }

    const Submit = async(e) => {
        try {
            e.preventDefault()
            if(!(name && userID && password && passwordCheck)) return alert("모든 항목을 입력해주세요.")
            if(passedID !== userID) return alert("ID 중복을 확인해 주세요.")
            if(userID.length<3) return alert("ID는 3자 이상 입력해주세요.")
            if(password.length<6) return alert("비밀번호는 6자 이상 입력해주세요.")
            if(password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다.")

           const result = await axios.post("/users/register", {name, userID, password}) //서버에 post하여 저장된 정보를 보냄

            setUser({
               sessionId: result.data.sessionId,      //응답결과를 set함수를 통해 유저에 저장함.
               name: result.data.name,
               user_id : result.user_id
           }) 
           localStorage.setItem("sessionId", result.data.sessionId) //로컬 스토리지에 세션을 저장
           localStorage.setItem("name", result.data.name) //로컬 스토리지에 이름을 저장
           setLoginState(true)
           alert("회원가입완료!")
           navigate('/main')
        } catch (err) {
            console.log(err)
            alert("회원가입에 실패했습니다.")
        }
    }

    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={(e) => { Submit(e) }}>
                <CustomInput label="이름" value={name} setValue={setName} />
                <CustomInput label="ID" value={userID} setValue={setUserID} />
                {possible && <div style={{color: "blue"}}>사용가능한 ID입니다.</div>}
                {impossible && <div style={{color:"red"}}>이미 존재하는 ID입니다.</div>}
                <button style={{marginTop: "5px", marginBottom: "5px"}} onClick={(e)=>IDcheck(e)}>ID 중복확인</button>
                <CustomInput label="비밀번호" value={password} setValue={setPassword} type="password" />
                <CustomInput label="비밀번호 확인" value={passwordCheck} setValue={setPasswordCheck} type="password" />
                <button style={{marginRight: "10px"}} type="submit">회원가입 등록</button>
                <button onClick={()=>navigate("/auth/login")}>로그인</button>
            </form>
        </div>
    )
}

export default RegisterPage
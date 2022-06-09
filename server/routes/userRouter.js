const { Router } = require('express')
const userRouter = Router()
const User = require('../models/User')
const { hash, compare } = require('bcryptjs')
const mongoose = require('mongoose')

userRouter.post('/register', async (req, res) => {
    try {
        const hashedPassword = await hash(req.body.password, 10) //비밀번호를 hash로 만들어 줌. 10은 salt

        const user = await new User({ //user 객체를 생성
            name: req.body.name,
            userID: req.body.userID,
            hashedPassword: hashedPassword,                  //입력받은 req데이터를 객체에 저장. 
            sessions: [{ createdAt: new Date() }]
        }).save()
        
        const session = user.sessions[0] //회원가입이기 때문에 무조건 첫번째로 생성된 세션을 기준으로 잡음.
        res.json({
            message: "회원가입 완료",
            sessionId: session._id,
            name: user.name,
            user_id : user._id
        }) 

    } catch (err) {
        console.log("에러발생")
        res.status(400).json({ message: err.message })
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.body.userID }) //mongoose의 내장함수로 요청정보에 맞는 유저를 찾는다.
        const isValid = await compare(req.body.password, user.hashedPassword) //요청된 비밀번호와 해쉬번호를 비교
        if (!isValid) res.status(400)

        user.sessions.push({ createdAt: new Date() }) //유저의 세션을 추가
        const session = user.sessions[user.sessions.length - 1] //session은 가장 최근에 만든 세션을 기준으로 잡음.
        await user.save() //user모델을 DB에 저장
        res.json({ message: "로그인 성공!", sessionId: session._id, name: user.name, user_id: user._id})
    } catch (err) {
        console.log("실패임")
        res.status(400).json({message : err.message})
    }
})

userRouter.post('/logout', async (req, res) => {
    try {  
        if (!req.body.user) console.log("유효하지 않은 세션입니다.") //user가 존재하지 않는 경우
        await User.updateOne({ _id: req.body.user_id }, //저장된 user의 id와 스키마의 id 같은 것을 찾아서 업데이트 함.
            { $pull: { sessions: { _id: req.body.sessionId } } } //세션들 중 로그아웃할 세션id와 같은 세션을 pull을 통해 삭제함
        )
        res.json({ success: "성공!" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

userRouter.post('/idcheck', (req, res)=>{
    User.findOne({userID : req.body.ID}).then(id =>{ //요청된 id와 같은 user를 찾음
        let check = true //일단 check는 true
        if(id) check = false //user의 id가 존재하는 경우 check는 false
        res.status(200).json({check})
    }).catch(err=>{
        res.status(400)
    })
})

module.exports = { userRouter }
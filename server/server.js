require('dotenv').config() //개발환경 확인

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { imageRouter } = require('./routes/imageRouter')
const {userRouter} = require('./routes/userRouter')

const {PORT, MONGO_URI} = process.env //DB에 관한 정보 숨기기

mongoose.connect(MONGO_URI) 
.then(()=>console.log("연결 성공!"))
.catch(err=>console.log(err))


app.use(express.static("uploads")) // express.static은 정적인 파일을 제공해줌. 여기서는 uploads 폴더 안의 파일을 제공
app.use(express.json()) //요청을 보고 body를 파싱함.
app.use('/images', imageRouter) //images 경로에 대한 router 처리
app.use('/users', userRouter) // users 경로에 대한 router 처리


app.listen(PORT, ()=>{ 
    console.log("서버 돌아감")
})


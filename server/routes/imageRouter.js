const {Router} = require('express')
const imageRouter = Router()
const Image = require('../models/image')
const {upload} = require('../middleware/imageUpload')

imageRouter.post('/', upload.array("image1", 10), async(req,res)=>{  //upload 미들웨어를 추가. image1은 post로 들어올 때 req의 key값과 동일
    try{
         req.files.map(async (file)=>{
            const image= await new Image({       //upload 미들웨어는 uploads폴더에 이미지 파일을 저장하는 기능.
                key: file.filename, 
                originalFilename : file.originalname
            }).save()                                         //데이터베이스에 이미지 정보(파일명) 저장
        })
    }catch (err){
        console.log(err)
        res.status(400).json({message : err.message})
    }
})

imageRouter.get('/', async (req,res)=>{
    const images = await Image.find() //조건 없이 모든 이미지들의 데이터를 배열로 반환
    res.json(images)
})

module.exports = { imageRouter }
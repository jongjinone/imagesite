const multer = require('multer')
const {v4: uuid} =  require ('uuid')
const mime = require('mime-types')

const storage = multer.diskStorage({      // diskStorage를 통해 파일 저장 과정을 제어 가능 ex)클라이언트에서 넘어오는 저장할 이미지 파일의 이름을 설정해 줄 수 있음
    destination: (req, file, cb) => cb(null, "uploads"), //cb함수는 에러는 null을 반환하고 저장위치에 파일을 저장함.
    filename : (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)   //cb함수는 에러는 null을 반환하고 파일이름을 저장함. uuid를 통해 임시로 파일 이름이 결정됨. +파일의 형식도 지정함.
})

const upload = multer({storage, fileFilter: (req, file, cb)=>{
    if(['image/jpeg', 'image/png'].includes(file.mimetype) ) {cb(null, true)}       //파일형식이 배열 안의 형식을 포함하면 true를 반환
    else {cb("invalid file type.", false)}},
    limits:{
        fileSize: 1024 * 1024 * 20, //사이즈 제한 설정, 기본 단위는 byte임 따라서 현재 20Mb로 제한. 
    }
    
}) //request에서 이미지를 뽑아서 저장하는 미들웨어 함수. 폴더는 설정한 이름으로 자동 생성.

module.exports = { upload }
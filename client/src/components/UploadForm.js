import React, { useContext, useState } from "react";
import axios from 'axios'
import './UploadForm.css'
import { ImageContext } from '../context/ImageContext' //생성한 context 객체 호출

const UploadForm = () => {
    const [images, setImages] = useContext(ImageContext) //데이터를 넘겨받아 context를 사용
    const [files, setFiles] = useState(null)
    const [img, setImg] = useState(null)
    const [filename, setFileName] = useState("이미지 파일을 업로드 해주세요.")

    const changer = (e) => {
        const imgfiles = e.target.files
        setFiles(imgfiles)
        const imgfile = imgfiles[0]
        setFileName(imgfile.name)
        const fileReader = new FileReader() //파일의 내용을 읽고 저장하는 기능과 관련한 객체
        fileReader.readAsDataURL(imgfile)   //업로드된 이미지 파일의 url을 읽음.
        fileReader.onload = e => setImg(e.target.result) //읽기가 끝날때 마다 함수를 실행. 읽기가 끝나면 데이터는 result에 담김.
    }

    const Cancel = (e)=>{
        e.preventDefault()
        setFileName("이미지 파일을 업로드 해주세요.")
        setImg()
        return
    }

    const Sub = async (e) => { //async를 붙이면 promise를 리턴하는 함수로 만들어 줌.
        e.preventDefault()
        const formData = new FormData() //전송을 위한 객체 생성

        for (let file of files) {
            formData.append("image1", file) //key는 image1 value는 file이 들어가게 됨.
        } 
        
        try {
            const res = await axios.post("/images", formData, { //await이 붙으면 promise가 처리될 때까지 대기
                headers: { "Content-Type": "multipart/form-data" }, // http 통신에 필요한 headr 설정
            })
            setImages([...images, res.data])
            alert("업로드에 성공했습니다.")
            setTimeout(() => {
                setFileName("이미지 파일을 업로드 해주세요.")
                setImg(null)
            }, 300);
        } 
        catch (err) {
            setFileName("이미지 파일을 업로드 해주세요.")
            setImg(null)
            alert("업로드에 실패했습니다.")
        }
    }

    

    return (
        <form>
            <img className="imgpre" src={img} />
            <div className="file-dropper">
                <p><b>{filename}</b></p>
                <input id="image" multiple type="file" onChange={e => { changer(e) }} />
            </div>
            <button className="subButton" onClick={(e)=>{Sub(e)}} type='submit'>업로드</button>
            <button style={{marginTop: "10px"}} className="subButton" onClick={(e)=>{Cancel(e)}}>취소</button>
        </form>
    )
}

export default UploadForm
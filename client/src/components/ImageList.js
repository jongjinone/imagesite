import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext"; //생성한 context 객체 호출

const ImageList = () => {
    const [images] = useContext(ImageContext) //데이터를 넘겨받아 context를 사용
    const imgList = images.map((image) => {
        return (
            <img
                key={image.key} //각각 저장된 이미지 정보를 이용하여 키에 관한 이미지 배열 생성
                style={{ width: "30%", margin: "10px" }}
                src={`http://localhost:5000/${image.key}`}
            /> 
        )
        
    })
    return (       //map으로 생성된 이미지 목록을 나열함.
        <div>
            <h1>Image List</h1>
            {imgList} 
        </div>
    )
}

export default ImageList
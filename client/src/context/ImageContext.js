import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ImageContext = createContext() //context 객체를 생성

export const ImageProvider = ({children}) => { //로직을 사용하기 위한 함수 공간
    const [images, setImages] = useState([])
    useEffect(()=>{
        axios.get("/images") //images에 요청을 보내고
        .then(res=>setImages(res.data)) //응답의 data를 images로 세팅해 줌. images에는 이미지 정보에 대한 배열들이 존재.
        .catch(err=>{console.log(err); console.log("실패")})
    }, [images])

    return (
        <ImageContext.Provider value={[images, setImages]} >  {/*Provider 하위컴포넌트들에 데이터를 전달할 수 있음*/}
            {children}
        </ImageContext.Provider>
    )
}
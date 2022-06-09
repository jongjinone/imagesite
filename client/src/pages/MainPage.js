import React, { useContext, useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import ImageList from '../components/ImageList';
import './MainPage.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {
  const navigate = useNavigate()
 const session = localStorage.getItem("sessionId") 

    useEffect(()=>{
      if(!session){
        alert("로그인 유저만 이용할 수 있습니다.")
        navigate('/')
      }
    },[]) 

  return (
    <div>
      <div className='title'><h2>갤러리</h2></div>
      <UploadForm/>
      <ImageList/>
    </div>
  );
}

export default MainPage

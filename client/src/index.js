import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ImageProvider } from './context/ImageContext';                 //context사용을 위한 provider 호출
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>            {/*provider들을 통해 context를 사용할 수 있도록 함. */}
    <ImageProvider>
      <App />
    </ImageProvider>
    </AuthProvider>
);


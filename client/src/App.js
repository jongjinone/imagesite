import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToolBar from "./components/toolbar";

const App = () => {
  return (
    <div style={{ marginLeft: 100, marginRight: 100 }}>

      <BrowserRouter>
        <ToolBar />
        <Routes>
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/auth/register" element={<RegisterPage />} />
          <Route exact path="/auth/login" element={<LoginPage />} />
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

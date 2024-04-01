import React from "react";
import {HashRouter, BrowserRouter, Routes, Route, Switch, Router } from "react-router-dom";
import * as spaces from "../components/spaces";
import * as views from "../components/views";


// Supposant que token et userType sont définis ailleurs dans votre code

function RootRouter() {
  return (
    <BrowserRouter >
      <Routes>  
          <Route  path="/" element={<spaces.VisitorSpace/>}>
            <Route  path="/" element={<views.Visitor_HomePage/>} />
            <Route  path="/pixelBoard" element={<views.Visitor_PixelBoard/>} />
          </Route>
          <Route  path="/admin" element={<spaces.AdminSpace/>}>
            <Route  path="/admin" element={<views.Admin_HomePage/>} />
            
          </Route>
          <Route  path="/login" element={<views.SignInPage/>} />
         
        {/*token !== "" && userType ? (
          <>
            {userType === "USER" && <Route path="/" element={<spaces.UserSpace />} />}
            {userType === "ADMIN" && <Route path="/" element={<spaces.AdminSpace />} />}
          </>
        ) : 
        (
          <Route path="/" element={<spaces.VisitorSpace />} />
        )*/}
        
      </Routes>
    </BrowserRouter >
  );
}

export default RootRouter;

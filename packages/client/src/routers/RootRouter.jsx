import React from "react";
import {HashRouter, BrowserRouter, Routes, Route, Switch, Router } from "react-router-dom";
import * as spaces from "../components/spaces";
import * as views from "../components/views";
import ProtectedRoute from "./ProtectedRoute"


// Supposant que token et userType sont définis ailleurs dans votre code

function RootRouter() {
  return (
    <BrowserRouter >
      <Routes>  
          <Route  element={<spaces.VisitorSpace/>}>
            <Route  path="/pixelBoard/:id" element={<views.Visitor_PixelBoard/>} />
          </Route>
          <Route  element={<ProtectedRoute allowedRoles={['admin']} ><spaces.AdminSpace /></ProtectedRoute>}>
            <Route  path="/admin" element={<views.Admin_HomePage/>} />
          </Route>
          <Route  element={<spaces.VisitorSpace />}>
            <Route  path="/dddd" element={<views.Visitor_HomePage/>} />
          </Route>
          <Route  path="/login" element={<views.SignInPage/>} />
          <Route  path="/Register" element={<views.RegisterPage/>} />
          <Route  path="/HomePage" element={<views.HomePage/>} />
          <Route  path="/" element={<views.HomePage/>} />
          <Route  path="/profile" element={<ProtectedRoute allowedRoles={['user','admin']} ><views.profile /></ProtectedRoute>}></Route>


            
          
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

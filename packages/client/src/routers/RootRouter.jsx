import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as spaces from "../components/spaces";
// Supposant que token et userType sont définis ailleurs dans votre code

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>  
          <Route exact path="/" element={<spaces.VisitorSpace/>} />
          <Route exact path="/admin" element={<spaces.AdminSpace/>} />
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
    </BrowserRouter>
  );
}

export default RootRouter;

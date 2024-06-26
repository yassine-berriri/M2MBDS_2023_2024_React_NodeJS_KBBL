/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */

import { Space, Sidebar } from "../../components";
import { AdminRouter } from "../../../routers";
import * as components from "../../components";
import { Outlet } from "react-router-dom";
import Main from '../../views/HomePage/main'; 

/*
 * ----------------------------------------------------------------------
 *                                Services                              |
 * ----------------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------------
 *                                Constants                              |
 * ----------------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------------
 *                                Styles                                |
 * ----------------------------------------------------------------------
 */
//import "./VisitorSpace.css";

/* --------------------------------------------------------------------
 *                              Contexts                              |
 * --------------------------------------------------------------------
 */


/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */
function AdminSpace() {
  /*
   * ----------------------------------------------------------------------
   *                                 Data                                 |
   * ----------------------------------------------------------------------
   */


  /*
   * ----------------------------------------------------------------------
   *                             Routing Hooks                            |
   * ----------------------------------------------------------------------
   */
 

  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */

  
  
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  


  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */



  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */




  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <Space id="AdminSpace" className="AdminSpace" spaceName="Admin">
      <div className="AdminSpace-Body">
      <Main>
      <Outlet/>

      </Main>
        
        
      </div>
    </Space>
  );
}

export default AdminSpace;

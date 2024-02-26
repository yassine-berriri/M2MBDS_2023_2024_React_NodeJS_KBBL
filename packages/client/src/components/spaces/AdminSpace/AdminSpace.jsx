/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */

import { Space } from "../../components";
import { AdminRouter } from "../../../routers";

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
        <AdminRouter/>
      </div>
    </Space>
  );
}

export default AdminSpace;

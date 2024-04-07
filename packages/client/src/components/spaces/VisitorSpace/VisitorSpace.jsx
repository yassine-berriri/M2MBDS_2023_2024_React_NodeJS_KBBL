/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */

import { Space, Sidebar } from "../../components";
import { VisitorRouter } from "../../../routers";
import * as components from "../../components";
import { Outlet } from "react-router-dom";
import Main from '../../views/HomePage/main'; 
import Header from '../../views/HomePage/Header'; 
import Footer from '../../views/HomePage/Footer'; 
import { Layout, Drawer, Affix } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../../views/HomePage/Sidenav";

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
import "../../../assets/styles/main.css";
/* --------------------------------------------------------------------
 *                              Contexts                              |
 * --------------------------------------------------------------------
 */


/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */
function VisitorSpace() {
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
  const { Header: AntHeader, Content, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("#d9d9d9");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");

  const openDrawer = () => setVisible(!visible);
  const [placement, setPlacement] = useState("right");
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);
  return (
    
    <Space id="VisitorSpace" className="VisitorSpace" spaceName="Visitor">
            <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
           < AntHeader  className="ant-layout-header">
           <Header  onPress={openDrawer} >
        
        </Header>
        </AntHeader>
      <div className="VisitorSpace-Body">
      <Outlet />

     
      </div>
    </Space>
  );
}

export default VisitorSpace;
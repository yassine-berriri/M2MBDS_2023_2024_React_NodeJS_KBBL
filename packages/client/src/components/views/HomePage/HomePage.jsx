
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Main from '../HomePage/main'; 

import { fetchPxBoard } from '../../../redux/pxBoard/pxBoardThunk'; // Check import path
import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../../components/chart/EChart";
import LineChart from "../../components/chart/LineChart";
import Sidenav from "../../../assets/layout/Sidenav";


import ava1 from "../../../assets/images/logo-shopify.svg";
import ava2 from "../../../assets/images/logo-atlassian.svg";
import ava3 from "../../../assets/images/logo-slack.svg";
import ava4 from "../../../assets/images/logo-spotify.svg";
import ava5 from "../../../assets/images/logo-jira.svg";
import ava6 from "../../../assets/images/logo-invision.svg";
import team1 from "../../../assets/images/team-1.jpg";
import team2 from "../../../assets/images/team-2.jpg";
import team3 from "../../../assets/images/team-3.jpg";
import team4 from "../../../assets/images/team-4.jpg";
import card from "../../../assets/images/info-card-1.jpg";
import {useNavigate} from 'react-router-dom';
import PopupGreen from '../../components/Popups/PopupGreen/PopupGreen'; // Adjust the path to where your PopupGreen component is located

function HomePage() {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { pxBoards, loading, error } = useSelector(state => state.pxBoard);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const navigate = useNavigate();
  const [showPopupGreen, setShowPopupGreen] = useState(false);
 const [popupMessage, setPopupMessage] = useState('');
  useEffect(() => {

    if (localStorage.getItem('showLoginSuccess') === 'true') {
      // Show the success message here, either by setting state that triggers a PopupGreen component
      // or by using another method like a toast notification
      setShowPopupGreen(true); // Assuming you have a state to control this
      setPopupMessage('Login successful! Welcome back.');
  
      // Remove the flag so it doesn't show again on refresh
      localStorage.removeItem('showLoginSuccess');
    }
    dispatch(fetchPxBoard());

  }, [dispatch]);
  const [reverse, setReverse] = useState(false);
  
  const onPopupDismiss = () => {
    setShowPopupGreen(false);
    navigate('/HomePage'); // Adjust the path as necessary
  };
  
  
  const   drawImageFromPixels = (pixels, width, height) => {
    // Créer un élément canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Dessiner chaque pixel
    pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color; // Définir la couleur
      ctx.fillRect(pixel.x, pixel.y, 1, 1); 
    });

 
    return canvas.toDataURL();
  }
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Number of PixBoard",
      title: pxBoards.length,
      icon: heart,
      bnb: "bnb2",
    },
    {
      today: "Number of Users",
      title: "3,200",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Users",
      title: "+1,200",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "New PixelBoard",
      title: "13,200",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const list = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const recentPxBoards = pxBoards.slice(-12);
  const handleClickonPxBoard = (id) => {
    navigate(`/pixelBoard/${id}`);
  }
  return (
    <div>
      {/* Your other components or content here */}
      <Main>
        {/* Content that will be displayed within the Main component's content area */}
     
        <>


        <div className="layout-content">
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <Title level={3}>
                          {c.title} <small className={c.bnb}>{c.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div className="icon-box">{c.icon}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Echart />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <LineChart />
              </Card>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
        {loading && <div> Loading... </div>} {/* Put your loading component here */}
            <>
      {showPopupGreen && <PopupGreen text={popupMessage} clicked={onPopupDismiss} />}
      {/* The rest of your SignInPage component's JSX */}
    </>
        {error && <div className="error">{error}</div>}
        {!loading && !error && (
          recentPxBoards.map(pxBoard => (
            <Col key={pxBoard.id} xs={24} sm={12} md={8} lg={6} xl={4} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Row gutter={[0, 20]}>
                  <Col span={24}>
                    <img
                      src={drawImageFromPixels(pxBoard.pixels, 100, 100)}
                      alt={`\${pxBoard.title} thumbnail`}
                      className="border10"
                      style={{ width: '100%', height: 'auto' }}
                      onClick={() => handleClickonPxBoard(pxBoard._id)}
                    />
                  </Col>
                  <Col span={24}>
                    <div className="ant-muse">
                      <Text>{pxBoard.title}</Text>
                      <Title level={5}>{pxBoard.title}</Title>
                      <Paragraph>
                        {/* Place additional information here */}
                        More details about the PixelBoard...
                      </Paragraph>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        )}
      </Row>

    
        </div>
</>
      </Main>
    </div>
  );

}

export default HomePage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from '../HomePage/main'; 
import { getUserById, updateUserProfile } from "../../../redux/user/userThunk";
import { fetchPxBoardsByUserId } from "../../../redux/pxBoard/pxBoardThunk";
import { Row, Col, Card, Typography, Button, Descriptions, Avatar, Input, Select, message } from "antd";
import BgProfile from "../../../assets/images/bg-profile.jpg";
import profilavatar from "../../../assets/images/face-1.jpg";
import project1 from "../../../assets/images/home-decor-1.jpeg";
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";
import Paragraph from "antd/lib/typography/Paragraph";
import {useNavigate} from 'react-router-dom';

const { Option } = Select;

function Profile() {
    const { Title, Text } = Typography;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({});
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const error = useSelector(state => state.user.error);
    const pxBoards = useSelector(state => state.pxBoard.pxBoards);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (userId) {
            dispatch(getUserById(userId));
            dispatch(fetchPxBoardsByUserId(userId)); // Charger les Pixel Boards de l'utilisateur
        }
    }, [dispatch]);

    useEffect(() => {
        if (user && user.user) {
            setUpdatedUserData({
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email,
                role: user.user.role,
            });
        }
    }, [user]);

    useEffect(() => {
        dispatch(fetchPxBoardsByUserId());
      }, [dispatch]);

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

    const handleSaveProfile = () => {
        const userId = localStorage.getItem('id');
        if (!updatedUserData.password) {
            message.error('Password is required');
            return;
        }
        const updatedData = {};
        if (updatedUserData.firstName) updatedData.firstName = updatedUserData.firstName;
        if (updatedUserData.lastName) updatedData.lastName = updatedUserData.lastName;
        if (updatedUserData.email) updatedData.email = updatedUserData.email;
        if (updatedUserData.role) updatedData.role = updatedUserData.role;
        if (updatedUserData.password) updatedData.password = updatedUserData.password;
        dispatch(updateUserProfile({ userId: userId, updatedData }));
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setUpdatedUserData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    //const recentPxBoards = pxBoards.slice(-4);
    const handleClickonPxBoard = (id) => {
        navigate(`/pixelBoard/${id}`);
    }

    const renderPxBoards = () => {
    return (
        <Row gutter={[24, 24]}>
            {pxBoards .map((board, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <img
                                    src={drawImageFromPixels(board.pixels, 100, 100)}
                                    alt={`${board.title} thumbnail`}
                                    className="border10"
                                    style={{ width: '100%', height: 'auto' }}
                                    onClick={() => handleClickonPxBoard(board._id)}
                                />
                            </Col>
                            <Col span={24}>
                                <div className="ant-muse">
                                    <Text>{board.title}</Text>
                                    <Title level={5}>{board.title}</Title>
                                    <Paragraph>
                                        {/* Place additional information here */}
                                        More details about the PixelBoard...
                                    </Paragraph>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

    return (
        <div>
            <Main>
                <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")" }}></div>
                    <Card className="card-profile-head" bodyStyle={{ display: "none" }} title={
                        <Row justify="space-between" align="middle" gutter={[24, 0]}>
                            <Col span={24} md={12} className="col-info">
                                <Avatar.Group>
                                    <Avatar size={74} shape="square" src={profilavatar} />
                                    <div className="avatar-info">
                                        <h4 className="font-semibold m-0">{user && user?.user.firstName} {user?.user.lastName}</h4>
                                        <b>{user?.user.role}</b>
                                    </div>
                                </Avatar.Group>
                            </Col>
                            <Col span={24} md={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                {/* Add any additional components here */}
                            </Col>
                        </Row>
                    }></Card>
                    <Row gutter={[24, 0]}>
                        <Col span={24} md={24} className="mb-24">
                            <Card
                                bordered={false}
                                title={<h6 className="font-semibold m-0">Profile Information</h6>}
                                className="header-solid h-full card-profile-information"
                                extra={<Button type="link" onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save' : 'Edit'}</Button>}
                                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                            >
                                {error && (
                                    <div style={{ marginBottom: 10, color: 'red' }}>{error}</div>
                                )}
                                {isEditing ? (
                                    <>
                                    <Descriptions title="User Information">
                                      <Descriptions.Item label="First Name" span={3}>
                                      <Input defaultValue={user?.user.firstName} onChange={e => setUpdatedUserData(prevState => ({ ...prevState, firstName: e.target.value }))} />
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Last Name" span={3}>
                                      <Input defaultValue={user?.user.lastName} onChange={e => setUpdatedUserData(prevState => ({ ...prevState, lastName: e.target.value }))} />
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Email" span={3}>
                                      <Input defaultValue={user?.user.email} onChange={e => setUpdatedUserData(prevState => ({ ...prevState, email: e.target.value }))} />
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Role" span={3}>
                                          <Select defaultValue={user?.user.role} onChange={value => handleInputChange('role', value)}>
                                            <Option value="admin">Admin</Option>
                                            <Option value="user">User</Option>
                                          </Select>
                                        </Descriptions.Item>
                                      <Descriptions.Item label="Password" span={3}>
                                      <Input defaultValue="" type="password"  onChange={e => setUpdatedUserData(prevState => ({ ...prevState, password: e.target.value }))} />
                                      </Descriptions.Item>
                                      </Descriptions>
                                     <Button type="primary" onClick={handleSaveProfile} >Update Profile</Button> 
                                    
                                  </>
                                ) : (
                                  <>
                                    <Descriptions title="User Information">
                                      <Descriptions.Item label="First Name" span={3}>
                                        {user?.user.firstName}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Last Name" span={3}>
                                        {user?.user.lastName}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Email" span={3}>
                                        {user?.user.email}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Role" span={3}>
                                        {user?.user.role}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </>
                                )}
                              </Card>
                          </Col>
                    </Row>
                    {localStorage.getItem('role') === 'admin' ? (
                    <Card bordered={false} className="header-solid mb-24" title={
                        <>
                            <h6 className="font-semibold">Pixel Boards</h6>
                            <p>User's Pixel Boards</p>
                        </>
                    }>
                        {/* Render Pixel Boards */}
                        {renderPxBoards()}
                    </Card>
                    ) : null} 
                </>
            </Main>
        </div>
    );
}

export default Profile;

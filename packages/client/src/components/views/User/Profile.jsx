import React, { useState, useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import Main from '../HomePage/main'; 
import { getUserById,updateUserProfile  } from "../../../redux/user/userThunk";
import {
    Row,
    Col,
    Card,
    Button,
    List,
    Descriptions,
    Avatar,
    Radio,
    Switch,
    Input,
    Select,

    message,
    
  } from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
  } from "@ant-design/icons";

import BgProfile from "../../../assets/images/bg-profile.jpg";
import profilavatar from "../../../assets/images/face-1.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import convesionImg4 from "../../../assets/images/face-6.jpeg";
import convesionImg5 from "../../../assets/images/face-2.jpg";
import project1 from "../../../assets/images/home-decor-1.jpeg";
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";
const { Option } = Select; // Destructure Option from Select

function Profile() {

    const [isEditing, setIsEditing] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({});

    const dispatch = useDispatch(); // Initialize useDispatch hook
    const user = useSelector(state => state.user.user); // Accessing user data from the state
    const error = useSelector(state => state.user.error); // Accessing error from the Redux store
    const [successMessage, setSuccessMessage] = useState(""); // State variable to store success message


    useEffect(() => {
      const userId = localStorage.getItem('id');
      if (userId) {
        dispatch(getUserById(userId));
        // No need to access user state here
        // Dispatching getUserById thunk action with user ID
      }
    }, [dispatch]);
    

    

    useEffect(() => {
      if (user && user.user) {
        // Initialize updatedUserData with default values from user object
        setUpdatedUserData({
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          email: user.user.email,
          role: user.user.role,
          
        });
      }
    }, [user]);

    const handleSaveProfile = () => {
      const userId = localStorage.getItem('id');
    
      // Check if password is provided
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
  
  
  
    const project = [
      {
        img: project1,
        titlesub: "Pixel Board 1",
        title: "Modern",
  
      },
      {
        img: project2,
        titlesub: "Pixel Board 2",
        title: "Scandinavian",
       
      },
      {
        img: project3,
        titlesub: "Pixel Board3",
        title: "Minimalist",
 
      },
    ];
  return (
    <div>
      {/* Your other components or content here */}
  
      <Main>
        {/* Content that will be displayed within the Main component's content area */}
    
     
        <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                  {user && user?.user.firstName} {user?.user.lastName}
                    </h4>
                  <b>{user?.user.role}</b>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
        
            </Col>
          </Row>
        }
      ></Card>

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
                  <div style={{ marginBottom: 10, color: 'red' }}>{error}</div> // Display the error message if error is not null
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
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          
        </Row>
      </Card>
    </>
      </Main>
    </div>
  );
}

export default Profile;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Input, Label, FormGroup, Form , Navbar,
    NavbarBrand} from 'reactstrap';
import { registerUser } from '../../../../redux/user/userThunk'; // Import thunk action for user registration
import { useDispatch, useSelector } from 'react-redux';
import { userStart, userFailure } from '../../../../redux/user/userSlice';
import PopupGreen from '../../../components/Popups/PopupGreen/PopupGreen'; // Adjust the path to where your PopupGreen component is located


import styled from 'styled-components';

const RegisterContainer = styled(Container)`
  padding: calc(20vh - 3rem) 10rem 2vh 1%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImageCol = styled(Col)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFormCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch(); // Get dispatch function from Redux
    const navigate = useNavigate();

    const [showPopupGreen, setShowPopupGreen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const onPopupDismiss = () => {
      setShowPopupGreen(false);
      navigate('/login');
  };
  

  
    const validateInputs = () => {
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number is invalid';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
    
        if (!role.trim()) {
            errors.role = 'Role is required';
        }

        return errors;
    };

    const handleRegister = async () => {
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length === 0) {
            try {
                dispatch(userStart()); // Dispatch user start action
                const userData = { firstName, lastName, email, phoneNumber, bio, password, role };
                const response = await dispatch(registerUser(userData)); // Dispatch thunk action for user registration
                
                // Check if registration was successful, then show popup
                if (response) { // Adjust this condition based on your actual API response structure
                    setPopupMessage('Registration successful! You can now log in.');
                    setShowPopupGreen(true);
                }

            } catch (error) {
                dispatch(userFailure(error.message)); // Dispatch user failure action
            }
        } else {
            setErrors(validationErrors);
        }
    };

  return (
    <>
      <Navbar expand='lg' dark color='primary'>
        <Container>
          <NavbarBrand href='#'></NavbarBrand>
        </Container>
      </Navbar>
      <>
    {showPopupGreen && <PopupGreen text={popupMessage} clicked={onPopupDismiss} />}
    {/* The rest of your RegisterPage component's JSX */}
    </>
      <RegisterContainer fluid>
        <Row>
          <StyledImageCol md={6}>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </StyledImageCol>

          <StyledFormCol md={6}>
            <h1 className="text-center text-primary fw-bold mb-5">Register</h1>
            <Form>
              <FormGroup row>
                <Label for='firstName' sm={2}>First Name</Label>
                <Col sm={10}>
                  <Input id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='lastName' sm={2}>Last Name</Label>
                <Col sm={10}>
                  <Input id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='email' sm={2}>Email</Label>
                <Col sm={10}>
                  <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='phoneNumber' sm={2}>Phone Number</Label>
                <Col sm={10}>
                  <Input id='phoneNumber' type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='bio' sm={2}>Bio</Label>
                <Col sm={10}>
                  <Input id='bio' type='textarea' rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='password' sm={2}>Password</Label>
                <Col sm={10}>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for='role' sm={2}>Role</Label>
                    <Col sm={10}>
                        <Input type='select' id='role' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Input>
                        {errors.role && <span className="text-danger">{errors.role}</span>}
                    </Col>
                </FormGroup>
                <p className="mt-3 text-center">Do you have an account? <a href="/login">Login here</a></p>

              <Button color='primary' block onClick={handleRegister}>Register</Button>
            </Form>
          </StyledFormCol>
        </Row>
      </RegisterContainer>
    </>
  );
}

export default RegisterPage;
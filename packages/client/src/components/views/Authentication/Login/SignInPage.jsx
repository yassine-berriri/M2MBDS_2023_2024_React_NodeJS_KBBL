import React, { useState } from 'react';
import { Container, Row, Col, Button, Input, Label, FormGroup, Navbar, NavbarBrand } from 'reactstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signInUser } from '../../../../redux/user/userThunk'; 
import { useNavigate } from 'react-router-dom';

const SignInContainer = styled(Container)`
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

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSignIn = async () => {
    const validationErrors = {};

    // Validation rules
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length === 0) {
      dispatch(signInUser({ email, password }));
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
    try {
      await dispatch(signInUser({ email, password }));
    
      const token = localStorage.getItem('token');
      console.log('Token:', token); // For example, to send the token in API requests
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: { email } });
      localStorage.setItem('showLoginSuccess', 'true');
      navigate('/HomePage');
      
    } catch (error) {
      // Handle sign-in errors
    }
    
  };

  return (
    <>
      <Navbar expand='lg' dark color='primary'>
        <Container>
          <NavbarBrand href='/'>Go to PixelBoards</NavbarBrand>
        </Container>
      </Navbar>
      <SignInContainer fluid>
        <Row>
          <StyledImageCol md={6}>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Phone image" />
          </StyledImageCol>
          <StyledFormCol md={6}>
            <h1 className="text-center text-primary fw-bold mb-5">Login</h1>
            <form>
              <FormGroup row>
                <Label for='email' sm={2}>Email</Label>
                <Col sm={10}>
                  <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='password' sm={2}>Password</Label>
                <Col sm={10}>
                  <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <span className="text-danger">{errors.password}</span>}
                </Col>
              </FormGroup>
              <p className="mt-3 text-center">Don't have an account? <a href="/register">Register here</a></p>

              <Button color='primary' block onClick={handleSignIn}>Sign in</Button>
            </form>
          </StyledFormCol>
        </Row>
      </SignInContainer>
    </>
  );
}

export default SignInPage;

import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { signInWithGoogle } from '../firebase-config';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await signUp(email, password);
        navigate("/login")
      } catch (err) {
        setError(err.message)
      }
  }

  return (
    <Container
        className='d-flex align-items-center
        justify-content-center'
        style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-3'>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" 
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Email address"
                                onChange={(e) => setPassword(e.target.value)}
                                 required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password"  required />
                        </Form.Group>
                        <Button type="submit" 
                            className='w-100 mt-4'
                            >
                                Sign Up
                            </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-5'>
                Already have an account ? Log In
                <br/>
                <Button type="submit" 
                            className='w-80 mt-4'
                            onClick={signInWithGoogle}
                            >
                                Sign in Google 
                            </Button>
            </div>
        </div>
    </Container>
  )
}

export default Signup
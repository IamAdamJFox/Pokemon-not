import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import '../assets/signupForm.css';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const { data } = await addUser({
          variables: { ...userFormData }
        });

        Auth.login(data.addUser.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
      setValidated(false);
    }
  };

  return (
    <div className="signup-container">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="pokemon-form">
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger' className="pokemon-alert">
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username' className="pokemon-label">Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
            className="pokemon-input"
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email' className="pokemon-label">Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="pokemon-input"
          />

        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password' className="pokemon-label">Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="pokemon-input"
          />

        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
          className="pokemon-button"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;

import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { Navigate } from 'react-router-dom';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const[suc,setSuc]= useState()
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, {  loading, error }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      } 
    ) {
        setSuc('success')
        context.login(userData)
    }
  });
  if (suc==="success") {
      return <Navigate to='/' />
  }

  function loginUserCallback() {
    loginUser({variables: values});
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(error.graphQLErrors[0].extensions.errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
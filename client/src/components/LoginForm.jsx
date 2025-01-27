import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { postJSONToDb } from "../helper";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';
import Error from "./Error";

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

function LoginForm({ setShowConfirm }) {

  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values, { setErrors }) => {
      const body = { username: values.username, password: values.password };
  
      try {
          const user = await postJSONToDb("login", body);
          setUser(user);
          setShowConfirm(true);
      } catch (error) {

        console.log("Error object:", error);
        
        console.log(error.message)
          // Display the error message from the backend
          setErrors({ password: error.message });
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <FormField>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>
      <FormField>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <button variant="fill" color="primary" type="submit">
          Login
        </button>
      </FormField>
    </form>
  );
}

export default LoginForm;
import React, { useContext } from "react";
import { snakeToCamel, postJSONToDb } from "../helper";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';
import Error from "../styles/Error";
import { StyledForm, Button } from "../MiscStyling";

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
        const user = await postJSONToDb("login", body);  // Await the promise
        const userTransformed = snakeToCamel(user);
        setUser(userTransformed);
        setShowConfirm(true);
      } catch (error) {
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
    <StyledForm onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <Button variant="fill" color="primary" type="submit">
          Login
        </Button>
      </div>
    </StyledForm>
  );
}

export default LoginForm;
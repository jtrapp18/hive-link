import React, {useState} from 'react';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignUpForm'
import styled from 'styled-components';
import LoggedInConfirm from '../components/LoggedInConfirm';

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 500px;
    max-width: 90vw;
    background: var(--cookie);
    padding: 50px;
    border: 3px double var(--dark-chocolate);

    h1 {
      background: var(--dark-chocolate);
      color: var(--cookie);
      font-family: 'RubikMoonrocks';
      padding: 5px;
      border-radius: 200px;
      text-align: center;
    }

    input {
      width: 100%;
    }
  }

`

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) return <StyledMain><LoggedInConfirm setShowConfirm={setShowConfirm}/></StyledMain>

  return (
    <StyledMain>
      
      {!showSignUp &&
        <>
          <LoginForm setShowConfirm={setShowConfirm}/>
          <p>Don't have an account?</p>
          <button
            onClick={()=>setShowSignUp(true)}
          >
            Sign Up
          </button>
        </>
      }
      {showSignUp &&
        <>
          <SignupForm setShowConfirm={setShowConfirm}/>
          <p>Already have an account?</p>
          <button
            onClick={()=>setShowSignUp(false)}
          >
            Log In
          </button>
        </>
      }
    </StyledMain>
  );
}

export default Login;
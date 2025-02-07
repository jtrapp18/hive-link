import React, {useState} from 'react';
import LoginForm from '../forms/LoginForm'
import SignupForm from '../forms/SignUpForm'
import LoggedInConfirm from '../components/LoggedInConfirm';
import Error from '../styles/Error';
import { Button } from '../MiscStyling';
import { StyledContainer } from '../MiscStyling';

function Login({errMessage}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) return <div><LoggedInConfirm setShowConfirm={setShowConfirm}/></div>

  return (
    <StyledContainer>
      {!showSignUp &&
        <>
          {errMessage && <Error>{errMessage}</Error>}        
          <LoginForm setShowConfirm={setShowConfirm}/>
          <p>Don't have an account?</p>
          <Button
            onClick={()=>setShowSignUp(true)}
          >
            Sign Up
          </Button>
        </>
      }
      {showSignUp &&
        <>
          <SignupForm setShowConfirm={setShowConfirm}/>
          <p>Already have an account?</p>
          <Button
            onClick={()=>setShowSignUp(false)}
          >
            Log In
          </Button>
        </>
      }
    </StyledContainer>
  );
}

export default Login;
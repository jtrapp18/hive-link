import React, {useState} from 'react';
import AccountForm from '../forms/AccountForm'
import LoginForm from '../forms/LoginForm'
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
          {errMessage && <><br /><Error>{errMessage}</Error></>}        
          <LoginForm setShowConfirm={setShowConfirm}/>
          <hr />
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
          <AccountForm setShowConfirm={setShowConfirm}/>
          <hr />
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
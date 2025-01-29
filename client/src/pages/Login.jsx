import React, {useState} from 'react';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignUpForm'
import LoggedInConfirm from '../components/LoggedInConfirm';

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) return <main><LoggedInConfirm setShowConfirm={setShowConfirm}/></main>

  return (
    <main>
      
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
    </main>
  );
}

export default Login;
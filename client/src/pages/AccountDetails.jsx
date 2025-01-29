import {useContext, useState} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { patchJSONToDb } from "../helper";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Error from "../styles/Error";
import { StyledForm } from "../MiscStyling";

const StyledDiv = styled.div`
  width: fit-content;
  max-width: 90vw;
  padding: 50px;
  display: flex;
  flex-direction: column;

  h1 {
    padding: 5px;
    border-radius: 200px;
    text-align: center;
  }

  div {
    display: flex;
    border-bottom: 2px dotted gray;
    justify-content: space-between;
    margin: 10px 5px 0px 5px;
    padding: 20px 5px 0px 5px;
  }

  button {
    margin-top: 20px;
  }
`

const AccountDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName|| "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    
  });

  if (!user) return <><Error>Must be logged in to view account details</Error><Login /></>

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    patchJSONToDb("users", user.id, formData)
    setUser((prevUser) => ({ ...prevUser, ...formData }));
    setIsEditing(false);
  };
    return (
      <main>
        {!isEditing ? (
          <StyledDiv>
            <h1>Account Details</h1>
            <div>
              <label>First Name:</label>
              <p>{user.firstName}</p>
            </div>
            <div>
              <label>Last Name:</label>
              <p>{user.lastName}</p>
            </div>
            <div>
              <label>Email Address:</label>
              <p>{user.email}</p>
            </div>
            <div>
              <label>Phone Number:</label>
              <p>{user.phoneNumber}</p>
            </div>
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
            >
                Edit
            </button>
          </StyledDiv>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <h1>Account Details</h1>
            <div>
              <label>First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Email Address:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <button 
                type="submit" 
              >
                Save
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
              >
                  Cancel
              </button>
            </div>
          </StyledForm>
        )}
      </main>
  );
};
  
  export default AccountDetails;
  
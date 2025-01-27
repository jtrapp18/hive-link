import {useContext, useState} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { patchJSONToDb } from "../helper";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    max-width: 100%;
    min-width: 50%;
  }
`

const StyledDiv = styled.div`
  width: 400px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
`

const StyledForm = styled.form`
  width: 800px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;

  label {
    width: 20%;
  }

  input {
    width: 80%;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
`

const AccountDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name|| "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone_number: user?.phone_number || "",
    
  });

  if (!user) return <Login />

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
      <StyledMain>
        <h1>Account Details</h1>
        <br />
        {!isEditing ? (
          <StyledDiv>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone Number:</strong> {user.phone_number}</p>
            <Button 
              type="button" 
              variant="success" 
              onClick={() => setIsEditing(true)}
            >
                Edit
            </Button>
          </StyledDiv>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Address:</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input 
                type="text" 
                name="phone_number" 
                value={formData.phone_number} 
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
      </StyledMain>
  );
};
  
  export default AccountDetails;
  
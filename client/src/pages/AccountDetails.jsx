import {useContext, useState} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { patchJSONToDb } from "../helper";
import styled from "styled-components";
import { Button } from '../MiscStyling';
import Error from "../styles/Error";
import { StyledForm, StyledSubmit } from "../MiscStyling";

const AccountDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName|| "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    zipcode: user?.zipcode || "",
  });

  if (!user) return <Login errMessage="Must be logged in to view account details"/>

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
          <StyledSubmit>
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
            <div>
              <label>Zip Code:</label>
              <p>{user.zipcode}</p>
            </div>
            <Button 
              type="button" 
              onClick={() => setIsEditing(true)}
            >
                Edit
            </Button>
          </StyledSubmit>
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
              <label>Zip Code:</label>
              <input 
                type="text" 
                name="zipcode" 
                value={formData.zipcode} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Button 
                type="submit" 
              >
                Save
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsEditing(false)}
              >
                  Cancel
              </Button>
            </div>
          </StyledForm>
        )}
      </main>
  );
};
  
  export default AccountDetails;
  
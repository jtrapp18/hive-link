import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';

const Message = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    bottom: 0;
`

const NewMessage = ({ id,  forumId}) => {
    const { user } = useContext(UserContext);
    const [showOptions, setShowOptions] = useState(false);
    const [formData, setFormData] = useState({
        messageText: "",
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // patchJSONToDb("users", user.id, formData)
        // setUser((prevUser) => ({ ...prevUser, ...formData }));
        // setIsEditing(false);
      };

    return (
        <Message>
          <StyledForm onSubmit={handleSubmit}>
            <h1>New Message</h1>
            <div>
                <label htmlFor="messageText">Message Text</label>
                <textarea
                    id="messageText"
                    name="messageText"
                    value={formData.messageText}
                    onChange={handleChange}
                />
            </div>
            <div>
              <Button 
                type="submit" 
              >
                Submit
                
              </Button>
            </div>
          </StyledForm>
        </Message>
    );
}

export default NewMessage;
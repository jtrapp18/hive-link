import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import { Button } from '../MiscStyling';

const Message = styled.div`
    textarea {
      width: 100%;
      border: 1px solid var(--honey);
      padding: 10px;
      border-radius: 20px;
      background: white;

      p {
          color: black;
      }

      &:hover {
        background: var(--light-yellow);
      }
  }

    .btn-container {
      display: flex;
      justify-content: end;

    }
`

const NewMessage = ({ setShow }) => {
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
          <form onSubmit={handleSubmit}>
              <textarea
                  id="messageText"
                  name="messageText"
                  value={formData.messageText}
                  onChange={handleChange}
              />
            <div className='btn-container'>
              <Button 
                  type="button" 
                  onClick={()=>setShow(false)}
                >
                  Cancel
                
              </Button>
              <Button 
                type="submit" 
              >
                Submit
                
              </Button>
            </div>
          </form>
        </Message>
    );
}

export default NewMessage;
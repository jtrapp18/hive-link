import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import { Button, StyledForm } from '../MiscStyling';

const MessageForm = styled.form`
    textarea {
      width: 100%;
      border: 1px solid var(--honey);
      padding: 10px;
      border-radius: 20px;
      color: black;
      background: white;

      p {
          color: black;
      }

      &:hover {
        background: var(--light-yellow);
        color: black;
      }
  }

    .btn-container {
      display: flex;
      justify-content: end;

    }
`

const NewMessage = ({ setShow, handleAdd }) => {
    const { user } = useContext(UserContext);
    const [messageText, setMessageText] = useState("");

    const handleChange = (e) => {
      setMessageText(e.target.value)
    };
      
    const handleSubmit = (e) => {
      e.preventDefault();

      handleAdd(messageText);
      setMessageText("");
      setShow(false);
    };

    return (
        <MessageForm onSubmit={(e) => { console.log('Form submit triggered'); handleSubmit(e); }}>
            <textarea
                id="messageText"
                name="messageText"
                value={messageText}
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
              onClick={()=>console.log('clicked')}
            >
              Submit
            </Button>
          </div>
        </MessageForm>
    );
}

export default NewMessage;
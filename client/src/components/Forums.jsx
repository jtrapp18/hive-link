import { CardContainer } from '../MiscStyling';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { StyledContainer } from '../MiscStyling';
import { useNavigate } from "react-router-dom";
import useCrudStateDB from '../hooks/useCrudStateDB'

const StyledArticle = styled.article`
  width: 800px;
  max-width: 80vw;
  border: 1px solid gray;
  padding: 2%;

  span {
    color: gray;
  }
`

const StyledNavLink = styled.h3`
  color: var(--bright-blue);
  text-decoration: underline;
  cursor: pointer;
`

const Forums = ({ forums }) => {
  const navigate = useNavigate();

  const handleNavigation = (forum) => {
    navigate(`/forums/${forum.id}`, { state: { forum } });
  };

  return (
      <StyledContainer>
        {forums.length === 0 ?
          <span>No forums to show</span> :
          (forums.map(forum=>
            <StyledArticle key={forum.title}>
              <span>{forum.user.username}</span>
              <StyledNavLink onClick={()=>handleNavigation(forum)}>{forum.title}</StyledNavLink>
              <p><strong>Category: </strong>{forum.category}</p>
            </StyledArticle>
          ))
        }
        <hr />
      </StyledContainer>
    );
  };
  
  export default Forums;
  
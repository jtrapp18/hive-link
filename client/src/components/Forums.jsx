import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { StyledContainer } from '../MiscStyling';
import { formattedTime } from '../helper';
import MotionWrapper from '../styles/MotionWrapper'

const StyledArticle = styled.article`
  width: 800px;
  max-width: 80vw;
  border: 1px solid gray;
  padding: 2%;

  span {
    color: gray;
  }
`

const StyledNavLink = styled(NavLink)`
  color: var(--bright-blue);
  text-decoration: underline;
  cursor: pointer;
`

const Forums = ({ forums }) => {

  return (
      <StyledContainer> 
        {forums.length === 0 ?
          <span>No forums to show</span> :
          (forums.map((forum, index) =>
            <MotionWrapper index={index}>
              <StyledArticle key={forum.title}> 
                <span>{forum.user.username} | {formattedTime(forum.createdAt)}</span>
                <StyledNavLink
                  to={`${forum.id}`}
                >
                  <h3>{forum.title}</h3>
                </StyledNavLink>
                <p><strong>Category: </strong>{forum.category}</p>
              </StyledArticle>
            </MotionWrapper>
          ))
        }
        <hr />
      </StyledContainer>
    );
  };
  
  export default Forums;
  
import { CardContainer } from '../MiscStyling';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { StyledContainer } from '../MiscStyling';

const StyledArticle = styled.article`
  width: 80%;

  span {
    color: gray;
  }

`

const StyledNavLink = styled(NavLink)`
  color: var(--bright-blue);
  text-decoration: underline;
`

const Forums = ({ forums, forumCardProps }) => {

  return (
      <StyledContainer>
        {forums.length === 0 ?
          <span>No forums to show</span> :
          (forums.map(forum=>
            <StyledArticle key={forum.title}>
              <span>{forum.user.username}</span>
              <StyledNavLink
                to={`${forum.id}`}
                className="nav-link"
              >
                <h3>{forum.title}</h3>
              </StyledNavLink>
              <p><strong>Category: </strong>{forum.category}</p>
            </StyledArticle>
          ))
        }
        <hr />
      </StyledContainer>
    );
  };
  
  export default Forums;
  
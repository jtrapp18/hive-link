import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  &:hover {
    color: var(--bright-blue);
  }
`
const StyledMessage = styled.p`
  color: gray;
`

const AnalyticsLink = () => {

  return (
        <StyledMessage>
            Check out the
            <StyledNavLink to='/analysis'> Analysis page </StyledNavLink>
            for trends and insights on your hives!
        </StyledMessage>
  );
};

export default AnalyticsLink;

import {useContext} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { StyledContainer } from "../MiscStyling";
import AccountForm from '../forms/AccountForm';
import styled from "styled-components";

const StyledDiv = styled(StyledContainer)`
  padding-top: 20px;
`

const AccountDetails = () => {
  const { user } = useContext(UserContext);

  if (!user) return <Login errMessage="Must be logged in to view account details"/>

    return (
      <StyledDiv>
        <AccountForm />
      </StyledDiv>
  );
};
  
  export default AccountDetails;
  
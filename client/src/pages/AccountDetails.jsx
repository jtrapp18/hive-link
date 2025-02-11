import {useContext} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { StyledContainer } from "../MiscStyling";
import AccountForm from '../forms/AccountForm';

const AccountDetails = () => {
  const { user } = useContext(UserContext);

  if (!user) return <Login errMessage="Must be logged in to view account details"/>

    return (
      <StyledContainer>
        <AccountForm />
      </StyledContainer>
  );
};
  
  export default AccountDetails;
  
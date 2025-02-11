import { useContext, lazy} from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import HiveCard from '../cards/HiveCard';
import {UserContext} from '../context/userProvider'
import Login from './Login';
import { CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import { Button } from '../MiscStyling';
import { StyledContainer } from '../MiscStyling';
import MotionWrapper from '../styles/MotionWrapper';

const HiveForm = lazy(() => import('../forms/HiveForm'));

const Hives = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { hives } = useOutletContext();
  const {PopupForm, setShowNewForm, setActiveItem} = usePopupForm(HiveForm);

  if (!user) return <Login errMessage="Must be logged in to view hives"/>

  const viewHive = (hive) => {
    setShowNewForm(false);
    setActiveItem(hive);
  }

  return (
      <StyledContainer>
        <h1>My Hives</h1>
        <p>Click on any hive to manage details, honey pulls, and/or inspections</p>
        <h3>. . . . . </h3>
        <Button onClick={()=>setShowNewForm(true)}>Register New Hive</Button>        
        <br />
        <CardContainer>
          <PopupForm
            viewHive={viewHive}
          />
          {hives.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .map((hive, index)=>
            <MotionWrapper key={hive.id} index={index}>
              <HiveCard
                  {...hive}
              />
            </MotionWrapper>
          )}
        </CardContainer>
      </StyledContainer>
    );
  };
  
  export default Hives;
  
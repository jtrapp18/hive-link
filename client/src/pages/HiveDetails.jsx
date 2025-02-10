import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HiveCard from '../cards/HiveCard';
import { useNavigate } from 'react-router-dom';
import {useOutletContext} from "react-router-dom";
import HiveForm from '../forms/HiveForm'
import InspectionCard from '../cards/InspectionCard'
import HoneyCard from '../cards/HoneyCard'
import { CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import HoneyForm from '../forms/HoneyForm'
import InspectionForm from '../forms/InspectionForm'
import Loading from './Loading'
import styled from 'styled-components';
import { Button, HexagonButton, StyledContainer } from '../MiscStyling';
import HiveToast from '../styles/HiveToast';
import DrippingHoney from '../components/DrippingHoney'
import BackButton from '../components/BackButton';
import MotionWrapper from '../styles/MotionWrapper';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`

const HiveCardContainer = styled.article`
  display: flex;
  justify-content: center;

  &.shrunken {
    zoom: .5;
  }
`

const HiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives, setHives } = useOutletContext();
  const navigate = useNavigate();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [activeTab, setActiveTab] = useState(null);
  const [shrinkCard, setShrinkCard] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const {PopupForm: HivePopup, setActiveItem: setActiveHive, setShowNewForm: setShowNewHive} = usePopupForm(HiveForm);
  const {PopupForm: HoneyPullPopup, setActiveItem: setActiveHoneyPull, setShowNewForm: setShowNewHoneyPull} = usePopupForm(HoneyForm);
  const {PopupForm: InspectionPopup, setActiveItem: setActiveInspection, setShowNewForm: setShowNewInspection} = usePopupForm(InspectionForm);

  if (!hive) {return <Loading />}

  const inspections = hive.honeyPulls.reduce((inspections, honeyPull) => [...inspections, ...honeyPull.inspections], [])
  const activeHoneyPull = hive.honeyPulls.find(honeyPull=>!honeyPull.datePulled)

  const viewHoney = (honeyPull) => {
    setShowNewHoneyPull(false);
    setActiveHoneyPull(honeyPull);
  }

  const viewInspection = (inspection) => {
    setShowNewInspection(false);
    setActiveInspection(inspection);
  }

  const clickNewHoney = () => {
    if (activeHoneyPull) {
      setShowToast('honey');
    }
    else {
      setShowNewHoneyPull(true);
    }
  }

  const clickNewInspection = () => {
    if (!activeHoneyPull) {
      setShowToast('inspection');
    }
    else {
      setShowNewInspection(true);
    }
  }

  const clickEdit = () => {
    setActiveTab('editDetails');
    setActiveHive(hive);
    setShrinkCard(false);
  }

  const clickOther = (tab) => {
    setActiveTab(tab);
    setShrinkCard(true);
  }

  return (
    <StyledContainer>
      <BackButton />
      <h1>Hive Details</h1>
      <HiveCardContainer onClick={clickEdit} className={shrinkCard ? "shrunken" : ""}>
        <HiveCard
          {...hive}
        />
      </HiveCardContainer>
      <ButtonContainer>
        <HexagonButton isActive={activeTab==='editDetails'} onClick={clickEdit}>Edit Details</HexagonButton>
        <HexagonButton isActive={activeTab==='honeyPulls'} onClick={()=>clickOther('honeyPulls')}>Honey Pulls</HexagonButton>
        <HexagonButton isActive={activeTab==='inspections'} onClick={()=>clickOther('inspections')}>Inspections</HexagonButton>
      </ButtonContainer>
      <HivePopup
        viewHive={setActiveHive}
      />
      {activeTab==='honeyPulls' &&
        <>
          <DrippingHoney />
          <h3>Honey Pulls</h3>
          <div>
            <Button onClick={clickNewHoney}>Add Honey Pull</Button>
            {showToast==='honey' && 
              <HiveToast 
                onClose={()=>setShowToast(null)}
              >
                Need to record pull date and weight of current round before adding new honey pull
              </HiveToast>
            }
          </div>
          <CardContainer>
            <HoneyPullPopup
              viewHoney={viewHoney}
            />
            {hive.honeyPulls
            .sort((a, b) => new Date(b.dateReset) - new Date(a.dateReset)) // Sort by date in descending order
            .map((honeyPull, index) => (
              <MotionWrapper index={index}>
                <HoneyCard
                  key={honeyPull.id}
                  honeyPull={honeyPull}
                  setActiveHoneyPull={setActiveHoneyPull}
                />
              </MotionWrapper>
            ))}
          </CardContainer>
        </>
      }
      {activeTab==='inspections' &&
        <>
          <h3>Inspections</h3>
          <div>
            <Button onClick={clickNewInspection}>Add Hive Inspection</Button>
            {showToast==='inspection' && 
              <HiveToast 
                onClose={()=>setShowToast(null)}
              >
                Need to set up an active honey pull round before adding a new inspection
              </HiveToast>
            }
          </div>
          <CardContainer>
            <InspectionPopup 
              honeyPullId={activeHoneyPull.id}
              viewInspection={viewInspection}
            />
            {inspections
            .sort((a, b) => new Date(b.dateChecked) - new Date(a.dateChecked)) // Sort by date in descending order
            .map((inspection, index) => (
              <MotionWrapper index={index}>
                <InspectionCard
                  key={inspection.id}
                  inspection={inspection}
                  setActiveInspection={setActiveInspection}
                />
              </MotionWrapper>
            ))}
          </CardContainer>
        </>
      }
    </StyledContainer>
  );
};

export default HiveDetails;

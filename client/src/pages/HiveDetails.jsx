import { lazy, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useOutletContext} from "react-router-dom";
import { HexagonButton, StyledContainer } from '../MiscStyling';
import Loading from './Loading';
import styled from 'styled-components';
import usePopupForm from '../hooks/usePopupForm';
import BackButton from '../components/BackButton';
import HiveCard from '../cards/HiveCard';

const HiveForm = lazy(() => import('../forms/HiveForm'));
const HoneyPulls = lazy(() => import('../components/HoneyPulls'));
const Inspections = lazy(() => import('../components/Inspections'));

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
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [activeTab, setActiveTab] = useState(null);
  const [shrinkCard, setShrinkCard] = useState(false);
  const {PopupForm: HivePopup, setActiveItem: setActiveHive} = usePopupForm(HiveForm);

  if (!hive) {return <Loading />}

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
          <HoneyPulls />
        }
        {activeTab==='inspections' &&
          <Inspections />
        }
    </StyledContainer>
  );
};

export default HiveDetails;

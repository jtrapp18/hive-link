import { lazy, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {useOutletContext} from "react-router-dom";
import { HexagonButton, HexButtonContainer, StyledContainer } from '../MiscStyling';
import Loading from './Loading';
import styled from 'styled-components';
import usePopupForm from '../hooks/usePopupForm';
import BackButton from '../components/BackButton';
import HiveCard from '../cards/HiveCard';
import AnalyticsLink from '../components/AnalyticsLink';
import { WindowWidthContext } from '../context/windowSize';

const HiveForm = lazy(() => import('../forms/HiveForm'));
const HoneyPulls = lazy(() => import('../components/HoneyPulls'));
const Inspections = lazy(() => import('../components/Inspections'));

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
  const { isMobile } = useContext(WindowWidthContext);
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
      <HexButtonContainer>
        <HexagonButton isMobile={isMobile} isActive={activeTab==='editDetails'} onClick={clickEdit}>Edit Details</HexagonButton>
        <HexagonButton isMobile={isMobile} isActive={activeTab==='honeyPulls'} onClick={()=>clickOther('honeyPulls')}>Honey Pulls</HexagonButton>
        <HexagonButton isMobile={isMobile} isActive={activeTab==='inspections'} onClick={()=>clickOther('inspections')}>Inspections</HexagonButton>
      </HexButtonContainer>
      <HivePopup
        viewHive={setActiveHive}
      />
      {!activeTab &&
        <div>
          <p>Click 'Edit Details' to modify your hive's information, or select 'Honey Pulls' or 'Inspections' to view, add, or update honey recordings and inspection data.</p>
          <AnalyticsLink />
        </div>
      }

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

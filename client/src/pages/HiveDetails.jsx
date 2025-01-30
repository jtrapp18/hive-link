import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HiveCard from '../cards/HiveCard';
import {useOutletContext} from "react-router-dom";
import HiveForm from '../forms/HiveForm'
import InspectionCard from '../cards/InspectionCard'
import QueenCard from '../cards/QueenCard'
import { CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import QueenForm from '../forms/QueenForm'
import InspectionForm from '../forms/InspectionForm'
import Loading from './Loading'
import styled from 'styled-components';
import { Button, HexagonButton } from '../MiscStyling';

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
  const {PopupForm: HivePopup, setActiveItem: setActiveHive, setShowNewForm: setShowNewHive} = usePopupForm(HiveForm);
  const {PopupForm: QueenPopup, setActiveItem: setActiveQueen, setShowNewForm: setShowNewQueen} = usePopupForm(QueenForm);
  const {PopupForm: InspectionPopup, setActiveItem: setActiveInspection, setShowNewForm: setShowNewInspection} = usePopupForm(InspectionForm);

  if (!hive) {return <Loading />}

  const inspections = hive.queens.reduce((inspections, queen) => [...inspections, ...queen.inspections], [])

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
    <main>
      <h1>Hive Details</h1>
      <HiveCardContainer className={shrinkCard ? "shrunken" : ""}>
        <HiveCard
          {...hive}
        />
      </HiveCardContainer>
      <ButtonContainer>
        <HexagonButton onClick={()=>clickOther('inspections')}>Inspections</HexagonButton>     
        <HexagonButton onClick={()=>clickOther('queens')}>Queens</HexagonButton>    
        <HexagonButton onClick={clickEdit}>Edit Details</HexagonButton>
      </ButtonContainer>
      <HivePopup />
      {activeTab==='queens' &&
        <>
          <h3>Queens</h3>
          <CardContainer>
            <Button onClick={()=>setShowNewQueen(true)}>Add Queen to Hive</Button>
            <QueenPopup />
            {hive.queens.map(queen=>
                <QueenCard
                    key={queen.id}
                    queen={queen}
                    setActiveQueen={setActiveQueen}
                />
            )}
          </CardContainer>
        </>
      }
      {activeTab==='inspections' &&
        <>
          <h3>Inspections</h3>
          <Button onClick={()=>setShowNewInspection(true)}>Add Hive Inspection</Button>
          <CardContainer>
            <InspectionPopup />
            {inspections.map(inspection=>
                <InspectionCard
                    key={inspection.id}
                    inspection={inspection}
                    setActiveInspection={setActiveInspection}
                />
            )}
          </CardContainer>
        </>
      }
    </main>
  );
};

export default HiveDetails;

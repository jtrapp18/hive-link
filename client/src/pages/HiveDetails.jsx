import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HiveCard from '../cards/HiveCard';
import {useOutletContext} from "react-router-dom";
import HiveForm from '../forms/HiveForm'
import InspectionCard from '../cards/InspectionCard'
import QueenCard from '../cards/QueenCard'
import { CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import useCrud from '../hooks/useCrud';
import QueenForm from '../forms/QueenForm'
import InspectionForm from '../forms/InspectionForm'
import Loading from './Loading'
import styled from 'styled-components';
import { Button, HexagonButton } from '../MiscStyling';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  // background: var(--yellow);
  // // align-items: end;

`

const HiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [activeTab, setActiveTab] = useState(null);
  const {PopupForm: HivePopup, setActiveItem: setActiveHive, setShowNewForm: setShowNewHive} = usePopupForm(HiveForm);
  const {PopupForm: QueenPopup, setActiveItem: setActiveQueen, setShowNewForm: setShowNewQueen} = usePopupForm(QueenForm);
  const {PopupForm: InspectionPopup, setActiveItem: setActiveInspection, setShowNewForm: setShowNewInspection} = usePopupForm(InspectionForm);

  if (!hive) {return <Loading />}

  const inspections = hive.queens.reduce((inspections, queen) => [...inspections, ...queen.inspections], [])

  return (
    <main>
      <h1>Hive Details</h1>
      <HiveCard
        {...hive}
      />
      <ButtonContainer>
        <HexagonButton onClick={()=>setActiveTab('inspections')}>Inspections</HexagonButton>     
        <HexagonButton onClick={()=>setActiveTab('queens')}>Queens</HexagonButton>    
        <HexagonButton onClick={()=>setActiveHive(hive)}>Edit Details</HexagonButton>
      </ButtonContainer>
      <HivePopup />
      {activeTab==='queens' &&
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
      }
      {activeTab==='inspections' &&
        <CardContainer>
          <Button onClick={()=>setShowNewInspection(true)}>Add Hive Inspection</Button>
          <InspectionPopup />
          {inspections.map(inspection=>
              <InspectionCard
                  key={inspection.id}
                  inspection={inspection}
                  setActiveInspection={setActiveInspection}
              />
          )}
        </CardContainer>
      }
    </main>
  );
};

export default HiveDetails;

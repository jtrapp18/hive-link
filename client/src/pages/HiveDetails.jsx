import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import HiveCard from '../components/HiveCard'; // Import CookieCard
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';
import HiveForm from '../components/HiveForm'
import InspectionCard from '../components/InspectionCard'
import QueenCard from '../components/QueenCard'
import { CardContainer } from '../MiscStyling';

const HiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('');

  if (!hive) {
    return <main>Loading...</main>; // Error handling if cookie is null
  }
  return (
    <main>
      <h1>Hive Details</h1>
      <HiveCard
        {...hive}
      />
      <div className="btn-container">
        <button onClick={()=>setActiveTab('inspections')}>Inspections</button>     
        <button onClick={()=>setActiveTab('queens')}>Queens</button>    
        <button onClick={()=>setActiveTab('edit_details')}>Edit Details</button>
      </div>
      {activeTab==='edit_details' &&
        <HiveForm
          hive={hive}
        />
      }
      {activeTab==='queens' &&
        <CardContainer>
          {hive.queens.map(queen=>
              <QueenCard
                  key={queen.id}
                  {...queen}
              />
          )}
        </CardContainer>
      }
      {activeTab==='inspections' &&
        <CardContainer>
          {hive.inspections.map(inspection=>
              <InspectionCard
                  key={inspection.id}
                  {...inspection}
              />
          )}
        </CardContainer>
      }
    </main>
  );
};

export default HiveDetails;

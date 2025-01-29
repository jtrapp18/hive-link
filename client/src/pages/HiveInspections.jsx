import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import HiveCard from '../components/HiveCard'; // Import CookieCard
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';
import InspectionCard from '../components/InspectionCard'
import { CardContainer } from '../MiscStyling';

const HiveInspections = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));

  if (!id) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  if (!hives) {
    return <div>Error loading hive inspections.</div>; // Error handling if cookie is null
  }
  return (
    <main>
        <h1>Hive Inspections</h1>
        <HiveCard
            {...hive}
        />
        <CardContainer>
            {hive.inspections.map(inspection=>
                <InspectionCard
                    key={inspection.id}
                    {...inspection}
                />
            )}
        </CardContainer>
    </main>
  );
};

export default HiveInspections;

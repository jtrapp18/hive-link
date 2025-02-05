import React, { useContext } from 'react';
import TrendChart from './TrendChart';
import MultiLine from './MultiLine';
import Loading from '../pages/Loading'
import { StyledAnalysis } from '../MiscStyling';
import GraphSectionHeader from '../styles/GraphSectionHeader'
import {useOutletContext} from "react-router-dom";
import { CardContainer } from '../MiscStyling';
import AnalysisCard from '../cards/AnalysisCard';
import { UserContext } from '../context/userProvider';

const AnalysisUser = () => {
    const { user } = useContext(UserContext);
    const { hives } = useOutletContext();
    const userHives = hives.filter((hive) => hive.userId === user.id)

    return (
      <main>
        <h1>My Hives</h1>
        <p>Click on any hives to manage details</p>
        <h3>. . . . . </h3>      
        <br />
        <CardContainer>
          {userHives.map(hive=>
            <AnalysisCard
                key={hive.id}
                hive={hive}
            />
          )}
        </CardContainer>
      </main>
    );
}

export default AnalysisUser;

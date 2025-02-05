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
      <StyledAnalysis>
        <h2>Recommendations for My Hives</h2>
        <br />
        <CardContainer>
          {userHives.map(hive=>
            <AnalysisCard
                key={hive.id}
                hive={hive}
            />
          )}
        </CardContainer>
      </StyledAnalysis>
    );
}

export default AnalysisUser;

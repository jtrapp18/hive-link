import React, { useContext } from 'react';
import { StyledContainer } from '../MiscStyling';
import {useOutletContext} from "react-router-dom";
import { CardContainer } from '../MiscStyling';
import AnalysisCard from '../cards/AnalysisCard';
import { UserContext } from '../context/userProvider';

const AnalysisUser = () => {
    const { user } = useContext(UserContext);
    const { hives, predictionData } = useOutletContext();
    const userHives = hives.filter((hive) => hive.userId === user.id)
    const predictions = predictionData.predicted

    return (
      <StyledContainer>
        <h2>Recommendations for My Hives</h2>
        <CardContainer>
          {userHives.map(hive=>
            <AnalysisCard
                key={hive.id}
                hive={hive}
                prediction={predictions[hive.id]}
            />
          )}
        </CardContainer>
      </StyledContainer>
    );
}

export default AnalysisUser;

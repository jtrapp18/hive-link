import React, { useContext } from 'react';
import TrendChart from './TrendChart';
import MultiLine from './MultiLine';
import Loading from '../pages/Loading'
import { StyledContainer } from '../MiscStyling';
import GraphSectionHeader from '../styles/GraphSectionHeader'
import {useOutletContext} from "react-router-dom";
import { CardContainer } from '../MiscStyling';
import AnalysisCard from '../cards/AnalysisCard';
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';

const AnalysisUser = () => {
    const { user } = useContext(UserContext);
    const { hives, predictions } = useOutletContext();
    const userHives = hives.filter((hive) => hive.userId === user.id)

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

import React, { useState, useContext } from 'react';
import TrendChart from '../graphing/TrendChart';
import {useOutletContext} from "react-router-dom";
import { prepareDataForPlot } from '../graphing/dataProcessing';
import GraphOptions from '../graphing/GraphOptions';
import styled from 'styled-components';
import Loading from './Loading'
import AnalysisGrid from '../graphing/AnalysisGrid';
import { Button, HexagonButton } from '../MiscStyling';
import { UserContext } from '../context/userProvider';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`

const Analysis = () => {
    const { user } = useContext(UserContext);
    const { graphData, graphDataUser } = useOutletContext();
    const [activeTab, setActiveTab] = useState('allUsers');

    if (graphData.length===0) return <Loading />

    return (
        <main>
            <h1>Exploratory Analysis</h1>
            <ButtonContainer>
                <HexagonButton onClick={()=>setActiveTab('userOnly')}>My Stats</HexagonButton>
                {user && <HexagonButton onClick={()=>setActiveTab('allUsers')}>All Stats</HexagonButton>}
            </ButtonContainer>
            {activeTab==='userOnly' &&
                <AnalysisGrid
                    graphData={graphDataUser}
                    label='My Hive Statistics'
                />
            }
            {activeTab==='allUsers' &&
                <AnalysisGrid
                    graphData={graphData}
                    label='Hive Statistics for All Users'
                />
            }
        </main>
    );
}

export default Analysis;

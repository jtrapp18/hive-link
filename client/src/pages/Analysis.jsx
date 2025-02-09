import React, { useState, useContext, useEffect } from 'react';
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';
import Loading from './Loading'
import AnalysisHoney from '../graphing/AnalysisHoney';
import AnalysisHealth from '../graphing/AnalysisHealth';
import { HexagonButton, StyledContainer } from '../MiscStyling';
import { UserContext } from '../context/userProvider';
import AnalysisUser from '../graphing/AnalysisUser';
import ExpStudyResults from '../components/ExpStudyResults';
import { getJSON, snakeToCamel } from '../helper';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`

const FeaturesContainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    li, p {
        color: gray;
    }

    ol {
        width: 100%;
        column-count: 3;
        column-gap: space-between;  
    }
`

const Analysis = () => {
    const { user } = useContext(UserContext);
    const { graphData, graphDataUser } = useOutletContext();
    const [activeTab, setActiveTab] = useState(!user ? 'honeyAll' : 'hivesUser');
    const [studyResults, setStudyResults] = useState({});

    // Fetching study results
    useEffect(() => {
        console.log('logging study results...')
        getJSON("exp_study")
          .then((data) => {
            const dataTransformed = snakeToCamel(data);
            setStudyResults(dataTransformed)
          });
      }, []);

    const toProperCase = str => str.replace(/_/g, ' ').replace(/\b\w/g, match => match.toUpperCase());

    if (!studyResults) return <Loading />
    if (graphData.length===0) return <Loading />

    return (
        <StyledContainer>
            <h1>Hive Analysis</h1>
            <ButtonContainer>
                {user && <HexagonButton isActive={activeTab==='hivesUser'} onClick={()=>setActiveTab('hivesUser')}>My Hives</HexagonButton>}
                {user && <HexagonButton isActive={activeTab==='honeyUser'} onClick={()=>setActiveTab('honeyUser')}>Honey Stats</HexagonButton>}
                {user && <HexagonButton isActive={activeTab==='healthUser'} onClick={()=>setActiveTab('healthUser')}>Hive Stats</HexagonButton>}                
                <HexagonButton isActive={activeTab==='honeyAll'} onClick={()=>setActiveTab('honeyAll')}>Honey Trends</HexagonButton>
                <HexagonButton isActive={activeTab==='healthAll'} onClick={()=>setActiveTab('healthAll')}>Hive Trends</HexagonButton>
            </ButtonContainer>
            {activeTab==='hivesUser' &&
                <AnalysisUser />
            }
            {activeTab==='honeyUser' &&
                <AnalysisHoney
                    filters={['user']}
                    graphData={graphDataUser.aggregated}
                    label='My Honey Statistics'
                />
            }
            {activeTab==='healthUser' &&
                <AnalysisHealth
                    filters={['user']}
                    graphData={graphDataUser.normalized}
                    label='My Hive Statistics'
                />
            }
            {activeTab==='honeyAll' &&
                <>
                    <ExpStudyResults />
                    <AnalysisHoney
                        filters={[]}
                        graphData={graphData.aggregated}
                        label='Honey Statistics for All Users'
                    />
                </>
            }
            {activeTab==='healthAll' &&
                <AnalysisHealth
                    filters={[]}
                    graphData={graphData.normalized}
                    label='Hive Statistics for All Users'
                />
            }
        </StyledContainer>
    );
}

export default Analysis;

import React, { useState, useContext, useEffect, lazy } from 'react';
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';
import Loading from './Loading'
import { HexagonButton, StyledContainer } from '../MiscStyling';
import { UserContext } from '../context/userProvider';
import { getJSON, snakeToCamel } from '../helper';
import DrippingHoney from '../components/DrippingHoney';
import HexagonDesign from '../components/HexagonDesign';
import {WindowWidthContext} from '../context/windowSize'

const AnalysisHoney = lazy(() => import('../graphing/AnalysisHoney'));
const AnalysisHealth = lazy(() => import('../graphing/AnalysisHealth'));
const AnalysisUser = lazy(() => import('../graphing/AnalysisUser'));
const ExpStudyResults = lazy(() => import('../components/ExpStudyResults'));

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 0;
`

const Analysis = () => {
    const { user } = useContext(UserContext);
    const { isMobile } = useContext(WindowWidthContext);
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

    if (!studyResults) return <Loading />
    if (graphData.length===0) return <Loading />

    return (
        <StyledContainer>
            {(activeTab==='honeyUser' || activeTab==='honeyAll') && <DrippingHoney />}
            {(activeTab==='healthUser' || activeTab==='healthAll') && <HexagonDesign/>}
            <h1>Hive Analysis</h1>
            <ButtonContainer>
                {user && <HexagonButton isMobile={isMobile} isActive={activeTab==='hivesUser'} onClick={()=>setActiveTab('hivesUser')}>My Hives</HexagonButton>}
                {user && <HexagonButton isMobile={isMobile} isActive={activeTab==='honeyUser'} onClick={()=>setActiveTab('honeyUser')}>Honey Stats</HexagonButton>}
                {user && <HexagonButton isMobile={isMobile} isActive={activeTab==='healthUser'} onClick={()=>setActiveTab('healthUser')}>Hive Stats</HexagonButton>}                
                <HexagonButton isMobile={isMobile} isActive={activeTab==='honeyAll'} onClick={()=>setActiveTab('honeyAll')}>Honey Trends</HexagonButton>
                <HexagonButton isMobile={isMobile} isActive={activeTab==='healthAll'} onClick={()=>setActiveTab('healthAll')}>Hive Trends</HexagonButton>
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

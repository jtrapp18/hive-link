import React, { useState, useContext } from 'react';
import TrendChart from '../graphing/TrendChart';
import {useOutletContext} from "react-router-dom";
import { prepareDataForPlot } from '../graphing/dataProcessing';
import GraphOptions from '../graphing/GraphOptions';
import styled from 'styled-components';
import Loading from './Loading'
import AnalysisHoney from '../graphing/AnalysisHoney';
import AnalysisHealth from '../graphing/AnalysisHealth';
import { Button, HexagonButton } from '../MiscStyling';
import { UserContext } from '../context/userProvider';
import AnalysisUser from '../graphing/AnalysisUser';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`

const Analysis = () => {
    const { user } = useContext(UserContext);
    const { graphData, graphDataUser } = useOutletContext();
    const [activeTab, setActiveTab] = useState('healthAll');

    if (graphData.length===0) return <Loading />

    return (
        <main>
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
                <AnalysisHoney
                    filters={[]}
                    graphData={graphData.aggregated}
                    label='Honey Statistics for All Users'
                />
            }
            {activeTab==='healthAll' &&
                <AnalysisHealth
                    filters={[]}
                    graphData={graphData.normalized}
                    label='Hive Statistics for All Users'
                />
            }
        </main>
    );
}

export default Analysis;

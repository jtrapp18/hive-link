import React, { useState } from 'react';
import TrendChart from './TrendChart';
import {useOutletContext} from "react-router-dom";
import GraphOptions from './GraphOptions';
import styled from 'styled-components';
import Loading from '../pages/Loading'

const StyledAnalysis = styled.div`
    width: 95%;

    display: flex;
    flex-direction: column;
    padding: 5%;
    justify-content: center;

    .graph-container {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 1%;    
    }
`

const AnalysisGrid = ({aggData, label}) => {

    // const { hives, aggData } = useOutletContext();
    const [filters, setFilters] = useState({
        user: false
      });
    const [explanatoryVar, setExplanatoryVar] = useState('dateAdded');
    const [target, setTarget] = useState('temp');

    if (aggData.length===0) return <Loading />

    return (
        <StyledAnalysis>
            <h3>{label}</h3>
            <div className='graph-container'>
                <TrendChart
                    data={aggData}
                    xCol={explanatoryVar}
                    yCol={target}
                />
                <TrendChart
                    data={aggData}
                    xCol={explanatoryVar}
                    yCol={target}
                />
                <TrendChart
                    data={aggData}
                    xCol={explanatoryVar}
                    yCol={target}
                />
                <div>
                    <TrendChart
                        data={aggData}
                        xCol={explanatoryVar}
                        yCol={target}
                    />
                    <GraphOptions
                        filters={filters}
                        setFilters={setFilters}
                        target={target}
                        setTarget={setTarget}
                        explanatoryVar={explanatoryVar}
                        setExplanatoryVar={setExplanatoryVar}
                    />
                </div>
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisGrid;

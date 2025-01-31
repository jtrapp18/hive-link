import React, { useState } from 'react';
import TrendChart from '../graphing/TrendChart';
import {useOutletContext} from "react-router-dom";
import { prepareDataForPlot } from '../graphing/dataProcessing';
import GraphOptions from '../graphing/GraphOptions';
import styled from 'styled-components';

const StyledAnalysis = styled.div`
    width: 600px;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    padding: 2%;
`

const Analysis = () => {

    const { hives } = useOutletContext();    
    const [filters, setFilters] = useState({
        user: false
      });
    const [explanatoryVar, setExplanatoryVar] = useState({
        table: '',
        variable: ''
    });
    const [target, setTarget] = useState({
        value: '',
        variable: ''
    });

    const filteredHives = hives
    const plotData = prepareDataForPlot(filteredHives, explanatoryVar, target);
    const title = 'Hive Trend Over Time'
    const xInfo = {title: 'Date', type: 'date'}
    const yInfo = {title: 'Temperature (°C)'}

    return (
        <main>
            <h1>Exploratory Analysis</h1>
            <StyledAnalysis>
                <TrendChart
                    plotData={plotData}
                    title={title}
                    xInfo={xInfo}
                    yInfo={yInfo}
                />
                <GraphOptions
                    filters={filters}
                    setFilters={setFilters}
                    target={target}
                    setTarget={setTarget}
                    explanatoryVar={explanatoryVar}
                    setExplanatoryVar={setExplanatoryVar}
                />
            </StyledAnalysis>
        </main>
    );
}

export default Analysis;

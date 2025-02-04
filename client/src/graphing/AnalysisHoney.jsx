import React, { useState } from 'react';
import TrendChart from './TrendChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import {useOutletContext} from "react-router-dom";
import GraphOptions from './GraphOptions';
import styled from 'styled-components';
import Loading from '../pages/Loading'
import { StyledAnalysis } from '../MiscStyling';
 
const AnalysisHoney = ({graphData, label}) => {

    if (!graphData) return <Loading />

    if (graphData.length===0) return <Loading />

    return (
        <StyledAnalysis>
            <h3>{label}</h3>
            <br />
            <div className='graph-container'>
                <PieChart
                    data={graphData}
                    title={'Honey Production by Hive'}
                    labelCol='hiveId'
                    valueCol='weight'
                />
                <TrendChart
                    data={graphData}
                    title={'Honey Production by Average Temperature'}
                    x={{dataCol: 'temp', label: 'Average Temperature'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <BarChart
                    data={graphData}
                    title={'Honey Production by Average Temperature'}
                    x={{dataCol: 'temp', label: 'Average Temperature'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                {/* <div>
                    <TrendChart
                        data={graphData.aggregated}
                        title={'something'}
                        x={{dataCol: explanatoryVar, label: 'something'}}
                        y={{dataCol: target, label: 'something'}}
                    />
                    <GraphOptions
                        filters={filters}
                        setFilters={setFilters}
                        target={target}
                        setTarget={setTarget}
                        explanatoryVar={explanatoryVar}
                        setExplanatoryVar={setExplanatoryVar}
                    />
                </div> */}
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

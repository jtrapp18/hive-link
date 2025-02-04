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
            </div>
            <h3>Pests</h3>
            <div className='graph-container'>
                {/* <TrendChart
                    data={graphData}
                    title={'Impact of Ants on Honey Production'}
                    x={{dataCol: 'antsPresent', label: '# Inspections with Ants Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                /> */}
                <TrendChart
                    data={graphData}
                    title={'Impact of Slugs on Honey Production'}
                    x={{dataCol: 'slugsPresent', label: '# Inspections with Slugs Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                {/* <TrendChart
                    data={graphData}
                    title={'Impact of Hive Beetles on Honey Production'}
                    x={{dataCol: 'hiveBeetlesPresent', label: '# Inspections with Hive Beetles Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                /> */}
                {/* <TrendChart
                    data={graphData}
                    title={'Impact of Wax Moths on Honey Production'}
                    x={{dataCol: 'waxMothsPresent', label: '# Inspections with Wax Moths Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Impact of Wasps on Honey Production'}
                    x={{dataCol: 'waspsHornetsPresent', label: '# Inspections with Wasps Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Impact of Mice on Honey Production'}
                    x={{dataCol: 'micePresent', label: '# Inspections with Mice Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Impact of Robber Bees on Honey Production'}
                    x={{dataCol: 'robberBeesPresent', label: '# Inspections with Robber Bees Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                /> */}
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

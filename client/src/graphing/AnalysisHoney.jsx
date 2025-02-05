import React, { useState } from 'react';
import TrendChart from './TrendChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import {useOutletContext} from "react-router-dom";
import GraphOptions from './GraphOptions';
import styled from 'styled-components';
import { StyledAnalysis } from '../MiscStyling';
import GraphSectionHeader from '../styles/GraphSectionHeader'

const AnalysisHoney = ({graphData, label, filters}) => {

    const isUserOnly = filters.includes('user')
    const pieSplit = isUserOnly ? 'hiveId' : 'state'

    if (!graphData) return <h3>Loading...</h3>

    if (graphData.length===0) return <h3>Loading...</h3>

    if (graphData.weight.length===0) return <h3>No honey pulls have been recorded</h3>

    return (
        <StyledAnalysis>
            <h2>{label}</h2>
            <GraphSectionHeader>Basic Statistics</GraphSectionHeader>
            <div className='graph-container'>
                <PieChart
                    data={graphData}
                    title={`Honey Production by ${pieSplit==='hiveId' ? 'Hive' : 'State'}`}
                    labelCol={pieSplit}
                    valueCol='weight'
                />
            </div>
            <GraphSectionHeader>Impact of Temperature</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Honey Production by Average Temperature'}
                    x={{dataCol: 'temp', label: 'Average Temperature'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Honey Production by Average Humidity'}
                    x={{dataCol: 'humidity', label: 'Average Humidity'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
            </div>
            <GraphSectionHeader>Impact of Pests</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Impact of Ants on Honey Production'}
                    x={{dataCol: 'antsPresent', label: '# Inspections with Ants Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Impact of Slugs on Honey Production'}
                    x={{dataCol: 'slugsPresent', label: '# Inspections with Slugs Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Impact of Hive Beetles on Honey Production'}
                    x={{dataCol: 'hiveBeetlesPresent', label: '# Inspections with Hive Beetles Present'}}
                    y={{dataCol: 'weight', label: 'Honey Production (lbs)'}}
                />
                <TrendChart
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
                />
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

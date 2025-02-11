import { useState } from 'react';
import TrendChart from './TrendChart';
import PieChartComponent from './PieChart';
import { StyledAnalysis } from '../MiscStyling';
import GraphSectionHeader from '../styles/GraphSectionHeader'
import Loading from '../pages/Loading';
import { camelToProperCase } from '../helper'
import DrippingHoney from '../components/DrippingHoney'

const AnalysisHoney = ({graphData, label, filters}) => {

    const isUserOnly = filters.includes('user')
    const pieSplit = isUserOnly ? 'hiveId' : 'state'
    const [selectedSlice, setSelectedSlice] = useState(null);
    const filterLabel = !selectedSlice ? '' : `${selectedSlice.labelCol}: ${selectedSlice.labelFilter}`

    if (!graphData) return <Loading />
    if (graphData.length===0) return <Loading />

    if (graphData.weight.length===0) return <h3>No honey pulls have been recorded</h3>

    const filterIndices = !selectedSlice ? null : graphData[selectedSlice.labelCol]
        .map((item, index) => item === selectedSlice.labelFilter ? index : -1)
        .filter(index => index !== -1);

    const filterKeys = ["temp", "weight", "avg_30DayWeight", "humidity", "antsPresent", "slugsPresent", 
        "hiveBeetlesPresent", "waxMothsPresent", "waspsHornetsPresent", "micePresent", "robberBeesPresent"];

    const filteredData = Object.fromEntries(
        filterKeys.map(key => [
        key,
        !filterIndices ? graphData[key] : filterIndices.map(index => graphData[key][index])
        ])
    );

    return (
        <StyledAnalysis>
            <DrippingHoney />
            <h2>{label}{filterLabel ? ` for ${camelToProperCase(filterLabel)}` : ''}</h2>
            <span>{!filterLabel ? 'Click slice below to filter data' : 'Click outside of pie to clear filter'}</span>
            <div className='graph-container'>
                <PieChartComponent
                    title={`Total Honey Production by ${pieSplit==='hiveId' ? 'Hive' : 'State'}`}
                    label={{data: graphData[pieSplit], label: pieSplit}}
                    valueData={graphData.weight}
                    selectedSlice={selectedSlice}
                    setSelectedSlice={setSelectedSlice}
                />
            </div>
            <GraphSectionHeader>Impact of Temperature</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={`Average 30-Day Honey Production by Average Temperature`}
                    x={{data: filteredData.temp, label: 'Average Temperature'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Average 30-Day Honey Production by Average Humidity'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
            </div>
            <GraphSectionHeader>Impact of Pests</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={'Impact of Ants on Honey Production'}
                    x={{data: filteredData.antsPresent, label: 'Inspections with Ants Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Slugs on Honey Production'}
                    x={{data: filteredData.slugsPresent, label: 'Inspections with Slugs Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Hive Beetles on Honey Production'}
                    x={{data: filteredData.hiveBeetlesPresent, label: 'Inspections with Hive Beetles Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Wax Moths on Honey Production'}
                    x={{data: filteredData.waxMothsPresent, label: 'Inspections with Wax Moths Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Wasps on Honey Production'}
                    x={{data: filteredData.waspsHornetsPresent, label: 'Inspections with Wasps Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Mice on Honey Production'}
                    x={{data: filteredData.micePresent, label: 'Inspections with Mice Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
                <TrendChart
                    title={'Impact of Robber Bees on Honey Production'}
                    x={{data: filteredData.robberBeesPresent, label: 'Inspections with Robber Bees Present'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

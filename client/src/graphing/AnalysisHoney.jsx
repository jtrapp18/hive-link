import { useState, lazy } from 'react';
import TrendChart from './TrendChart';
import PieChartComponent from './PieChart';
import { StyledAnalysis, GraphSectionHeader } from '../MiscStyling';
// import GraphSectionHeader from '../styles/GraphSectionHeader'
import Loading from '../pages/Loading';
import { camelToProperCase } from '../helper'
import DrippingHoney from '../components/DrippingHoney'

const PestImpacts = lazy(() => import('./PestImpacts'))

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
            <GraphSectionHeader>
                <hr/>
                <h3>Impact of Temperature</h3>
                <hr/>
            </GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={`Average 30-Day Honey Production by Average Temperature`}
                    x={{data: filteredData.temp, label: 'Average Temperature'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                    // chartType='box'
                />
                <TrendChart
                    title={'Average 30-Day Honey Production by Average Humidity'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
            </div>
            <GraphSectionHeader>
                <hr/>
                <h3>Impact of Pests</h3>
                <hr/>
            </GraphSectionHeader>
            <PestImpacts filteredData={filteredData}/>
            <br />
            <br />
            <br />
            <br />
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

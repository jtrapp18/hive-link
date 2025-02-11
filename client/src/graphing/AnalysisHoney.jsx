import { useState, lazy } from 'react';
// import TrendChart from './TrendChart';
// import PieChartComponent from './PieChart';
import { StyledAnalysis } from '../MiscStyling';
import Loading from '../pages/Loading';
import { camelToProperCase } from '../helper';
import DrippingHoney from '../components/DrippingHoney';

import BasicHoneyStats from './BasicHoneyStats'
// const BasicHoneyStats = lazy(() => import('./BasicHoneyStats'));
const PestImpacts = lazy(() => import('./PestImpacts'));
const TempVsHoney = lazy(() => import('./TempVsHoney'));

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
            <BasicHoneyStats 
                filterLabel={filterLabel} 
                graphData={graphData} 
                pieSplit={pieSplit}
                selectedSlice={selectedSlice}
                setSelectedSlice={setSelectedSlice}
            />
            <br />
            <PestImpacts filteredData={filteredData}/>
            <br />
            <TempVsHoney filteredData={filteredData}/>
        </StyledAnalysis>
    );
}

export default AnalysisHoney;

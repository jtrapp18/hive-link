import { lazy } from 'react'
import { StyledAnalysis } from '../MiscStyling';
import LinearHiveStats from './LinearHiveStats';

const TreatmentImpacts = lazy(()=> import('./TreatmentImpacts'));
const TempVsMites = lazy(()=> import('./TempVsMites'));

const AnalysisHealth = ({graphData, label, filters}) => {

    const isUserOnly = filters.includes('user')

    if (!graphData) return <p>Loading...</p>
    if (graphData.length===0) return <p>Loading...</p>

    if (graphData.dateChecked.length===0) return <h3>No inspections have been recorded</h3>

    const filterKeys = ["dateChecked", "varroaMiteCount", "temp", "humidity", "oxalicAcidDosage", "formicAcidDosage", "thymolDosage", "apistanDosage"];

    const filteredData = Object.fromEntries(
        filterKeys.map(key => [
        key,
        graphData[key]
    ])
    );

    return (
        <StyledAnalysis>
            <h2>{label}</h2>
            {isUserOnly &&
                <>
                    <LinearHiveStats filteredData={filteredData}/>
                </>    
            }
            <TempVsMites filteredData={filteredData}/>
            <TreatmentImpacts filteredData={filteredData}/>
            <br />
            <br />
        </StyledAnalysis>
    );
}

export default AnalysisHealth;

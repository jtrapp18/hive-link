import { lazy } from 'react'
import { StyledAnalysis } from '../MiscStyling';
import styled from 'styled-components'

import LinearHiveStats from './LinearHiveStats';
// const LinearHiveStats = lazy(()=> import('./LinearHiveStats'));
const TreatmentImpacts = lazy(()=> import('./TreatmentImpacts'));
const TempVsMites = lazy(()=> import('./TempVsMites'));

const Hexagons = styled.img`
  position: fixed;
  top: 0;
  right: 0;
  width: 20vw;
  animation: slideDown 1s ease-out forwards;
`

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
            <Hexagons
                src='/images/hexagon_design.png'
                alt='hexagon pattern'
            />
            <h2>{label}</h2>
            {isUserOnly &&
                <>
                    <LinearHiveStats filteredData={filteredData}/>
                    <br />    
                </>    
            }
            <TempVsMites filteredData={filteredData}/>
            <br />
            <TreatmentImpacts filteredData={filteredData}/>
        </StyledAnalysis>
    );
}

export default AnalysisHealth;

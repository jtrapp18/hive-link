import { lazy } from 'react'
import TrendChart from './TrendChart';
import { StyledAnalysis, GraphSectionHeader } from '../MiscStyling';
import styled from 'styled-components'

const TreatmentImpacts = lazy(()=> import('./TreatmentImpacts'));

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
                    <GraphSectionHeader>Hive Statistics over Time</GraphSectionHeader>
                    <div className='graph-container'>
                        <TrendChart
                            title={'Varroa Mite Count over Time'}
                            x={{data: filteredData.dateChecked, label: 'Inspection Date'}}
                            y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                        />
                    </div>
                </>              
            }
            <GraphSectionHeader>
                <hr/>
                <h3>Impact of Weather</h3>
                <hr/>
            </GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={'Varroa Mite Count by Average Temperature'}
                    x={{data: filteredData.temp, label: 'Average Temperature'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    title={'Varroa Mite Count by Average Humidity'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
            <GraphSectionHeader>
                <hr/>
                <h3>Varroa Mite Treatments</h3>
                <hr/>
            </GraphSectionHeader>
            <TreatmentImpacts filteredData={filteredData}/>
        </StyledAnalysis>
    );
}

export default AnalysisHealth;

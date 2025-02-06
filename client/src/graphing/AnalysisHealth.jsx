import React, { useState } from 'react';
import TrendChart from './TrendChart';
import MultiLine from './MultiLine';
import Loading from '../pages/Loading'
import { StyledAnalysis } from '../MiscStyling';
import GraphSectionHeader from '../styles/GraphSectionHeader'

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
                    <GraphSectionHeader>Hive Statistics over Time</GraphSectionHeader>
                    <div className='graph-container'>
                        {/* <MultiLine
                            title={'Fate over Time'}
                            x={{data: filteredData.dateChecked, label: 'Inspection Date'}}
                            prefix='fate'
                        /> */}
                        <TrendChart
                            title={'Varroa Mite Count over Time'}
                            x={{data: filteredData.dateChecked, label: 'Inspection Date'}}
                            y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                        />
                    </div>
                </>              
            }
            <GraphSectionHeader>Impact of Weather</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Average Temperature'}
                    x={{data: filteredData.temp, label: 'Average Temperature'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Average Humidity'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
            <GraphSectionHeader>Varroa Mite Treatments</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Oxalic Acid Dosage'}
                    x={{data: filteredData.oxalicAcidDosage, label: 'Oxalic Acid Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Formic Acid Dosage'}
                    x={{data: filteredData.formicAcidDosage, label: 'Formic Acid Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Thymol Dosage'}
                    x={{data: filteredData.thymolDosage, label: 'Thymol Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Apistan Dosage'}
                    x={{data: filteredData.apistanDosage, label: 'Apistan Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHealth;

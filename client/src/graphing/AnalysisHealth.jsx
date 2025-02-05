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

    return (
        <StyledAnalysis>
            <h3>{label}</h3>
            <br />
            {isUserOnly &&
                <>
                    <GraphSectionHeader>Hive Statistics over Time</GraphSectionHeader>
                    <div className='graph-container'>
                        <MultiLine
                            data={graphData}
                            title={'Fate over Time'}
                            x={{dataCol: 'dateChecked', label: 'Inspection Date'}}
                            prefix='fate'
                        />
                        <TrendChart
                            data={graphData}
                            title={'Varroa Mite Count over Time'}
                            x={{dataCol: 'dateChecked', label: 'Inspection Date'}}
                            y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                        />
                    </div>
                </>              
            }
            <GraphSectionHeader>Impact of Weather</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Average Temperature'}
                    x={{dataCol: 'temp', label: 'Average Temperature'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Average Humidity'}
                    x={{dataCol: 'humidity', label: 'Average Humidity'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
            </div>
            <GraphSectionHeader>Varroa Mite Treatments</GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Oxalic Acid Dosage'}
                    x={{dataCol: 'oxalicAcidDosage', label: 'Oxalic Acid Dosage'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Formic Acid Dosage'}
                    x={{dataCol: 'formicAcidDosage', label: 'Formic Acid Dosage'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Thymol Dosage'}
                    x={{dataCol: 'thymolDosage', label: 'Thymol Dosage'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count by Apistan Dosage'}
                    x={{dataCol: 'apistanDosage', label: 'Apistan Dosage'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
            </div>
        </StyledAnalysis>
    );
}

export default AnalysisHealth;

import React, { useState } from 'react';
import TrendChart from './TrendChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import {useOutletContext} from "react-router-dom";
import GraphOptions from './GraphOptions';
import styled from 'styled-components';
import Loading from '../pages/Loading'
import { StyledAnalysis } from '../MiscStyling';

const AnalysisHealth = ({graphData, label}) => {

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
                    title={'Varroa Mite Count by Average Temperature'}
                    x={{dataCol: 'temp', label: 'Average Temperature'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    data={graphData}
                    title={'Varroa Mite Count over Time'}
                    x={{dataCol: 'dateChecked', label: 'Inspection Date'}}
                    y={{dataCol: 'varroaMiteCount', label: 'Varroa Mite Count'}}
                />
            </div>
            <h3>Varroa Mite Treatments</h3>
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

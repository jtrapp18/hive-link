import TrendChart from './TrendChart';
import { GraphSectionHeader } from '../MiscStyling'

const PestImpacts = ({filteredData}) => {

    return (
        <div>
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
        </div>
    );
}

export default PestImpacts;

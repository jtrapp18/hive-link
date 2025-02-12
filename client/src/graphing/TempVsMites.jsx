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
            <br />
            <div className='graph-container'>
                <TrendChart
                    title={'Temperature Impact on Varroa Mites'}
                    x={{data: filteredData.temp, label: 'Average Temperature (°C)'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    title={'Humidity Impact on Varroa Mites'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
        </div>
    );
}

export default PestImpacts;

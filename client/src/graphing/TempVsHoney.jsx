import TrendChart from './TrendChart';
import { GraphSectionHeader } from '../MiscStyling'

const TempVsHoney = ({filteredData}) => {

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
                    title={`Temperature Impact on Honey Production`}
                    x={{data: filteredData.temp, label: 'Average Temperature (°C)'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Average 30-Day Honey Production (lbs)'}}
                    // chartType='box'
                />
                <TrendChart
                    title={'Humidity Impact on Honey Production'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Average 30-Day Honey Production (lbs)'}}
                />
            </div>
        </div>
    );
}

export default TempVsHoney;

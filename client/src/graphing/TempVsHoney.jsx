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
            <div className='graph-container'>
                <TrendChart
                    title={`Average 30-Day Honey Production by Average Temperature`}
                    x={{data: filteredData.temp, label: 'Average Temperature'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                    // chartType='box'
                />
                <TrendChart
                    title={'Average 30-Day Honey Production by Average Humidity'}
                    x={{data: filteredData.humidity, label: 'Average Humidity'}}
                    y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                />
            </div>
        </div>
    );
}

export default TempVsHoney;

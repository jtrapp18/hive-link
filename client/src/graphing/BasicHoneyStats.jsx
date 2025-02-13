import PieChart from './PieChart';
import TrendChart from './TrendChart'
import { GraphSectionHeader } from '../MiscStyling';

const BasicHoneyStats = ({filterLabel, filteredData, graphData, pieSplit, selectedSlice, setSelectedSlice}) => {

    return (
        <div>
            <span>{!filterLabel ? 'Click slice below to filter data' : 'Click outside of pie to clear filter'}</span>
            <div className='graph-container'>
                <PieChart
                    title={`Total Honey Production by ${pieSplit==='hiveId' ? 'Hive' : 'State'}`}
                    label={{data: graphData[pieSplit], label: pieSplit}}
                    valueData={graphData.weight}
                    selectedSlice={selectedSlice}
                    setSelectedSlice={setSelectedSlice}
                />
            </div>
            <GraphSectionHeader>
                <hr/>
                <h3>Honey Production over Time</h3>
                <hr/>
            </GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={'Total Honey Production by Pull Date'}
                    x={{data: filteredData.datePulled, label: 'Honey Pull Date'}}
                    y={{data: filteredData.weight, label: 'Honey Production (lbs)'}}
                />
            </div>
        </div>
    );
}

export default BasicHoneyStats;

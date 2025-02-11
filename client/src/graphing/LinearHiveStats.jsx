import { GraphSectionHeader } from '../MiscStyling';
import TrendChart from './TrendChart';

const LinearHiveStats = ({filteredData}) => {

    return (
        <div>
            <GraphSectionHeader>
                <hr/>
                <h3>Hive Statistics over Time</h3>
                <hr/>
            </GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={'Varroa Mite Count over Time'}
                    x={{data: filteredData.dateChecked, label: 'Inspection Date'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
        </div>
    );
}

export default LinearHiveStats;

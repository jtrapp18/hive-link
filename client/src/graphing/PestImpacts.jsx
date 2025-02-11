import TrendChart from './TrendChart';
import { GraphSectionHeader } from '../MiscStyling'

const PestImpacts = ({filteredData}) => {

    return (
        <div className='graph-container'>
            <TrendChart
                title={'Impact of Ants on Honey Production'}
                x={{data: filteredData.antsPresent, label: 'Inspections with Ants Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
                // chartType='box'
            />
            <TrendChart
                title={'Impact of Slugs on Honey Production'}
                x={{data: filteredData.slugsPresent, label: 'Inspections with Slugs Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
            <TrendChart
                title={'Impact of Hive Beetles on Honey Production'}
                x={{data: filteredData.hiveBeetlesPresent, label: 'Inspections with Hive Beetles Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
            <TrendChart
                title={'Impact of Wax Moths on Honey Production'}
                x={{data: filteredData.waxMothsPresent, label: 'Inspections with Wax Moths Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
            <TrendChart
                title={'Impact of Wasps on Honey Production'}
                x={{data: filteredData.waspsHornetsPresent, label: 'Inspections with Wasps Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
            <TrendChart
                title={'Impact of Mice on Honey Production'}
                x={{data: filteredData.micePresent, label: 'Inspections with Mice Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
            <TrendChart
                title={'Impact of Robber Bees on Honey Production'}
                x={{data: filteredData.robberBeesPresent, label: 'Inspections with Robber Bees Present'}}
                y={{data: filteredData.avg_30DayWeight, label: 'Honey Production (lbs)'}}
            />
        </div>
    );
}

export default PestImpacts;

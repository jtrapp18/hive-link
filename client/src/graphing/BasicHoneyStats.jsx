import PieChart from './PieChart';

const TempVsHoney = ({filterLabel, graphData, pieSplit, selectedSlice, setSelectedSlice}) => {

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
        </div>
    );
}

export default TempVsHoney;

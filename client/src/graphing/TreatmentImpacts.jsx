import TrendChart from './TrendChart';

const TreatmentImpacts = ({filteredData}) => {

    return (
        <div className='graph-container'>
            <TrendChart
                title={'Varroa Mite Count by Oxalic Acid Dosage'}
                x={{data: filteredData.oxalicAcidDosage, label: 'Oxalic Acid Dosage'}}
                y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
            />
            <TrendChart
                title={'Varroa Mite Count by Formic Acid Dosage'}
                x={{data: filteredData.formicAcidDosage, label: 'Formic Acid Dosage'}}
                y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
            />
            <TrendChart
                title={'Varroa Mite Count by Thymol Dosage'}
                x={{data: filteredData.thymolDosage, label: 'Thymol Dosage'}}
                y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
            />
            <TrendChart
                title={'Varroa Mite Count by Apistan Dosage'}
                x={{data: filteredData.apistanDosage, label: 'Apistan Dosage'}}
                y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
            />
        </div>
    );
}

export default TreatmentImpacts;

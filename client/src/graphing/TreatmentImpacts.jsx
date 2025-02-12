import TrendChart from './TrendChart';
import { GraphSectionHeader } from '../MiscStyling';

const TreatmentImpacts = ({filteredData}) => {

    return (
        <div>
            <GraphSectionHeader>
                <hr/>
                <h3>Varroa Mite Treatments</h3>
                <hr/>
            </GraphSectionHeader>
            <div className='graph-container'>
                <TrendChart
                    title={'Oxalic Acid Impact on Mites'}
                    x={{data: filteredData.oxalicAcidDosage, label: 'Oxalic Acid Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    title={'Formic Acid Dosage Impact on Mites'}
                    x={{data: filteredData.formicAcidDosage, label: 'Formic Acid Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    title={'Thymol Dosage Impact on Mites'}
                    x={{data: filteredData.thymolDosage, label: 'Thymol Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
                <TrendChart
                    title={'Apistan Dosage Impact on Mites'}
                    x={{data: filteredData.apistanDosage, label: 'Apistan Dosage'}}
                    y={{data: filteredData.varroaMiteCount, label: 'Varroa Mite Count'}}
                />
            </div>
        </div>
    );
}

export default TreatmentImpacts;

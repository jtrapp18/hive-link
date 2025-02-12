import { useOutletContext } from "react-router-dom";
import styled from 'styled-components';
import HiveCard from './HiveCard'
import Error from '../styles/Error';
import { formattedTime } from "../helper";

const StyledCard = styled.article`
    width: 100%;

    border-bottom: 3px double var(--honey);
    padding: 3%;
    background: black;

    small {
        color: gray;
    }

    .hive-summary {
        display: flex;
        align-items: end;
        justify-content: space-between;

        .hive-card {
            zoom: .5;
        }
    }
    
    section {

        > span {
            color: gray;
        }

        div {
            display: flex;
            justify-content: space-between;        
        }

        .inspection-row {

            p {
                margin: 0;
                color: var(--yellow);

                strong {
                    color: white;
                }

                &.honey-prediction {
                    color: var(--yellow);

                    strong {
                        color: rgb(40, 203, 215);
                    }
                }
            }

            &.at-risk {
                p {
                    color: red;
                }
            }
        }
    }
`

const AnalysisCard = ({ hive, prediction }) => {

    const { predictionData } = useOutletContext();
    const { honeyPulls } = hive;

    if (honeyPulls.length===0) return <StyledCard>No honey pull rounds have been recorded for Hive {hive.id}</StyledCard>
    
    const sortedHoneyPulls = [...honeyPulls].sort((a, b) => new Date(a.datePulled) - new Date(b.datePulled));
    const latestHoneyPull = sortedHoneyPulls[0];

    if (latestHoneyPull.inspections.length===0) return <StyledCard>No inspections have been logged for Hive {hive.id}</StyledCard>
     
    const sortedInspections = [...latestHoneyPull.inspections].sort((a, b) => new Date(a.dateChecked) - new Date(b.dateChecked));
    const latestInspection = sortedInspections[0];

    const {dateChecked, hasTwistedLarvae, hasChalkbrood, varroaMiteCount, bias, hasEggs, hasLarvae} = latestInspection;
    const atRisk = hasTwistedLarvae || hasChalkbrood || varroaMiteCount > 3 || bias < 3 || !hasEggs || !hasLarvae;
    const { modelRunDate, predRunDate } = predictionData;

    const inspectionCount = honeyPulls.reduce((accum, honeyPull) => honeyPull.inspections.length + accum, 0)

    return (
        <StyledCard>
            <div className='hive-summary'>
                <section>
                    <span><strong>No. Honey Pulls: </strong>{honeyPulls.length}</span>
                    <h3>Latest Round</h3>
                    <div className='inspection-row'>
                        <p><strong>Start Date: </strong>{latestHoneyPull.dateReset}</p>
                    </div>
                    <div className='inspection-row'>
                        <p><strong>Pull Date: </strong>{latestHoneyPull.datePulled ? latestHoneyPull.datePulled : 'n/a'}</p>
                        </div>
                    <div className='inspection-row'>
                        {latestHoneyPull.weight ?
                            <p><strong>Honey Pull Weight (lbs): </strong>{latestHoneyPull.weight.toFixed(4)}</p> :
                            <p className='honey-prediction'><strong>Predicted Honey Pull Weight (lbs)*: </strong>{prediction.toFixed(4)}</p>
                        }
                    </div>
                </section>
                <HiveCard {...hive}/>
            </div>
            {!latestHoneyPull.weight &&
                <small>{`*Based on MLP Regressor user experience study run ${formattedTime(modelRunDate)}, inspection data as of ${formattedTime(predRunDate)}, and pull date of today`}</small>
            }
            <hr />
            <section>
                <span><strong>No. Inspections: </strong>{inspectionCount}</span>
                <div>
                    <h3>Latest Inspection</h3>
                    {atRisk && <Error>At risk based on latest inspection</Error>}
                </div>
                <p><strong>Date: </strong>{dateChecked}</p>
                <div className={hasTwistedLarvae ? 'at-risk inspection-row' : 'inspection-row'}>
                    <p>
                        <strong>Twisted Larvae Seen: </strong>
                        {hasTwistedLarvae ? "Yes" : "No"}
                    </p>
                    {hasTwistedLarvae && <p>⚠️ Possible European Foulbrood or viral infection. Inspect further and consider treatment.</p>}
                </div>
                <div className={hasChalkbrood ? 'at-risk inspection-row' : 'inspection-row'}>
                    <p>
                        <strong>Chalkbrood Seen: </strong>
                        {hasChalkbrood ? "Yes" : "No"}
                    </p>
                    {hasChalkbrood && <p>⚠️ Chalkbrood detected. Improve hive ventilation and consider requeening if persistent.</p>}
                </div>
                <div className={varroaMiteCount < 3 ? 'inspection-row' : 'at-risk inspection-row'}>
                    <p>
                        <strong>Varroa Mite Count: </strong>
                        {varroaMiteCount}
                    </p>
                    {varroaMiteCount > 3 && <p className='recommendation'>⚠️ High mite count! Consider immediate treatment to prevent colony collapse.</p>}
                    {varroaMiteCount > 0 && varroaMiteCount <= 3 && <p>🔍 Monitor mite levels closely and prepare for treatment if they increase.</p>}
                </div>
                <div className={bias >= 3 ? 'inspection-row' : 'at-risk inspection-row'}>
                    <p>
                        <strong>Brood in All Stages Count: </strong>
                        {bias}
                    </p>
                    {bias < 3 && <p>⚠️ Low brood count. Check queen presence and colony health.</p>}
                </div>
                <div className={hasEggs ? 'inspection-row' : 'at-risk inspection-row'}>
                    <p>
                        <strong>Eggs Seen: </strong>
                        {hasEggs ? "Yes" : "No"}
                    </p>
                    {hasEggs 
                        ? <p>✅ Eggs confirm the queen was active within the last 3 days.</p> 
                        : <p>⚠️ No eggs detected. Check for queen presence or signs of a failing queen.</p>}
                </div>
                <div className={hasLarvae ? 'inspection-row' : 'at-risk inspection-row'}>
                    <p>
                        <strong>Larvae Seen: </strong>
                        {hasLarvae ? "Yes" : "No"}
                    </p>
                    {!hasLarvae && <p>⚠️ No larvae detected. If no eggs are seen either, consider requeening.</p>}
                </div>
            </section>
        </StyledCard>
    );
}

export default AnalysisCard;
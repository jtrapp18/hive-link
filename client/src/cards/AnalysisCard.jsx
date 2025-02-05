import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import HiveCard from './HiveCard'
import Error from '../styles/Error';
import { Alert } from '../MiscStyling';

const StyledCard = styled.article`

    .hive-summary {
        display: flex;
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
            }

            &.at-risk {
                p {
                    color: red;
                }
            }
        }
    }
`

const AnalysisCard = ({ hive }) => {
    const navigate = useNavigate();

    console.log(hive)
    const { id, honeyPulls } = hive
    const latestHoneyPull = honeyPulls[honeyPulls.length - 1];
    const latestInspection = latestHoneyPull.inspections[latestHoneyPull.inspections.length - 1];

    const {dateChecked, hasTwistedLarvae, hasChalkbrood, varroaMiteCount, bias, hasEggs, hasLarvae} = latestInspection
    const atRisk = hasTwistedLarvae || hasChalkbrood || varroaMiteCount > 3 || bias < 3 || !hasEggs || !hasLarvae;

    // const userHives = honeyPulls.filter((honeyPull) => honeyPull.userId === user.id)
    const inspectionCount = honeyPulls.reduce((accum, honeyPull) => honeyPull.inspections.length + accum, 0)

    return (
        <StyledCard className="hive-card">
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
                        <p><strong>Honey Pull Weight (lbs): </strong>{latestHoneyPull.weight ? latestHoneyPull.weight : 'n/a'}</p>
                    </div>
                </section>
                <HiveCard {...hive}/>
            </div>
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
                    {varroaMiteCount > 3 && <p>⚠️ High mite count! Consider immediate treatment to prevent colony collapse.</p>}
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
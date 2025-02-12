import { lazy, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useOutletContext} from "react-router-dom";
import { Button, CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import HiveToast from '../styles/HiveToast';
import MotionWrapper from '../styles/MotionWrapper';
import AnalyticsLink from './AnalyticsLink';
import InspectionCard from '../cards/InspectionCard';

const InspectionForm = lazy(() => import('../forms/InspectionForm'));

const Inspections = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [showToast, setShowToast] = useState(null);
  const {PopupForm: InspectionPopup, setActiveItem: setActiveInspection, setShowNewForm: setShowNewInspection} = usePopupForm(InspectionForm);

  const inspections = hive.honeyPulls.reduce((inspections, honeyPull) => [...inspections, ...honeyPull.inspections], [])
  const activeHoneyPull = hive.honeyPulls.find(honeyPull=>!honeyPull.datePulled)

  const viewInspection = (inspection) => {
    setShowNewInspection(false);
    setActiveInspection(inspection);
  }

  const clickNewInspection = () => {
    if (!activeHoneyPull) {
      setShowToast('inspection');
    }
    else {
      setShowNewInspection(true);
    }
  }

  return (
        <>
            <h3>Inspections</h3>
            <h3>. . . . . </h3>
            <div>
              <p>Log your latest hive inspection for the current honey pull round.</p>
              <AnalyticsLink />
            </div>
            <div>
                <Button onClick={clickNewInspection}>Record Hive Inspection</Button>
                {showToast==='inspection' && 
                <HiveToast 
                    onClose={()=>setShowToast(null)}
                >
                    Need to set up an active honey pull round before adding a new inspection
                </HiveToast>
                }
            </div>
            <CardContainer>
                <InspectionPopup 
                    honeyPullId={activeHoneyPull.id}
                    viewInspection={viewInspection}
                />
                {inspections
                .sort((a, b) => new Date(b.dateChecked) - new Date(a.dateChecked)) // Sort by date in descending order
                .map((inspection, index) => (
                <MotionWrapper key={inspection.id} index={index}>
                    <InspectionCard
                      inspection={inspection}
                      setActiveInspection={setActiveInspection}
                    />
                </MotionWrapper>
                ))}
            </CardContainer>
        </>
  );
};

export default Inspections;

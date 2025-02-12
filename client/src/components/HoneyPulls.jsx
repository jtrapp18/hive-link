import { lazy, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useOutletContext} from "react-router-dom";
import { Button, CardContainer } from '../MiscStyling';
import Loading from '../pages/Loading';
import DrippingHoney from '../components/DrippingHoney';
import usePopupForm from '../hooks/usePopupForm';
import HiveToast from '../styles/HiveToast';
import MotionWrapper from '../styles/MotionWrapper';
import AnalyticsLink from './AnalyticsLink';
import HoneyCard from '../cards/HoneyCard';

const HoneyForm = lazy(() => import('../forms/HoneyForm'));

const HoneyPulls = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));
  const [showToast, setShowToast] = useState(null);
  const {PopupForm: HoneyPullPopup, setActiveItem: setActiveHoneyPull, setShowNewForm: setShowNewHoneyPull} = usePopupForm(HoneyForm);

  if (!hive) {return <Loading />}

  const activeHoneyPull = hive.honeyPulls.find(honeyPull=>!honeyPull.datePulled)

  const viewHoney = (honeyPull) => {
    setShowNewHoneyPull(false);
    setActiveHoneyPull(honeyPull);
  }

  const clickNewHoney = () => {
    if (activeHoneyPull) {
      setShowToast('honey');
    }
    else {
      setShowNewHoneyPull(true);
    }
  }

  return (
      <>
        <DrippingHoney />
        <h3>Honey Pulls</h3>
        <h3>. . . . . </h3>
        <div>
          <p>Track your honey harvest by setting up honey pull rounds for your hive. Record the dates between each pull and log the weight of the honey collected in pounds.</p>
          <AnalyticsLink />
        </div>
        <div>
          <Button onClick={clickNewHoney}>Add Honey Pull</Button>
          <br />
          {showToast==='honey' && 
            <HiveToast 
              onClose={()=>setShowToast(null)}
            >
              Need to record pull date and weight of current round before adding new honey pull
            </HiveToast>
          }
        </div>
        <CardContainer>
          <HoneyPullPopup
            viewHoney={viewHoney}
          />
          {hive.honeyPulls
          .sort((a, b) => new Date(b.dateReset) - new Date(a.dateReset)) // Sort by date in descending order
          .map((honeyPull, index) => (
            <MotionWrapper key={honeyPull.id} index={index}>
              <HoneyCard
                honeyPull={honeyPull}
                setActiveHoneyPull={setActiveHoneyPull}
              />
            </MotionWrapper>
          ))}
        </CardContainer>
      </>
  );
};

export default HoneyPulls;